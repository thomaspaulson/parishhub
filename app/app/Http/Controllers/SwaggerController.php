<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SwaggerController extends Controller
{
    /**
     * Display the Swagger UI page
     */
    public function index()
    {
        return view('swagger.index');
    }

    /**
     * Serve the OpenAPI specification file
     */
    public function spec()
    {
        $yamlPath = public_path('swagger.yaml');

        if (!file_exists($yamlPath)) {
            abort(404, 'Swagger specification not found');
        }

        return response()->file($yamlPath, [
            'Content-Type' => 'application/yaml',
        ]);
    }
}
