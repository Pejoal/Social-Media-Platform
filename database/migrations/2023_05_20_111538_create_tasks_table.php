<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void{
    Schema::create('tasks', function (Blueprint $table) {
      $table->id();
      $table->string('title');
      $table->string('slug');
      $table->text('description');
      $table->smallInteger('order')->default(0);
      $table->foreignId('status_id')->constrained('statuses')->onDelete('cascade');
      $table->foreignId('creator_id')->constrained('users')->onDelete('cascade');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void{
    Schema::dropIfExists('tasks');
  }
};
