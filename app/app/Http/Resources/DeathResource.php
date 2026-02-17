<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property int $id
 * @property string $full_name
 * @property string|null $parent
 * @property string|null $address
 * @property string|null $spouse
 * @property string|null $date_of_death
 * @property string|null $cause_of_death
 * @property string|null $place_of_burial
 * @property string|null $date_of_burial
 * @property string $reg_no
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
class DeathResource extends JsonResource
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
            'full_name' => $this->full_name,
            'parent' => $this->parent,
            'address' => $this->address,
            'spouse' => $this->spouse,
            'date_of_death' => $this->date_of_death,
            'cause_of_death' => $this->cause_of_death,
            'place_of_burial' => $this->place_of_burial,
            'date_of_burial' => $this->date_of_burial,
            'reg_no' => $this->reg_no,
            'page_no' => $this->page_no,
            'book_no' => $this->book_no,
            'created_at' => optional($this->created_at)->toDateTimeString(),
            'updated_at' => optional($this->updated_at)->toDateTimeString(),
        ];
    }
}
