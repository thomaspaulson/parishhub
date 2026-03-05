<?php
//
namespace App\Services\Print;

use Exception;

class PrintStrategyFactory
{
    public static function make(string $type)
    {
        return match ($type) {
            'birth' => new BirthPrintStrategy(),
            'death' => new DeathPrintStrategy(),
            'marriage' => new MarriagePrintStrategy(),
            default => throw new Exception("Invalid print type"),
        };
    }
}
