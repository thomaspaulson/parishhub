<?php
namespace App\Http\Controllers;

use App\Services\Print\PrintStrategyFactory;
use Spatie\Browsershot\Browsershot;


class PrintController extends Controller
{
    public function show(string $id, string $type)
    {
        $strategy = PrintStrategyFactory::make($type);
        ['view' => $view, 'data' => $data] = $strategy->generate($id);

        return view($view, $data);
    }

    public function pdf(string $id, string $type)
    {
        $pdf = Browsershot::url("http://webserver/print/{$id}/{$type}")
            ->setRemoteInstance('chrome', 3000)
            ->pdf();

        return response($pdf)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="example.pdf"');
    }

}
