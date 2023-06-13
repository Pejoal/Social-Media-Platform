<?php

namespace App\Http\Controllers;

use App\Events\PrivateMessageSent;
use App\Http\Requests\PrivateMessageRequest;
use App\Models\Friendship;
use App\Models\PrivateMessage;
use App\Models\User;
use App\Services\FriendshipService;
use Inertia\Inertia;

class PrivateChatController extends Controller {
  public function index(User $user) {

    if (!FriendshipService::isFriend(0, $user->id)) {
      abort(403, 'You Are NOT Friends');
    }

    $friendship = Friendship::
      where(function ($query) use ($user) {
      $query->where('user1_id', $user->id)
        ->where('user2_id', auth()->user()->id)
        ->orWhere('user1_id', auth()->user()->id)
        ->where('user2_id', $user->id);
    })
      ->whereHas('status', function ($query) {
        $query->where('name', 'accepted');
      })
      ->first();

    $messages = PrivateMessage::
      where(function ($query) use ($user) {
      $query->where('user_id', $user->id)
        ->where('recipient_id', auth()->user()->id);
    })
      ->orWhere(function ($query) use ($user) {
        $query->where('user_id', auth()->user()->id)
          ->where('recipient_id', $user->id);
      })
      ->get()
      ->map(function ($message) {
        return [
          'id' => $message->id,
          'content' => $message->content,
          'created_at' => $message->created_at->diffForHumans(),
          'recipient_username' => $message->User::find($message->recipient_id)->username,
        ];
      });

    return Inertia::render('Private_Chat/Index', [
      "messages" => $messages,
      "friendship_id" => $friendship->id,
      "recipient_username" => $user->username,
    ]);
  }

  public function getChat() {
    dd("getChat");
    // return Inertia::render('Private_Chat/Index');
  }

  public function store(PrivateMessageRequest $request, User $user) {
    // dd($request->content);
    // dd($user);

    $message = auth()->user()->privateMessages()->create([
      "content" => $request->content,
      "recipient_id" => $user->id,
    ]);

    // dd($message->id, $request->content, $request->friendship_id, $user->username);
    broadcast(new PrivateMessageSent($message->id, $request->content, $request->friendship_id, $user->username));

    // return back();
  }

}
