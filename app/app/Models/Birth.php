<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Birth extends Model
{
    /** @use HasFactory<\Database\Factories\BirthFactory> */
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'date',
        'full_name',
        'father_name',
        'mother_name',
        'date_of_birth',
        'baptized_on',
        'baptized_at',
        'celebrant',
        'god_parents',
        'parish',
        'reg_no',
        'page_no',
        'book_no',
    ];
}
