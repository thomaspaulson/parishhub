<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDeathRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'full_name' => ['sometimes', 'string', 'max:255'],
            'parent' => ['sometimes', 'nullable', 'string', 'max:255'],
            'address' => ['sometimes', 'nullable', 'string', 'max:255'],
            'spouse' => ['sometimes', 'nullable', 'string', 'max:255'],
            'date_of_death' => ['sometimes', 'nullable', 'date', 'date_format:Y-m-d'],
            'cause_of_death' => ['sometimes', 'nullable', 'string', 'max:255'],
            'place_of_burial' => ['sometimes', 'nullable', 'string', 'max:255'],
            'date_of_burial' => ['sometimes', 'nullable', 'date', 'date_format:Y-m-d'],
            'reg_no' => ['sometimes', 'string', 'max:20'],
        ];
    }
}
