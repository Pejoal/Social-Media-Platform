<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use App\Mail\PostLikedEmail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use app\Models\Post;
use app\Models\User;
use Illuminate\Support\Facades\Mail;

class PostLikedEmailJob implements ShouldQueue {
  use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

  public $post; 
  public $user; 

  /**
   * Create a new job instance.
   */
  public function __construct(Post $post, User $user) {
    $this->post = $post;
    $this->user = $user;
  }

  /**
   * Execute the job.
   */
  public function handle(): void {
    Mail::to($this->post->user->email)->send(new PostLikedEmail($this->user, $this->post));
  }
}
