<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Death extends Model
{
    /** @use HasFactory<\Database\Factories\DeathFactory> */
    use HasFactory, HasUuids;
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'full_name',
        'parent',
        'address',
        'spouse',
        'date_of_death',
        'cause_of_death',
        'place_of_burial',
        'date_of_burial',
        'reg_no',
    ];


}
