<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\PublicMessage;
use Illuminate\Http\Request;
use Inertia\Controller;
use Inertia\Inertia;

class ChatController extends Controller {
  public function index() {
    return Inertia::render('Chat/Index');
  }

  public function fetchMessages() {
    return PublicMessage::with('user')->latest()->get()->map(function ($message) {
      return [
        "id" => $message->id,
        "content" => $message->content,
        "user_firstname" => $message->user->firstname,
      ];
    });
  }

  public function sendMessage(Request $request) {
    $user = $request->user();
    $message = $user->publicMessages()->create([
      'content' => $request->input('content'),
    ]);
    // broadcast(new MessageSent($user, $message))->toOthers();
    broadcast(new MessageSent($user, $message));
    // return ['status' => 'Message Sent!'];
  }
}
