<?php
namespace App\Http\Controllers;

use App\Services\Print\PrintStrategyFactory;

class PrintController extends Controller
{
    public function show(string $id, string $type)
    {
        $strategy = PrintStrategyFactory::make($type);
        ['view' => $view, 'data' => $data] = $strategy->generate($id);

        return view($view, $data);
    }
}
