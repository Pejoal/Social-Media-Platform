<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChatGroupMessageRequest;
use App\Models\ChatGroup;
use App\Models\ChatGroupMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserChatGroupMessageController extends Controller {
  public function __construct(Request $request) {
    // dd($request->chatGroupMessage); // 223
    $this->middleware("can.update.chat.group.message:$request->chatGroupMessage");
  }

  public function destroy(Request $request, ChatGroup $chatGroup, ChatGroupMessage $chatGroupMessage) {
    // dd($chatGroupMessage);
    $chatGroupMessage->delete();
  }

  public function edit(ChatGroup $chatGroup, ChatGroupMessage $chatGroupMessage) {
    return Inertia::render('ChatGroupMessage/Edit', [
      'chatGroupMessage' => [
        'id' => $chatGroupMessage->id,
        'content' => $chatGroupMessage->content,
      ],
    ]);
  }

  public function update(ChatGroupMessageRequest $request, ChatGroup $chatGroup, ChatGroupMessage $chatGroupMessage) {
    $chatGroupMessage->fill($request->validated());
    $chatGroupMessage->save();
    return;
  }

}
