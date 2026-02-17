<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Marriage extends Model
{
    /** @use HasFactory<\Database\Factories\MarriageFactory> */
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'date',
        'bride_full_name',
        'bride_parents',
        'groom_full_name',
        'groom_parents',
        'celebrant',
        'church',
        'married_on',
        'witness1',
        'witness2',
        'reg_no',
        'page_no',
        'book_no',
    ];
}
