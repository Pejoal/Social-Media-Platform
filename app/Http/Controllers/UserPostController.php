<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class UserPostController extends Controller {

  public function __construct(Request $request) {
    // dd($request->post); // 21
    $this->middleware("can.update.post:$request->post");
  }

  public function destroy(Request $request, Post $post) {
    // dd($post);
    $post->delete();
    if ($request->input('component') === 'User/Post') {
      return Redirect::route("home");
    }
  }

  public function edit(Post $post): Response {
    // dd($request->user());
    // dd($post);
    return Inertia::render('Posts/Edit', [
      'post' => [
        'id' => $post->id,
        'content' => $post->content,
        'created_at' => $post->created_at->diffForHumans(),
        'author' => $post->user->firstname,
      ],
    ]);
  }

  public function update(PostRequest $request, Post $post): RedirectResponse {
    // dd($request->content, $post);
    $post->fill($request->validated());
    $post->save();
    return Redirect::route("home");
  }
}
