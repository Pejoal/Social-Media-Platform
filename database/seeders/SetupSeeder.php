<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Friendship;
use App\Models\FriendshipStatus;
use App\Models\Like;
use App\Models\Post;
use App\Models\Reply;
use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Seeder;

class SetupSeeder extends Seeder {
  /**
   * Run the database seeds.
   */

  public function run(): void {

    $users = [
      [
        'firstname' => 'Pejoal',
        'lastname' => 'Nagy',
        'username' => 'pejoal',
        'gender' => 'male',
        'email' => 'pejoal.official@gmail.com',
        'email_verified_at' => now(),
        'password' => bcrypt('88888888'),
        'type' => 'super admin',
      ],
      [
        'firstname' => 'Jane',
        'lastname' => 'Doe',
        'username' => 'jane',
        'gender' => 'female',
        'email' => 'jane.doe@example.com',
        'email_verified_at' => now(),
        'password' => bcrypt('11111111'),
        'type' => 'user',
      ],
    ];

    foreach ($users as $user) {
      User::create($user);
    }

    User::factory(10)->has(Post::factory(3))->create();
    User::factory(100)->create();

    $rooms = [
      ['title' => 'Front End', 'slug' => 'Front-End'],
      ['title' => 'Back End', 'slug' => 'Back-End'],
      ['title' => 'Mobile App', 'slug' => 'Mobile-App'],
      ['title' => 'Desktop', 'slug' => 'Desktop'],
      ['title' => 'Video Games', 'slug' => 'Video-Games'],
    ];

    foreach ($rooms as $room) {
      Room::create($room);
    }

    Comment::factory(20)->create();
    Reply::factory(20)->create();

    $users = User::all();

    for ($i = 0; $i < 30; $i++) {
      $friendship = Friendship::firstOrCreate([
        'user1_id' => 1,
        'user2_id' => $users->random()->id,
      ]);

      FriendshipStatus::firstOrCreate([
        'friendship_id' => $friendship->id,
        'name' => collect(['accepted', 'pending'])->random(),
      ]);
    }

    Like::factory(30)->create();

    // RoomMessage::factory(10)->create();
  }
}
