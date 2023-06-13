<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void{
    Schema::create('statuses', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->string('slug');
      $table->smallInteger('order')->default(0);
      $table->foreignId('project_id')->constrained('projects')->onDelete('cascade');
      $table->foreignId('creator_id')->constrained('users')->onDelete('cascade');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void{
    Schema::dropIfExists('statuses');
  }
};
