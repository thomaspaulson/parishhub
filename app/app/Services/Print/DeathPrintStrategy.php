<?php
//
namespace App\Services\Print;


use App\Models\Death;

class DeathPrintStrategy implements PrintStrategy
{
    public function generate(string $id): array
    {
        $record = Death::findOrFail($id);

        return [
            'view' => 'print.death',
            'data' => compact('record')
        ];
    }
}
