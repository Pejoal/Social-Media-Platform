<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory {
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'content' => fake()->words(10, true),
      'post_id' => fake()->numberBetween(1, 20),
      'user_id' => fake()->numberBetween(2, 102),
    ];
  }
}
