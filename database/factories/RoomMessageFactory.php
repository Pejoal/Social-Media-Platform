<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RoomMessage>
 */
class RoomMessageFactory extends Factory {
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'content' => fake()->sentence(5),
      'room_id' => fake()->numberBetween(1, 5),
      'user_id' => fake()->numberBetween(2, 12),
    ];
  }
}
