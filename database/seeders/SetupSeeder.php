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

    User::factory(10)->create()->each(function ($user) {
      Post::factory(rand(1, 5))->create(['user_id' => $user->id])->each(function ($post) use ($user) {
        Comment::factory(rand(1, 5))->create(['user_id' => $user->id, 'post_id' => $post->id])->each(function ($comment) use ($user) {
          Reply::factory(rand(1, 5))->create(['user_id' => $user->id, 'comment_id' => $comment->id]);
        });
      });
    });

    $users = User::all();
    $posts = Post::all();
    for ($i = 0; $i < 60; $i++) {
      $user_id = $users->random()->id;
      $post_id = $posts->random()->id;

      if (!Like::where('likeable_type', Post::class)->where('likeable_id', $post_id)->where('user_id', $user_id)->exists()) {
        Like::factory()->create(['user_id' => $user_id, 'likeable_id' => $post_id, 'likeable_type' => Post::class]);
      }
    }

    $comments = Comment::all();
    for ($i = 0; $i < 60; $i++) {
      $user_id = $users->random()->id;
      $comment_id = $comments->random()->id;

      if (!Like::where('likeable_type', Comment::class)->where('likeable_id', $comment_id)->where('user_id', $user_id)->exists()) {
        Like::factory()->create(['user_id' => $user_id, 'likeable_id' => $comment_id, 'likeable_type' => Comment::class]);
      }
    }

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

    for ($i = 0; $i < 15; $i++) {
      $friendship = Friendship::firstOrCreate([
        'user1_id' => 1,
        'user2_id' => $users->random()->id,
      ]);

      FriendshipStatus::firstOrCreate([
        'friendship_id' => $friendship->id,
        'name' => 'accepted',
      ]);

      $friendship = Friendship::firstOrCreate([
        'user2_id' => 1,
        'user1_id' => $users->random()->id,
      ]);

      FriendshipStatus::firstOrCreate([
        'friendship_id' => $friendship->id,
        'name' => 'pending',
      ]);
    }

    // RoomMessage::factory(10)->create();
  }
}
