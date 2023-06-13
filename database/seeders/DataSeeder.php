<?php

namespace Database\Seeders;

use App\Models\PublicMessage;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Post;
use App\Models\Comment;
use App\Models\Reply;
use App\Models\Like;

class DataSeeder extends Seeder {
  /**
   * Run the database seeds.
   */
  public function run(): void {
    User::factory(50)->has(Post::factory(2))->create();
    Comment::factory(100)->create();
    Reply::factory(200)->create();
    Like::factory(500)->create();
    PublicMessage::factory(100)->create();
  }
}
