<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory {
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition() {
    $firstname = fake()->firstName();
    $lastname = fake()->lastName();
    return [
      'firstname' => $firstname,
      'lastname' => $lastname,
      'userName' => fake()->unique()->userName(),
      'gender' => fake()->randomElement(['male', 'female']),
      'type' => fake()->randomElement(['writer', 'user']),
      // "slug" => Str::slug($firstname . " " . $lastname, '-'),
      'email' => fake()->unique()->safeEmail(),
      'email_verified_at' => now(),
      'password' => bcrypt('11111111'),
      'remember_token' => Str::random(10),
    ];
  }

  /**
   * Indicate that the model's email address should be unverified.
   *
   * @return static
   */
  public function unverified() {
    return $this->state(fn(array $attributes) => [
      'email_verified_at' => null,
    ]);
  }
}
