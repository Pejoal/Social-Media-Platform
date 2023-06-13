<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FriendshipStatus>
 */
class FriendshipStatusFactory extends Factory {
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  static $friendshipId = 1;

  public function definition(): array
  {
    return [
      'name' => fake()->randomElement(['pending', 'accepted']),
      'friendship_id' => self::$friendshipId++,
    ];
  }
}
