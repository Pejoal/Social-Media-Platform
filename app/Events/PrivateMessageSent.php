<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PrivateMessageSent implements ShouldBroadcastNow {
  use Dispatchable, InteractsWithSockets, SerializesModels;

  /**
   * Create a new event instance.
   */
  public $id;
  public $content;
  public $friendship_id;
  public $recipient_username;

  public function __construct($id, $content, $friendship_id, $recipient_username) {
    $this->id = $id;
    $this->content = $content;
    $this->friendship_id = $friendship_id;
    $this->recipient_username = $recipient_username;
  }

  /**
   * Get the channels the event should broadcast on.
   *
   * @return array<int, \Illuminate\Broadcasting\Channel>
   */
  public function broadcastOn(): array
  {
    return [
      new PresenceChannel('friend.chat.' . $this->friendship_id),
    ];
  }

  public function broadcastWith(): array
  {
    return [
      "id" => $this->id,
      "content" => $this->content,
      "recipient_username" => $this->recipient_username,
    ];
  }
}
