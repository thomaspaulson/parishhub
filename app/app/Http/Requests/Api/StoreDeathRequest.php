<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class StoreDeathRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'full_name' => ['required', 'string', 'max:255'],
            'parent' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:255'],
            'spouse' => ['nullable', 'string', 'max:255'],
            'date_of_death' => ['nullable', 'date', 'date_format:Y-m-d'],
            'cause_of_death' => ['nullable', 'string', 'max:255'],
            'place_of_burial' => ['nullable', 'string', 'max:255'],
            'date_of_burial' => ['nullable', 'date','date_format:Y-m-d'],
            'reg_no' => ['required', 'string', 'max:20'],
        ];
    }
}
