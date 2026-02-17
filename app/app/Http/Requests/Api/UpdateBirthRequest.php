<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBirthRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'date' => ['required', 'date', 'date_format:Y-m-d'],
            'full_name' => ['sometimes', 'string', 'max:255'],
            'father_name' => ['sometimes', 'string', 'max:255'],
            'mother_name' => ['sometimes', 'string', 'max:255'],
            'date_of_birth' => ['sometimes', 'date', 'date_format:Y-m-d'],
            'baptized_on' => ['sometimes', 'date', 'date_format:Y-m-d'],
            'baptized_at' => ['sometimes', 'string', 'max:255'],
            'celebrant' => ['sometimes', 'string', 'max:255'],
            'god_parents' => ['sometimes', 'string', 'max:255'],
            'parish' => ['sometimes', 'string', 'max:255'],
            'reg_no' => ['required', 'string', 'max:20'],
            'page_no' => ['sometimes', 'string', 'max:20'],
            'book_no' => ['sometimes', 'string', 'max:20'],
        ];
    }
}
