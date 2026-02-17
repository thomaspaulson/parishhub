<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreBirthRequest;
use App\Http\Requests\Api\UpdateBirthRequest;
use App\Http\Resources\BirthResource;
use App\Models\Birth;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BirthController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $perPage = (int) $request->query('per_page', 15);
        $perPage = max(1, min($perPage, 100));

        $births = Birth::query()
            ->orderByDesc('created_at')
            ->paginate($perPage);

        return BirthResource::collection($births)->response();
    }

    public function store(StoreBirthRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $birth = Birth::query()->create($validated);

        return (new BirthResource($birth))
            ->response()
            ->setStatusCode(201);
    }

    public function show(Birth $birth): JsonResponse
    {
        return (new BirthResource($birth))->response();
    }

    public function update(UpdateBirthRequest $request, Birth $birth): JsonResponse
    {
        $validated = $request->validated();

        $birth->fill($validated);
        $birth->save();

        return (new BirthResource($birth))->response();
    }

    public function destroy(Birth $birth): JsonResponse
    {
        $birth->delete();

        return response()->json(null, 204);
    }
}
