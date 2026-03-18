<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreDeathRequest;
use App\Http\Requests\Api\UpdateDeathRequest;
use App\Http\Resources\DeathResource;
use App\Models\Death;
use App\Services\Death\ListDeath;
use App\Services\Death\ListDeathService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DeathController extends Controller
{
    private const CSV_HEADERS = [
        'date',
        'full_name',
        'parent',
        'address',
        'spouse',
        'date_of_death',
        'cause_of_death',
        'place_of_burial',
        'date_of_burial',
        'reg_no',
        'page_no',
        'book_no',
    ];

    private const IMPORT_RULES = [
        'date' => ['required', 'date', 'date_format:Y-m-d'],
        'full_name' => ['required', 'string', 'max:255'],
        'parent' => ['required', 'string', 'max:255'],
        'address' => ['required', 'string', 'max:255'],
        'spouse' => ['nullable', 'string', 'max:255'],
        'date_of_death' => ['required', 'date', 'date_format:Y-m-d'],
        'cause_of_death' => ['nullable', 'string', 'max:255'],
        'place_of_burial' => ['required', 'string', 'max:255'],
        'date_of_burial' => ['required', 'date', 'date_format:Y-m-d'],
        'reg_no' => ['required', 'string', 'max:20'],
        'page_no' => ['required', 'string', 'max:20'],
        'book_no' => ['required', 'string', 'max:20'],
    ];
    public function index(Request $request, ListDeathService $deathService): JsonResponse
    {
        $dto = ListDeath::fromRequest($request);

        $deaths = $deathService->paginate($dto);

        return DeathResource::collection($deaths)->response();
    }

    public function store(StoreDeathRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $death = Death::query()->create($validated);

        return (new DeathResource($death))
            ->response()
            ->setStatusCode(201);
    }

    public function show(Death $death): JsonResponse
    {
        return (new DeathResource($death))->response();
    }

    public function update(UpdateDeathRequest $request, Death $death): JsonResponse
    {
        $validated = $request->validated();
        $death->fill($validated);
        $death->save();

        return (new DeathResource($death))->response();
    }

    public function destroy(Death $death): JsonResponse
    {
        $death->delete();
        return response()->json(null, 204);
    }

    public function exportCsv(Request $request, ListDeathService $deathService): StreamedResponse
    {
        $dto = ListDeath::fromRequest($request);

        $deaths = $deathService
            ->buildQuery($dto)
            ->latest()
            ->get(self::CSV_HEADERS);

        $filename = 'deaths-'.now()->format('Ymd_His').'.csv';

        return response()->streamDownload(function () use ($deaths): void {
            $handle = fopen('php://output', 'wb');

            fputcsv($handle, self::CSV_HEADERS);

            foreach ($deaths as $death) {
                fputcsv($handle, [
                    $death->date,
                    $death->full_name,
                    $death->parent,
                    $death->address,
                    $death->spouse,
                    $death->date_of_death,
                    $death->cause_of_death,
                    $death->place_of_burial,
                    $death->date_of_burial,
                    $death->reg_no,
                    $death->page_no,
                    $death->book_no,
                ]);
            }

            fclose($handle);
        }, $filename, [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }

    public function downloadCsv(): StreamedResponse
    {
        $filename = 'deaths-template.csv';

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
            return response()->json(['message' => 'Could not read uploaded CSV file.'], 422);
        }

        $headers = fgetcsv($handle);

        if ($headers === false) {
            fclose($handle);
            return response()->json(['message' => 'CSV file is empty.'], 422);
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
                $errors[] = ['line' => $line, 'errors' => $validator->errors()->all()];
                continue;
            }

            Death::query()->create($validator->validated());
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
        return strtolower(str_replace("\xEF\xBB\xBF", '', trim($header)));
    }

    private function normalizeCsvValue(mixed $value): ?string
    {
        if (!is_string($value)) {
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
            if (!is_string($value) && $value !== null) {
                return false;
            }
        }
        return true;
    }
}
