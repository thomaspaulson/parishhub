<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class StoreBirthRequest extends FormRequest
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
            'father_name' => ['required', 'string', 'max:255'],
            'mother_name' => ['required', 'string', 'max:255'],
            'date_of_birth' => ['required', 'date', 'date_format:Y-m-d'],
            'date_of_baptism' => ['required', 'date', 'date_format:Y-m-d'],
            'place_of_baptism' => ['required', 'string', 'max:255'],
            'celebrant' => ['required', 'string', 'max:255'],
            'god_parents' => ['required', 'string', 'max:255'],
            'parish' => ['required', 'string', 'max:255'],
            'reg_no' => ['required', 'string', 'max:20'],
            'page_no' => ['nullable', 'string', 'max:20'],
            'book_no' => ['nullable', 'string', 'max:20'],
        ];
    }
}
