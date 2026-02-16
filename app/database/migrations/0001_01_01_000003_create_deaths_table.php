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
            $table->string('full_name');
            $table->string('parent')->nullable();
            $table->string('address')->nullable();
            $table->string('spouse')->nullable();
            $table->date('date_of_death')->nullable();
            $table->string('cause_of_death')->nullable();
            $table->string('place_of_burial')->nullable();
            $table->date('date_of_burial')->nullable();
            // $table->string('place_of_death')->nullable();
            $table->string('reg_no',20);
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
