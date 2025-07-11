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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
             $table->string('first_name');
    $table->string('last_name');
    $table->string('email')->unique();
    $table->string('telephone')->nullable();
    $table->string('adresse')->nullable();
    $table->date('date_naissance')->nullable();
    $table->string('ville')->nullable();
    $table->string('postal')->nullable();
    $table->string('sexe')->nullable();
    $table->string('password');
    $table->timestamp('email_verified_at')->nullable();
    $table->rememberToken();
    $table->softDeletes();
    $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
