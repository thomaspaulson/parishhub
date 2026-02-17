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
        Schema::create('marriages', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->date('date');
            $table->string('bride_full_name');
            $table->string('bride_parents');
            $table->string('groom_full_name');
            $table->string('groom_parents');
            $table->string('celebrant');
            $table->string('church');
            $table->date('married_on');
            $table->string('witness1',100)->nullable();
            $table->string('witness2',100)->nullable();
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
        Schema::dropIfExists('marriages');
    }
};
