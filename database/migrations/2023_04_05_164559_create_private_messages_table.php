<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void {
    Schema::create('private_messages', function (Blueprint $table) {
      $table->id();
      $table->string("content");
      $table->foreignId('user_id')->constrained()->onDelete('cascade');
      $table->foreignId('recipient_id')->constrained('users');
      $table->softDeletes();
      $table->foreignId('deleted_by')->nullable()->constrained('users');
      $table->timestamps();
      // $table->foreign('recipient_id')->references('id')->on('users');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void {
    Schema::dropIfExists('private_messages');
  }
};
