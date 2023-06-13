<?php

namespace App\Jobs;

use App\Mail\CommentRepliedEmail;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class CommentRepliedEmailJob implements ShouldQueue {
  use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

  public $user;
  public $comment;

  /**
   * Create a new job instance.
   */
  public function __construct(User $user, Comment $comment) {
    $this->user = $user;
    $this->comment = $comment;
  }

  /**
   * Execute the job.
   */
  public function handle(): void {
    Mail::to($this->comment->user->email)->send(new CommentRepliedEmail($this->user, $this->comment));
  }
}
