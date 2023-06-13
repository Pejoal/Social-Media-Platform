<?php

namespace App\Http\Controllers;

use App\Events\RoomMessageSent;
use Inertia\Inertia;
use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller {
  public function index() {
    return Inertia::render('Room/Index', [
      'rooms' => Room::all()->toArray(),
    ]);
  }

  public function room(Room $room) {
    $messages = $room->messages()->with('user')->get()->map(function ($message) {
      return [
        "id" => $message->id,
        "content" => $message->content,
        "firstname" => $message->user->firstname,
        "lastname" => $message->user->lastname,
      ];
    });
    return Inertia::render('Room/Room', [
      "roomId" => $room->id,
      "title" => $room->title,
      "messages" => $messages,
    ]);
  }

  public function broadcastMessage(Request $request) {
    // dd($request->content);
    $user = $request->user();
    broadcast(new RoomMessageSent($user, $request->content, $request->roomId))->toOthers();
  }

  
}
