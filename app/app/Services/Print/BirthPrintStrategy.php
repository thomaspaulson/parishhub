<?php
//
namespace App\Services\Print;

use App\Models\Birth;

class BirthPrintStrategy implements PrintStrategy
{
    public function generate(string $id): array
    {
        $record = Birth::findOrFail($id);
        $title = 'Birth Record Certificate';

        return [
            'view' => 'print.birth',
            'data' => compact('record', 'title')
        ];
    }
}
