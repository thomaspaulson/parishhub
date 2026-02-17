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
            'date' => ['required', 'date', 'date_format:Y-m-d'],
            'full_name' => ['required', 'string', 'max:255'],
            'parent' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
            'spouse' => ['nullable', 'string', 'max:255'],
            'date_of_death' => ['required', 'date', 'date_format:Y-m-d'],
            'cause_of_death' => ['nullable', 'string', 'max:255'],
            'place_of_burial' => ['required', 'string', 'max:255'],
            'date_of_burial' => ['required', 'date', 'date_format:Y-m-d'],
            'reg_no' => ['required',  'string', 'max:20'],
            'page_no' => ['nullable', 'string', 'max:20'],
            'book_no' => ['nullable', 'string', 'max:20'],
        ];
    }
}
