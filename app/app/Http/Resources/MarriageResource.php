<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property string $id
 * @property string $date
 * @property string $bride_full_name
 * @property string $bride_parents
 * @property string $groom_full_name
 * @property string $groom_parents
 * @property string $celebrant
 * @property string $church
 * @property string $married_on
 * @property string|null $witness1
 * @property string|null $witness2
 * @property string $reg_no
 * @property string|null $page_no
 * @property string|null $book_no
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
class MarriageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'date' => $this->date,
            'bride_full_name' => $this->bride_full_name,
            'bride_parents' => $this->bride_parents,
            'groom_full_name' => $this->groom_full_name,
            'groom_parents' => $this->groom_parents,
            'celebrant' => $this->celebrant,
            'church' => $this->church,
            'married_on' => $this->married_on,
            'witness1' => $this->witness1,
            'witness2' => $this->witness2,
            'reg_no' => $this->reg_no,
            'page_no' => $this->page_no,
            'book_no' => $this->book_no,
            'created_at' => optional($this->created_at)->toDateTimeString(),
            'updated_at' => optional($this->updated_at)->toDateTimeString(),
        ];
    }
}
