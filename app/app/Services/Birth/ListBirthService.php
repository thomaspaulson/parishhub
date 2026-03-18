<?php

namespace App\Services\Birth;

use App\Models\Birth;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ListBirthService
{
    protected const SEARCHABLE_COLUMNS = [
        'full_name',
        'reg_no',
        'page_no',
        'book_no',
    ];

    public function paginate(ListBirth $dto): LengthAwarePaginator
    {
        return $this->buildQuery($dto)
            ->latest()
            ->paginate($dto->perPage)
            ->appends([
                'q' => $dto->search,
                'month' => $dto->month,
                'year' => $dto->year,
                'per_page' => $dto->perPage,
            ]);
    }

    public function buildQuery(ListBirth $dto): Builder
    {
        $query = Birth::query();

        if ($dto->search) {
            $query->where(function ($q) use ($dto) {
                foreach (self::SEARCHABLE_COLUMNS as $column) {
                    $q->orWhere($column, 'like', "%{$dto->search}%");
                }
            });
        }

        if ($dto->month && $dto->year) {
            $startDate = Carbon::create($dto->year, $dto->month, 1)->startOfMonth();
            $endDate   = Carbon::create($dto->year, $dto->month, 1)->endOfMonth();
            $query->whereBetween('date_of_birth', [$startDate, $endDate]);
        }

        if ($dto->year && !$dto->month) {
            $query->whereYear('date_of_birth', $dto->year);
        }

        return $query;
    }
}
