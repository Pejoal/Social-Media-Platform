<?php

namespace App\Http\Controllers;

use App\Events\ChatGroupMessageSent;
use App\Http\Requests\ChatGroupMessageRequest;
use App\Models\ChatGroupMessage;
use App\Models\ChatGroup;

class ChatGroupMessageController extends Controller {

  public function store(ChatGroup $chatGroup, ChatGroupMessageRequest $request) {
    $message = $chatGroup->chatGroupMessages()->create([
      'user_id' => auth()->user()->id,
      'content' => $request->content,
    ]);
    broadcast(new ChatGroupMessageSent($message->id, auth()->user(), $request->content, auth()->user()->can('update', ChatGroupMessage::find($message->id)) , $message->created_at->diffforhumans(), $chatGroup->id));
  }

}
