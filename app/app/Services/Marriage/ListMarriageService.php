<?php

namespace App\Services\Marriage;

use App\Models\Marriage;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ListMarriageService
{
    protected const SEARCHABLE_COLUMNS = [
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
        'date',
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

        return $query
            ->latest()
            ->paginate($dto->perPage)
            ->appends([
                'q' => $dto->search,
                'per_page' => $dto->perPage,
            ]);
    }
}
