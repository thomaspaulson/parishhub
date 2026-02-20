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
        $search = trim((string) $request->query('q', ''));

        $marriages = Marriage::query()
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($builder) use ($search) {
                    $builder
                        ->where('bride_full_name', 'like', "%{$search}%")
                        ->orWhere('bride_parents', 'like', "%{$search}%")
                        ->orWhere('groom_full_name', 'like', "%{$search}%")
                        ->orWhere('groom_parents', 'like', "%{$search}%")
                        ->orWhere('celebrant', 'like', "%{$search}%")
                        ->orWhere('church', 'like', "%{$search}%")
                        ->orWhere('married_on', 'like', "%{$search}%")
                        ->orWhere('witness1', 'like', "%{$search}%")
                        ->orWhere('witness2', 'like', "%{$search}%")
                        ->orWhere('reg_no', 'like', "%{$search}%")
                        ->orWhere('page_no', 'like', "%{$search}%")
                        ->orWhere('book_no', 'like', "%{$search}%")
                        ->orWhere('date', 'like', "%{$search}%");
                });
            })
            ->orderByDesc('created_at')
            ->paginate($perPage)
            ->appends($request->query());

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
