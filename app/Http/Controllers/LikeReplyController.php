<?php

namespace App\Http\Controllers;

use App\Jobs\ReplyLikedEmailJob;
use App\Models\Comment;
use App\Models\Reply;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;

class LikeReplyController extends Controller {
  public function store(Request $request, Comment $comment, Reply $reply) {
    // dd($reply);
    if ($reply->likedBy($request->user())) {
      abort(403, 'Not Allowed');
    }

    if (!$reply->trashLikedBy($request->user())) {
      $reply->likes()->create([
        'user_id' => $request->user()->id,
      ]);
    }

    if (!$reply->likes()->onlyTrashed()->where('user_id', $request->user()->id)->count()) {
      // Mail::to($reply->user->email)->send(new ReplyLiked($request->user(), $comment, $reply));
      ReplyLikedEmailJob::dispatch($reply, $comment, $request->user()); // Process Email Sending in The Queue
    }
    return back();
  }

  public function destroy(Request $request, Comment $comment, Reply $reply) {
    $request->user()->likes()->where('likeable_id', $reply->id)->delete();
    return back();
  }

  public function index(Request $request, Comment $comment, Reply $reply) {
    $likes = $reply->likes->map(function ($like) {
      return [
        'user_id' => $like->user_id,
      ];
    });

    $users = User::whereIn('id', $likes->pluck('user_id'))->paginate(15)->through(function ($liker) {
      return [
        "id" => $liker->id,
        "name" => $liker->firstname . " " . $liker->lastname,
      ];
    });

    if ($request->wantsJson()) {
      return response()->json([
        'data' => $users->items(),
        'links' => [
          'next' => $users->nextPageUrl(),
        ],
      ]);
    }

    return Inertia::render('Shared/Likers', [
      'likers' => $users->items(),
      'object' => "reply",
      'objectId' => $comment->id,
      'object2Id' => $reply->id,
    ]);
  }
}
