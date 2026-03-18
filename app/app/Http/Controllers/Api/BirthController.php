<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreBirthRequest;
use App\Http\Requests\Api\UpdateBirthRequest;
use App\Http\Resources\BirthResource;
use App\Models\Birth;
use App\Services\Birth\ListBirth;
use App\Services\Birth\ListBirthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\StreamedResponse;

class BirthController extends Controller
{
    private const CSV_HEADERS = [
        'date',
        'full_name',
        'father_name',
        'mother_name',
        'date_of_birth',
        'date_of_baptism',
        'place_of_baptism',
        'celebrant',
        'god_parents',
        'parish',
        'reg_no',
        'page_no',
        'book_no',
    ];

    private const IMPORT_RULES = [
        'date' => ['required', 'date', 'date_format:Y-m-d'],
        'full_name' => ['required', 'string', 'max:255'],
        'father_name' => ['required', 'string', 'max:255'],
        'mother_name' => ['required', 'string', 'max:255'],
        'date_of_birth' => ['required', 'date', 'date_format:Y-m-d'],
        'date_of_baptism' => ['required', 'date', 'date_format:Y-m-d'],
        'place_of_baptism' => ['required', 'string', 'max:255'],
        'celebrant' => ['required', 'string', 'max:255'],
        'god_parents' => ['required', 'string', 'max:255'],
        'parish' => ['required', 'string', 'max:255'],
        'reg_no' => ['required', 'string', 'max:20'],
        'page_no' => ['required', 'string', 'max:20'],
        'book_no' => ['required', 'string', 'max:20'],
    ];

    public function index(Request $request, ListBirthService $birthService): JsonResponse
    {

        $dto = ListBirth::fromRequest($request);

        $births = $birthService->paginate($dto);

        return BirthResource::collection($births)->response();

    }

    public function store(StoreBirthRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $birth = Birth::query()->create($validated);

        return (new BirthResource($birth))
            ->response()
            ->setStatusCode(201);
    }

    public function show(Birth $birth): JsonResponse
    {
        return (new BirthResource($birth))->response();
    }

    public function update(UpdateBirthRequest $request, Birth $birth): JsonResponse
    {
        $validated = $request->validated();

        $birth->fill($validated);
        $birth->save();

        return (new BirthResource($birth))->response();
    }

    public function destroy(Birth $birth): JsonResponse
    {
        $birth->delete();

        return response()->json(null, 204);
    }

    public function exportCsv(Request $request, ListBirthService $birthService): StreamedResponse
    {
        $dto = ListBirth::fromRequest($request);

        $births = $birthService
            ->buildQuery($dto)
            ->latest()
            ->get(self::CSV_HEADERS);

        $filename = 'births-'.now()->format('Ymd_His').'.csv';

        return response()->streamDownload(function () use ($births): void {
            $handle = fopen('php://output', 'wb');

            fputcsv($handle, self::CSV_HEADERS);

            foreach ($births as $birth) {
                fputcsv($handle, [
                    $birth->date,
                    $birth->full_name,
                    $birth->father_name,
                    $birth->mother_name,
                    $birth->date_of_birth,
                    $birth->date_of_baptism,
                    $birth->place_of_baptism,
                    $birth->celebrant,
                    $birth->god_parents,
                    $birth->parish,
                    $birth->reg_no,
                    $birth->page_no,
                    $birth->book_no,
                ]);
            }

            fclose($handle);
        }, $filename, [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }

    public function downloadCsv(): StreamedResponse
    {
        $filename = 'births-template.csv';

        return response()->streamDownload(function (): void {
            $handle = fopen('php://output', 'wb');

            fputcsv($handle, self::CSV_HEADERS);

            fclose($handle);
        }, $filename, [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }

    public function importCsv(Request $request): JsonResponse
    {
        $request->validate([
            'file' => ['required', 'file', 'mimes:csv,txt'],
        ]);

        $path = $request->file('file')->getRealPath();
        $handle = fopen($path, 'rb');

        if ($handle === false) {
            return response()->json([
                'message' => 'Could not read uploaded CSV file.',
            ], 422);
        }

        $headers = fgetcsv($handle);

        if ($headers === false) {
            fclose($handle);

            return response()->json([
                'message' => 'CSV file is empty.',
            ], 422);
        }

        $normalizedHeaders = array_map([$this, 'normalizeCsvHeader'], $headers);
        $missingHeaders = array_values(array_diff(self::CSV_HEADERS, $normalizedHeaders));

        if ($missingHeaders !== []) {
            fclose($handle);

            return response()->json([
                'message' => 'CSV header is invalid.',
                'missing_headers' => $missingHeaders,
                'expected_headers' => self::CSV_HEADERS,
            ], 422);
        }

        $created = 0;
        $failed = 0;
        $errors = [];
        $line = 1;

        while (($row = fgetcsv($handle)) !== false) {
            $line++;

            if ($this->isEmptyCsvRow($row)) {
                continue;
            }

            $row = array_pad($row, count($normalizedHeaders), null);
            $rowData = array_combine($normalizedHeaders, array_slice($row, 0, count($normalizedHeaders)));

            $recordData = [];
            foreach (self::CSV_HEADERS as $header) {
                $recordData[$header] = isset($rowData[$header])
                    ? $this->normalizeCsvValue($rowData[$header])
                    : null;
            }

            $validator = Validator::make($recordData, self::IMPORT_RULES);

            if ($validator->fails()) {
                $failed++;
                $errors[] = [
                    'line' => $line,
                    'errors' => $validator->errors()->all(),
                ];
                continue;
            }

            Birth::query()->create($validator->validated());
            $created++;
        }

        fclose($handle);

        return response()->json([
            'message' => 'CSV import completed.',
            'created' => $created,
            'failed' => $failed,
            'errors' => $errors,
        ]);
    }

    private function normalizeCsvHeader(string $header): string
    {
        $cleanHeader = trim($header);

        return strtolower(str_replace("\xEF\xBB\xBF", '', $cleanHeader));
    }

    private function normalizeCsvValue(mixed $value): ?string
    {
        if (! is_string($value)) {
            return null;
        }

        $value = trim($value);

        return $value === '' ? null : $value;
    }

    private function isEmptyCsvRow(array $row): bool
    {
        foreach ($row as $value) {
            if (is_string($value) && trim($value) !== '') {
                return false;
            }

            if (! is_string($value) && $value !== null) {
                return false;
            }
        }

        return true;
    }
}
