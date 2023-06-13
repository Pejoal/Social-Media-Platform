<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Models\Comment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class UserCommentController extends Controller {
  public function __construct(Request $request) {
    // dd($request->comment); // 223
    $this->middleware("can.update.comment:$request->comment");
  }

  public function destroy(Request $request, Comment $comment): RedirectResponse {
    $comment->delete();
    if ($request->input('component') === 'Replies/Index') {
      return Redirect::route("home");
    }
    return back();
  }

  public function edit(Comment $comment): Response {
    return Inertia::render('Comments/Edit', [
      'comment' => [
        'id' => $comment->id,
        'content' => $comment->content,
      ],
    ]);
  }

  public function update(CommentRequest $request, Comment $comment): RedirectResponse {
    // dd($request);
    $comment->fill($request->validated());
    $comment->save();

    // return Redirect::route("comments.edit", $comment->id)->with($comment);
    return Redirect::route("home");
  }

}
