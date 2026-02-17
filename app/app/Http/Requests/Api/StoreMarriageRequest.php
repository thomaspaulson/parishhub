<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class StoreMarriageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'date' => ['required', 'date', 'date_format:Y-m-d'],
            'bride_full_name' => ['required', 'string', 'max:255'],
            'bride_parents' => ['required', 'string', 'max:255'],
            'groom_full_name' => ['required', 'string', 'max:255'],
            'groom_parents' => ['required', 'string', 'max:255'],
            'celebrant' => ['required', 'string', 'max:255'],
            'church' => ['required', 'string', 'max:255'],
            'married_on' => ['required', 'date', 'date_format:Y-m-d'],
            'witness1' => ['nullable', 'string', 'max:100'],
            'witness2' => ['nullable', 'string', 'max:100'],
            'reg_no' => ['required', 'string', 'max:20'],
            'page_no' => ['nullable', 'string', 'max:20'],
            'book_no' => ['nullable', 'string', 'max:20'],
        ];
    }
}
