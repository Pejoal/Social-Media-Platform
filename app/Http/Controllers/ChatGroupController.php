<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChatGroupRequest;
use App\Models\ChatGroup;
use App\Models\ChatGroupMessage;
use App\Services\FriendshipService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatGroupController extends Controller {

  public function index() {
    // dd(auth()->user()->joinedChatGroups()->get());
    return Inertia::render('Chat_Groups/Index', [
      'joined_chat_groups' => auth()->user()->joinedChatGroups()->latest()->get()->map(function ($chat_group) {
        return [
          'id' => $chat_group->id,
          'name' => $chat_group->name,
          'description' => $chat_group->description,
          'created_at' => $chat_group->created_at->diffforhumans(),
          // 'creator_name' => $chat_group->creator->firstname . ' ' . $chat_group->creator->lastname,
          // 'creator_username' => $chat_group->creator->username,
        ];
      }),
    ]);
  }

  public function view(Request $request, ChatGroup $chatGroup) {
    // dd($chatGroup);

    $messages = $chatGroup->chatGroupMessages()->with(['user'])->latest()->paginate(15)->through(function ($message) {
      return [
        'id' => $message->id,
        'content' => $message->content,
        'canUpdateMessage' => auth()->user()->can('update', ChatGroupMessage::find($message->id)),
        'user' => [
          'id' => $message->user->id,
          'name' => $message->user->firstname . ' ' . $message->user->lastname,
          'username' => $message->user->username,
        ],
      ];
    });
    // dd($messages->items());

    if ($request->wantsJson()) {
      return response()->json([
        'data' => $messages->items(),
        'links' => [
          'next' => $messages->nextPageUrl(),
        ],
      ]);
    }

    $members = $chatGroup->members()->get()->map(function ($member) {
      return [
        'id' => $member->id,
        'name' => $member->firstname . ' ' . $member->lastname,
        'username' => $member->username,
      ];
    });
    $friends = FriendshipService::friends(auth()->user())->map(function ($friend) use ($chatGroup) {
      // dd($friend);
      if (!$friend->joinedChatGroups->contains($chatGroup)) {
        return [
          'id' => $friend->id,
          'name' => $friend->firstname . ' ' . $friend->lastname,
          'username' => $friend->username,
        ];
      } else {
        // return null if friend has already joined the chat group
        return null;
      }
    })->filter(); // filter out null values
    // dd($friends);
    return Inertia::render('Chat_Groups/View', [
      'messages' => $messages->items(),
      'chat_group' => [
        'id' => $chatGroup->id,
        'name' => $chatGroup->name,
        'description' => $chatGroup->description,
        'created_at' => $chatGroup->created_at->diffforhumans(),
        'creatorName' => $chatGroup->creator->firstname . ' ' . $chatGroup->creator->lastname,
        'creatorUsername' => $chatGroup->creator->username,
        'creator_id' => $chatGroup->creator_id,
        'members' => $members,
      ],
      'friends' => $friends,
      'joined_chat_groups' => auth()->user()->joinedChatGroups()->get()->map(function ($chat_group) {
        return [
          'id' => $chat_group->id,
          'name' => $chat_group->name,
          'description' => $chat_group->description,
          'created_at' => $chat_group->created_at->diffforhumans(),
          // 'creator_name' => $chat_group->creator->firstname . ' ' . $chat_group->creator->lastname,
          // 'creator_username' => $chat_group->creator->username,
        ];
      }),
    ]);
  }

  public function store(ChatGroupRequest $request) {
    // dd($request->name);
    $chatGroup = $request->user()->createdChatGroups()->create([
      'name' => $request->name,
    ]);
    $chatGroup->members()->attach($request->user()->id);
  }

  public function addUser(ChatGroup $chatGroup, Request $request) {
    // dd($chatGroup, $request->user_id);
    if (!FriendshipService::isFriend(0, $request->user_id)) {
      abort(403, 'You Are NOT Friends');
    }
    
    $chatGroup->members()->attach($request->user_id);
  }

  public function removeUser(ChatGroup $chatGroup, Request $request) {
    // dd($request->user_id);
    $chatGroup->members()->detach($request->user_id);
    if (auth()->user()->id == $request->user_id) {
      return to_route('home');
    }
  }

}
