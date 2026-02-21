<?php

namespace App\Services\Marriage;

use Illuminate\Http\Request;

class ListMarriage
{
    public function __construct(
        public readonly ?string $search,
        public readonly int $perPage,
    ) {}

    public static function fromRequest(Request $request): self
    {
        $perPage = min(
            max((int) $request->query('per_page', 15), 1),
            100
        );

        $search = trim((string) $request->query('q', ''));

        return new self(
            search: $search !== '' ? $search : null,
            perPage: $perPage,
        );
    }
}
