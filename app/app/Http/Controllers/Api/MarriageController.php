<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreMarriageRequest;
use App\Http\Requests\Api\UpdateMarriageRequest;
use App\Http\Resources\MarriageResource;
use App\Models\Marriage;
use App\Services\Marriage\ListMarriage;
use App\Services\Marriage\ListMarriageService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MarriageController extends Controller
{
    public function index(Request $request, ListMarriageService $marriageService): JsonResponse
    {
        $dto = ListMarriage::fromRequest($request);

        $marriages = $marriageService->paginate($dto);

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
