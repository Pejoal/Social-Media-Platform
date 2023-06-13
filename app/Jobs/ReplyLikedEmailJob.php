<?php

namespace App\Jobs;

use App\Mail\ReplyLikedEmail;
use App\Models\Comment;
use App\Models\Reply;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class ReplyLikedEmailJob implements ShouldQueue {
  use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

  public $reply;
  public $comment;
  public $user;

  /**
   * Create a new job instance.
   */
  public function __construct(Reply $reply, Comment $comment, User $user) {
    $this->reply = $reply;
    $this->comment = $comment;
    $this->user = $user;
  }

  /**
   * Execute the job.
   */
  public function handle(): void {
    Mail::to($this->reply->user->email)->send(new ReplyLikedEmail($this->user, $this->comment, $this->reply));
  }
}
