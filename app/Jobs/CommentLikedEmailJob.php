<?php

namespace App\Jobs;

use App\Models\User;
use App\Models\Comment;
use App\Mail\CommentLikedEmail;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class CommentLikedEmailJob implements ShouldQueue {
  use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

  public $comment;
  public $user;

  /**
   * Create a new job instance.
   */
  public function __construct(Comment $comment, User $user) {
    $this->comment = $comment;
    $this->user = $user;
  }

  /**
   * Execute the job.
   */
  public function handle(): void {
    Mail::to($this->comment->user->email)->send(new CommentLikedEmail($this->user, $this->comment));
  }
}
