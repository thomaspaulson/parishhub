<?php
namespace App\Services\Print;

use App\Models\Marriage;

class MarriagePrintStrategy implements PrintStrategy
{
    public function generate(string $id): array
    {
        $record = Marriage::findOrFail($id);

        return [
            'view' => 'print.marriage',
            'data' => compact('record')
        ];
    }
}
