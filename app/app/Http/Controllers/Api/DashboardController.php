<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Birth;
use App\Models\Death;
use App\Models\Marriage;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function summary(): JsonResponse
    {
        return response()->json([
            'totals' => [
                'births' => Birth::count(),
                'deaths' => Death::count(),
                'marriages' => Marriage::count(),
                'users' => User::count(),
                'admins' => User::where('is_admin', true)->count(),
            ],
            'generated_at' => now()->toDateTimeString(),
        ]);
    }
}
