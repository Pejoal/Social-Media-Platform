<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void {
    Schema::create('master_settings', function (Blueprint $table) {
      $table->id();
      $table->string('app_name')->default('The Network');
      $table->string('logo')->nullable();
      $table->string('bg_color')->default('#000');
      $table->string('bg_color2')->default('#000');
      $table->string('primary_color')->default('#2D3748');
      $table->string('secondary_color')->default('#4A5568');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void {
    Schema::dropIfExists('master_settings');
  }
};
