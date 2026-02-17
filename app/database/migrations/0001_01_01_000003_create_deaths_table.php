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
        Schema::create('deaths', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->date('date');
            $table->string('full_name');
            $table->string('parent');
            $table->string('address');
            $table->string('spouse')->nullable();
            $table->date('date_of_death');
            $table->string('cause_of_death')->nullable();
            $table->string('place_of_burial');
            $table->date('date_of_burial');
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
        Schema::dropIfExists('deaths');
    }
};
