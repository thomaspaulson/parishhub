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
        $search = trim((string) $request->query('q', ''));

        $births = Birth::query()
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($builder) use ($search) {
                    $builder
                        ->where('full_name', 'like', "%{$search}%")
                        ->orWhere('date_of_birth', 'like', "%{$search}%")
                        ->orWhere('reg_no', 'like', "%{$search}%")
                        ->orWhere('page_no', 'like', "%{$search}%")
                        ->orWhere('book_no', 'like', "%{$search}%");
                });
            })
            ->orderByDesc('created_at')
            ->paginate($perPage)
            ->appends($request->query());

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
