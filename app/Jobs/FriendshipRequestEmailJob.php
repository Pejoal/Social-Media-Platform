<?php

namespace App\Jobs;

use App\Mail\FriendshipRequestEmail;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class FriendshipRequestEmailJob implements ShouldQueue {
  use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

  /**
   * Create a new job instance.
   */
  public $user1;
  public $user2;
  public function __construct(User $user1, User $user2) {
    $this->user1 = $user1;
    $this->user2 = $user2;
  }

  /**
   * Execute the job.
   */
  public function handle(): void {
    Mail::to($this->user2->email)->send(new FriendshipRequestEmail($this->user1));
  }
}
