<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void {
    Schema::create('friendships', function (Blueprint $table) {
      $table->id();
      $table->foreignId('user1_id')->constrained('users')->onDelete('cascade');
      $table->foreignId('user2_id')->constrained('users')->onDelete('cascade');
      $table->softDeletes();
      $table->foreignId('deleted_by')->nullable()->constrained('users');
      $table->timestamps();
      $table->unique(['user1_id', 'user2_id']);
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void {
    Schema::dropIfExists('friendships');
  }
};
