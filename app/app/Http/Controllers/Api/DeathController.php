<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreDeathRequest;
use App\Http\Requests\Api\UpdateDeathRequest;
use App\Http\Resources\DeathResource;
use App\Models\Death;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DeathController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $perPage = (int) $request->query('per_page', 15);
        $perPage = max(1, min($perPage, 100));

        $deaths = Death::query()
            ->orderByDesc('id')
            ->paginate($perPage);

        return DeathResource::collection($deaths)->response();
    }

    public function store(StoreDeathRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $death = Death::query()->create($validated);

        return (new DeathResource($death))
            ->response()
            ->setStatusCode(201);
    }

    public function show(Death $death): JsonResponse
    {
        return (new DeathResource($death))->response();
    }

    public function update(UpdateDeathRequest $request, Death $death): JsonResponse
    {
        $validated = $request->validated();

        $death->fill($validated);
        $death->save();

        return (new DeathResource($death))->response();
    }

    public function destroy(Death $death): JsonResponse
    {
        $death->delete();
        return response()->json(null, 204);
    }

}
