<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class RoomMessageSent implements ShouldBroadcastNow {
  use Dispatchable, InteractsWithSockets, SerializesModels;

  public $user;
  public $content;
  public $roomId;
  public function __construct(User $user, string $content, int $roomId) {
    $this->user = $user;
    $this->content = $content;
    $this->roomId = $roomId;
  }

  /**
   * Get the channels the event should broadcast on.
   *
   * @return array<int, \Illuminate\Broadcasting\Channel>
   */
  public function broadcastOn(): array
  {
    return [
      new PresenceChannel('chat.' . $this->roomId),
    ];
  }

  public function broadcastWith(): array
  {
    return [
      "content" => $this->content,
      "firstname" => $this->user->firstname,
      "lastname" => $this->user->lastname,
    ];
  }
}
