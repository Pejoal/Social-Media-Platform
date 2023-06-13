<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChatGroupMessageSent implements ShouldBroadcastNow {
  use Dispatchable, InteractsWithSockets, SerializesModels;

  public $id;
  public $user;
  public $content;
  public $canUpdateMessage;
  public $created_at;
  public $chatGroupId;
  public function __construct(int $id, User $user, string $content, string $canUpdateMessage, string $created_at, int $chatGroupId) {
    $this->id = $id;
    $this->user = $user;
    $this->content = $content;
    $this->canUpdateMessage = $canUpdateMessage;
    $this->created_at = $created_at;
    $this->chatGroupId = $chatGroupId;
  }

  /**
   * Get the channels the event should broadcast on.
   *
   * @return array<int, \Illuminate\Broadcasting\Channel>
   */
  public function broadcastOn(): array
  {
    return [
      new PresenceChannel('chat.group.' . $this->chatGroupId),
    ];
  }

  public function broadcastWith(): array
  {
    return [
      "id" => $this->id,
      "content" => $this->content,
      "canUpdateMessage" => $this->canUpdateMessage,
      "name" => $this->user->firstname . ' ' . $this->user->lastname,
      "username" => $this->user->username,
      "created_at" => $this->created_at,
    ];
  }
}
