<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void {
    Schema::create('public_messages', function (Blueprint $table) {
      $table->id();
      $table->string("content");
      $table->foreignId('user_id')->constrained()->onDelete('cascade');
      $table->softDeletes();
      $table->foreignId('deleted_by')->nullable()->constrained('users');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void {
    Schema::dropIfExists('public_messages');
  }
};
