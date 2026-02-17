<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('births', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->date('date');
            $table->string('full_name');
            $table->string('father_name');
            $table->string('mother_name');
            $table->date('date_of_birth');
            $table->date('date_of_baptism');
            $table->string('place_of_baptism');
            $table->string('celebrant');
            $table->string('god_parents');
            $table->string('parish');
            $table->string('reg_no',20);
            $table->string('page_no',20)->nullable();
            $table->string('book_no',20)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('births');
    }
};
