<?php

namespace App\Services\Birth;

use Illuminate\Http\Request;

class ListBirth
{
    public function __construct(
        public readonly ?string $search,
        public readonly ?string $month,
        public readonly ?string $year,
        public readonly int $perPage,
    ) {}

    public static function fromRequest(Request $request): self
    {
        $perPage = min(
            max((int) $request->query('per_page', 15), 1),
            100
        );

        $search = trim((string) $request->query('q', ''));
        $month = trim((string) $request->query('month', ''));
        $year = trim((string) $request->query('year', ''));

        return new self(
            search: $search !== '' ? $search : null,
            month: $month !== '' ? $month : null,
            year: $year !== '' ? $year : null,
            perPage: $perPage,
        );
    }
}
