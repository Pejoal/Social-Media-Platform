<?php

namespace App\Http\Controllers;

use App\Jobs\PostLikedEmailJob;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;

class LikePostController extends Controller {
  public function store(Request $request, Post $post) {
    // dd($post);
    // dd($post->likes()->count());
    // dd($post->user->email);
    // dd($post->likes()->withTrashed()->get());
    // dd($post->likes()->onlyTrashed()->get());
    // dd($post->likes()->onlyTrashed()->where('user_id', $request->user()->id)->count());
    if ($post->likedBy($request->user())) {
      abort(403, "Not Allowed");
    }

    if (!$post->trashLikedBy($request->user())) {
      $post->likes()->create([
        'user_id' => $request->user()->id,
      ]);
    }

    // Mail::to("pejoal.official@gmail.com");
    // Mail::to(auth()->user())->send(new PostLiked());
    if (!$post->likes()->onlyTrashed()->where('user_id', $request->user()->id)->count()) {
      PostLikedEmailJob::dispatch($post, $request->user()); // Process Email Sending in The Queue
      // Mail::to($post->user->email)->send(new PostLiked($request->user(), $post));
    }
    return back();
  }

  public function destroy(Request $request, Post $post) {
    $request->user()->likes()->where('likeable_id', $post->id)->delete();
    return back();
  }

  public function index(Request $request, Post $post) {
    $likes = $post->likes->map(function ($like) {
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
      'object' => "post",
      'objectId' => $post->id,
    ]);
  }
}
