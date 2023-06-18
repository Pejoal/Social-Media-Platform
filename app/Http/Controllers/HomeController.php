<?php

namespace App\Http\Controllers;

// use App\Models\MasterSetting;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller {

  public function index(Request $request) {
    // dd(MasterSetting::first()->app_name);
    // $page = $request->input('page');
    $posts = Post::query()
      ->when($request->search, function ($query, $search) {
        $query->where('content', 'like', "%{$search}%");
      })
      ->latest()
      ->paginate(15)
      ->withQueryString()
      ->through(function ($post) {
        return [
          'id' => $post->id,
          'content' => $post->content,
          'created_at' => $post->created_at->diffForHumans(),
          'author' => $post->user->firstname,
          'authorPhoto' => $post->user->profile_photo_url,
          'username' => $post->user->username,
          'likes' => $post->likes->count(),
          'commentsCount' => $post->comments->count(),
          'canLikePost' => !$post->likedBy(auth()->user()),
          'canUpdatePost' => auth()->user()->can('update', Post::find($post->id)),
        ];
      });

    if ($request->wantsJson()) {
      return response()->json([
        'data' => $posts->items(),
        'links' => [
          'next' => $posts->nextPageUrl(),
        ],
        'filters' => $request->only(['search']),
      ]);
    }

    $joined_chat_groups = $request->user()->joinedChatGroups()->get()->map(function ($chat_group) {
      return [
        'id' => $chat_group->id,
        'name' => $chat_group->name,
        'description' => $chat_group->description,
        'created_at' => $chat_group->created_at->diffForHumans(),
      ];
    });

    $projects = $request->user()->projects()->select('id', 'name', 'code', 'slug', 'created_at')->get()->map(function ($project) {
      return [
        'id' => $project->id,
        'name' => $project->name,
        'code' => $project->code,
        'slug' => $project->slug,
        'created_at' => $project->created_at->diffForHumans(),
      ];
    });

    return Inertia::render('Home', [
      'posts' => $posts->items(),
      'filters' => $request->only(['search']),
      'joined_chat_groups' => $joined_chat_groups,
      'projects' => $projects,
    ]);
  }
}
