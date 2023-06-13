<?php

namespace App\Http\Controllers;

use App\Jobs\CommentLikedEmailJob;
use App\Jobs\CommentLikeEmail;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LikeCommentController extends Controller {
  public function destroy(Request $request, Comment $comment) {
    $request->user()->likes()->where('likeable_id', $comment->id)->delete();
    return back();
  }

  public function index(Request $request, Comment $comment) {

    $likes = $comment->likes->map(function ($like) {
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
      'object' => "comment",
      'objectId' => $comment->id,
    ]);
  }

  public function store(Request $request, Comment $comment) {
    // dd($comment);
    if ($comment->likedBy($request->user())) {
      abort(403, 'Not Allowed');
    }

    if (!$comment->trashLikedBy($request->user())) {
      $comment->likes()->create([
        'user_id' => $request->user()->id,
      ]);
    }

    if (!$comment->likes()->onlyTrashed()->where('user_id', $request->user()->id)->count()) {
      // Mail::to($comment->user->email)->send(new CommentLiked($request->user(), $comment));
      CommentLikedEmailJob::dispatch($comment, $request->user());
    }
    return back();
  }
}
