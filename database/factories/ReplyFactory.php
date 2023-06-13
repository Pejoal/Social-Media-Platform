<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reply>
 */
class ReplyFactory extends Factory {
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'content' => fake()->sentence(5),
      'comment_id' => fake()->numberBetween(1, 15),
      'user_id' => fake()->numberBetween(2, 12),
    ];
  }
}
