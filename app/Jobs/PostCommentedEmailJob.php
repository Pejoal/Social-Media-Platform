<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use App\Models\Post;
use App\Models\Comment;
use App\Mail\PostCommentedEmail;

class PostCommentedEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $user;
    public $post;
    public $comment;
  
    /**
     * Create a new job instance.
     */
    public function __construct( User $user, Post $post, Comment $comment) {
      $this->user = $user;
      $this->post = $post;
      $this->comment = $comment;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
      Mail::to($this->post->user->email)->send(new PostCommentedEmail($this->user, $this->post, $this->comment));
    }
}
