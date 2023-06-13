<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReplyRequest;
use App\Models\Comment;
use App\Models\Reply;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class UserReplyController extends Controller {
  public function __construct(Request $request) {
    $this->middleware("can.update.reply:$request->reply");
  }

  public function destroy(Request $request, Comment $comment, Reply $reply): RedirectResponse {
    // dd($reply);
    $reply->delete();
    return back();
  }

  public function edit(Comment $comment, Reply $reply): Response {
    return Inertia::render('Replies/Edit', [
      'reply' => [
        'id' => $reply->id,
        'comment_id' => $comment->id,
        'content' => $reply->content,
      ],
    ]);
  }

  public function update(ReplyRequest $request, Comment $comment, Reply $reply): RedirectResponse {
    // dd($request->body);
    $reply->fill($request->validated());
    $reply->save();

    return Redirect::route("home");
  }
}
