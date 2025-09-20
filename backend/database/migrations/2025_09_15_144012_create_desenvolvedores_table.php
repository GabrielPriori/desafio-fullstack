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
        Schema::create('desenvolvedores', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('sexo');
            $table->date('data_nascimento');
            $table->string('hobby');
            $table->unsignedBigInteger('nivel_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('desenvolvedores');
    }
};
