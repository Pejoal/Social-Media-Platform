<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Comment;
use App\Models\Friendship;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Redirect;
// use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller {

  public function store(PostRequest $request) {
    // dd($request->content);
    $request->user()->posts()->create([
      'content' => $request->content,
    ]);

    // return to_route('home');
  }

  public function myProfile(Request $request) {

    $posts = $request->user()->posts()->latest()->paginate(15)->through(function ($post) {
      return [
        'id' => $post->id,
        'title' => $post->title,
        'content' => $post->content,
        'created_at' => $post->created_at->diffForHumans(),
        'author' => $post->user->firstname,
        'authorPhoto' => $post->user->profile_photo_url,
        'username' => $post->user->username,
        // 'likes' => $post->likes->count() . " " . Str::plural('like', $post->likes->count()),
        'likes' => $post->likes->count(),
        // 'commentsCount' => $post->comments->count() . " " . Str::plural('comment', $post->comments->count()),
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
      ]);
    }

    return Inertia::render('User/Index', [
      'posts' => $posts->items(),
      'joined_chat_groups' => auth()->user()->joinedChatGroups()->get()->map(function ($chat_group) {
        return [
          'id' => $chat_group->id,
          'name' => $chat_group->name,
          'description' => $chat_group->description,
          'created_at' => $chat_group->created_at->diffforhumans(),
          // 'creator_name' => $chat_group->creator->firstname . ' ' . $chat_group->creator->lastname,
          // 'creator_username' => $chat_group->creator->username,
        ];
      }),
    ]);
  }

  public function userProfile(User $user, Request $request) {
    // dd($user->postLikesGot);
    // dd($user->postLikesGot->count());
    // dd($user->likes()->where('users.id', '=', $user->id)->get());
    $user2 = auth()->user();

    if ($user2->id === $user->id) {
      return to_route('user.profile.me');
    }

    $friendshipRequest = Friendship::
      where(function ($query) use ($user, $user2) {
      $query->where('user1_id', $user->id)
        ->where('user2_id', $user2->id);
    })
      ->orWhere(function ($query) use ($user, $user2) {
        $query->where('user1_id', $user2->id)
          ->where('user2_id', $user->id);
      })
      ->first();
    // dd($friendshipRequest);
    $posts = $user->posts()->with('user')->latest()->paginate(15)->through(function ($post) {
      return [
        'id' => $post->id,
        'title' => $post->title,
        'content' => $post->content,
        'created_at' => $post->created_at->diffForHumans(),
        'author' => $post->user->firstname,
        'authorPhoto' => $post->user->profile_photo_url,
        'username' => $post->user->username,
        // 'likes' => $post->likes->count() . " " . Str::plural('like', $post->likes->count()),
        'likes' => $post->likes->count(),
        // 'commentsCount' => $post->comments->count() . " " . Str::plural('comment', $post->comments->count()),
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
      ]);
    };

    // dd($friendshipRequest->id ?? 0);
    return Inertia::render('User/Profile', [
      'posts' => $posts->items(),
      'author' => $user->firstname,
      'authorId' => $user->id,
      'authorUsername' => $user->username,
      'postLikesGot' => $user->postLikesGot->count(),
      'friendshipRequestId' => $friendshipRequest->id ?? 0,
      'friendshipRequestSenderId' => $friendshipRequest->user1_id ?? 0,
      'friendshipStatus' => $friendshipRequest->status->name ?? 'default',
    ]);
  }

  public function view(Request $request, Post $post) {
    // $isNewDesignActive = false;
    // if (Feature::active('new-design')) {
    //   $isNewDesignActive = true;
    // }
    $comments = $post->comments()->with('user')->latest()->paginate(15)->through(function ($comment) {
      return [
        'id' => $comment->id,
        'content' => $comment->content,
        'likes' => $comment->likes()->count(),
        'repliesCount' => $comment->replies->count(),
        'author' => $comment->user->firstname,
        'authorPhoto' => $comment->user->profile_photo_url,
        'authorUsername' => $comment->user->username,
        'canLikeComment' => !$comment->likedBy(auth()->user()),
        'canUpdateComment' => auth()->user()->can('update', Comment::find($comment->id)),
      ];
    });

    if ($request->wantsJson()) {
      return response()->json([
        'data' => $comments->items(),
        'links' => [
          'next' => $comments->nextPageUrl(),
        ],
      ]);
    }
    return Inertia::render('User/Post', [
      "post" => [
        'id' => $post->id,
        'title' => $post->title,
        'content' => $post->content,
        'created_at' => $post->created_at->diffForHumans(),
        'author' => $post->user->firstname,
        'authorPhoto' => $post->user->profile_photo_url,
        'username' => $post->user->username,
        // 'likes' => $post->likes->count() . " " . Str::plural('like', $post->likes->count()),
        'likes' => $post->likes->count(),
        // 'commentsCount' => $post->comments->count() . " " . Str::plural('comment', $post->comments->count()),
        'commentsCount' => $post->comments->count(),
        'comments' => $comments,
        'canLikePost' => !$post->likedBy($request->user()),
        'canUpdatePost' => auth()->user()->can('update', $post),
        // 'isNewDesignActive' => $isNewDesignActive,
      ],
    ]);
  }
}