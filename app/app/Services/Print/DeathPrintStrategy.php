<?php
//
namespace App\Services\Print;


use App\Models\Death;

class DeathPrintStrategy implements PrintStrategy
{
    public function generate(string $id): array
    {
        $record = Death::findOrFail($id);
        $title = 'Death Record Certificate';
        return [
            'view' => 'print.death',
            'data' => compact('record', 'title')
        ];
    }
}
