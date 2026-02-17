<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreMarriageRequest;
use App\Http\Requests\Api\UpdateMarriageRequest;
use App\Http\Resources\MarriageResource;
use App\Models\Marriage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MarriageController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $perPage = (int) $request->query('per_page', 15);
        $perPage = max(1, min($perPage, 100));

        $marriages = Marriage::query()
            ->orderByDesc('created_at')
            ->paginate($perPage);

        return MarriageResource::collection($marriages)->response();
    }

    public function store(StoreMarriageRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $marriage = Marriage::query()->create($validated);

        return (new MarriageResource($marriage))
            ->response()
            ->setStatusCode(201);
    }

    public function show(Marriage $marriage): JsonResponse
    {
        return (new MarriageResource($marriage))->response();
    }

    public function update(UpdateMarriageRequest $request, Marriage $marriage): JsonResponse
    {
        $validated = $request->validated();

        $marriage->fill($validated);
        $marriage->save();

        return (new MarriageResource($marriage))->response();
    }

    public function destroy(Marriage $marriage): JsonResponse
    {
        $marriage->delete();

        return response()->json(null, 204);
    }
}
