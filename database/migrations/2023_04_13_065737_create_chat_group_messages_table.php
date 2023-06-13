<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void {
    Schema::create('chat_group_messages', function (Blueprint $table) {
      $table->id();
      $table->string('content');
      $table->foreignId('user_id')->constrained()->onDelete('cascade');
      $table->foreignId('chat_group_id')->constrained()->onDelete('cascade');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void {
    Schema::dropIfExists('chat_group_messages');
  }
};
