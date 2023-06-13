<?php

namespace App\Events;

use App\Models\PublicMessage;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcastNow {
  use Dispatchable, InteractsWithSockets, SerializesModels;

  public $user;
  public $message;
  public function __construct(User $user, PublicMessage $message) {
    $this->user = $user;
    $this->message = $message;
  }
  /**
   * Get the channels the event should broadcast on.
   *
   * @return array<int, \Illuminate\Broadcasting\Channel>
   */
  public function broadcastOn(): array
  {
    return [
      new Channel('chat'),
    ];
  }

  public function broadcastWith(): array
  {
    return [
      "id" => $this->message->id,
      "content" => $this->message->content,
      "user_firstname" => $this->user->firstname,
    ];
  }
}
