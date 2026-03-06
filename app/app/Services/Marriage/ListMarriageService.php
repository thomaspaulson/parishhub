<?php

namespace App\Services\Marriage;

use App\Models\Marriage;
use Carbon\Carbon;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ListMarriageService
{
    protected const SEARCHABLE_COLUMNS = [
        'bride_full_name',
        'groom_full_name',
        'reg_no',
        'page_no',
        'book_no'
    ];

    public function paginate(ListMarriage $dto): LengthAwarePaginator
    {
        $query = Marriage::query();

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
            $query->whereBetween('date', [$startDate, $endDate]);
        }

        if ($dto->year && !$dto->month) {
            $query->whereYear('date', $dto->year);
        }

        return $query
            ->latest()
            ->paginate($dto->perPage)
            ->appends([
                'q' => $dto->search,
                'month' => $dto->month,
                'year' => $dto->year,
                'per_page' => $dto->perPage,
            ]);
    }
}
