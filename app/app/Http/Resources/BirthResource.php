<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property int $id
 * @property string $date
 * @property string $full_name
 * @property string $father_name
 * @property string $mother_name
 * @property string $date_of_birth
 * @property string $baptized_on
 * @property string $baptized_at
 * @property string $celebrant
 * @property string $god_parents
 * @property string $parish
 * @property string $reg_no
 * @property string|null $page_no
 * @property string|null $book_no
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
class BirthResource extends JsonResource
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
            'father_name' => $this->father_name,
            'mother_name' => $this->mother_name,
            'date_of_birth' => $this->date_of_birth,
            'date_of_baptism' => $this->date_of_baptism,
            'place_of_baptism' => $this->place_of_baptism,
            'celebrant' => $this->celebrant,
            'god_parents' => $this->god_parents,
            'parish' => $this->parish,
            'reg_no' => $this->reg_no,
            'page_no' => $this->page_no,
            'book_no' => $this->book_no,
            'created_at' => optional($this->created_at)->toISOString(),
            'updated_at' => optional($this->updated_at)->toISOString(),
        ];
    }
}
