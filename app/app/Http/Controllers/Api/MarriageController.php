<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreMarriageRequest;
use App\Http\Requests\Api\UpdateMarriageRequest;
use App\Http\Resources\MarriageResource;
use App\Models\Marriage;
use App\Services\Marriage\ListMarriage;
use App\Services\Marriage\ListMarriageService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\StreamedResponse;

class MarriageController extends Controller
{
    private const CSV_HEADERS = [
        'date',
        'bride_full_name',
        'bride_parents',
        'groom_full_name',
        'groom_parents',
        'celebrant',
        'church',
        'married_on',
        'witness1',
        'witness2',
        'reg_no',
        'page_no',
        'book_no',
    ];

    private const IMPORT_RULES = [
        'date' => ['required', 'date', 'date_format:Y-m-d'],
        'bride_full_name' => ['required', 'string', 'max:255'],
        'bride_parents' => ['required', 'string', 'max:255'],
        'groom_full_name' => ['required', 'string', 'max:255'],
        'groom_parents' => ['required', 'string', 'max:255'],
        'celebrant' => ['required', 'string', 'max:255'],
        'church' => ['required', 'string', 'max:255'],
        'married_on' => ['required', 'date', 'date_format:Y-m-d'],
        'witness1' => ['nullable', 'string', 'max:100'],
        'witness2' => ['nullable', 'string', 'max:100'],
        'reg_no' => ['required', 'string', 'max:20'],
        'page_no' => ['required', 'string', 'max:20'],
        'book_no' => ['required',
         'string', 'max:20'],
    ];

    public function index(Request $request, ListMarriageService $marriageService): JsonResponse
    {
        $dto = ListMarriage::fromRequest($request);

        $marriages = $marriageService->paginate($dto);

        return MarriageResource::collection($marriages)->response();
    }

    public function store(StoreMarriageRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $marriage = Marriage::query()->create($validated);

        return (new MarriageResource($marriage))
            ->response()
            ->setStatusCode(201);
    }

    public function show(Marriage $marriage): JsonResponse
    {
        return (new MarriageResource($marriage))->response();
    }

    public function update(UpdateMarriageRequest $request, Marriage $marriage): JsonResponse
    {
        $validated = $request->validated();

        $marriage->fill($validated);
        $marriage->save();

        return (new MarriageResource($marriage))->response();
    }

    public function destroy(Marriage $marriage): JsonResponse
    {
        $marriage->delete();

        return response()->json(null, 204);
    }

    public function exportCsv(Request $request, ListMarriageService $marriageService): StreamedResponse
    {
        $dto = ListMarriage::fromRequest($request);

        $marriages = $marriageService
            ->buildQuery($dto)
            ->latest()
            ->get(self::CSV_HEADERS);

        $filename = 'marriages-'.now()->format('Ymd_His').'.csv';

        return response()->streamDownload(function () use ($marriages): void {
            $handle = fopen('php://output', 'wb');

            fputcsv($handle, self::CSV_HEADERS);

            foreach ($marriages as $marriage) {
                fputcsv($handle, [
                    $marriage->date,
                    $marriage->bride_full_name,
                    $marriage->bride_parents,
                    $marriage->groom_full_name,
                    $marriage->groom_parents,
                    $marriage->celebrant,
                    $marriage->church,
                    $marriage->married_on,
                    $marriage->witness1,
                    $marriage->witness2,
                    $marriage->reg_no,
                    $marriage->page_no,
                    $marriage->book_no,
                ]);
            }

            fclose($handle);
        }, $filename, [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }

    public function downloadCsv(): StreamedResponse
    {
        $filename = 'marriages-template.csv';

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

            Marriage::query()->create($validator->validated());
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
