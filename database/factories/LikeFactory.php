<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Like>
 */
class LikeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
          'likeable_type' => fake()->randomElement(['App\\Models\\Post', 'App\\Models\\Comment', 'App\\Models\\Reply']),
          'likeable_id' => fake()->numberBetween(1, 20),
          'user_id' => fake()->numberBetween(2, 102),
        ];
    }
}
