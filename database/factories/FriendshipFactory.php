<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Friendship>
 */
class FriendshipFactory extends Factory {
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'user1_id' => fake()->numberBetween(2, 102),
      'user2_id' => fake()->numberBetween(1, 4),
    ];
  }
}
