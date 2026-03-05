<?php
//
namespace App\Services\Print;

interface PrintStrategy
{
    public function generate(string $id): array;
}
