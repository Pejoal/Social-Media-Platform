<?php

namespace App\Http\Controllers;
use App\Http\Requests\CommentRequest;
use App\Jobs\PostCommentedEmailJob;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Models\Post;

class CommentController extends Controller {
  public function store(CommentRequest $request, Post $post): RedirectResponse {
    // dd($post->id);


    $comment = $request->user()->comments()->create([
      'post_id' => $post->id,
      'content' => $request->content,
    ]);
    // dd($comment);

    // Mail::to($post->user->email)->send(new PostCommented($request->user(), $post, $comment));
    PostCommentedEmailJob::dispatch($request->user(), $post, $comment); 

    return Redirect::back();
  }
}
