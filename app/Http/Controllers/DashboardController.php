<?php

namespace App\Http\Controllers;

use App\Exports\PostsExport;
use App\Exports\UsersExport;
use App\Imports\PostsImport;
use App\Models\ChatGroupMessage;
use App\Models\Comment;
use App\Models\Like;
use App\Models\Post;
use App\Models\PublicMessage;
use App\Models\Reply;
use App\Models\User;
use DataTables;
use Illuminate\Support\Facades\Lang;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class DashboardController extends Controller {
  public function __construct() {
    $this->middleware('control.users');
  }

  public function index() {
    // dd(Lang::get('words')['posts']);
    return Inertia::render('Dashboard/Index', [
      'data' => [
        Lang::get('words')['users'] => User::get()->count(),
        Lang::get('words')['posts'] => Post::get()->count(),
        Lang::get('words')['comments'] => Comment::get()->count(),
        Lang::get('words')['replies'] => Reply::get()->count(),
        Lang::get('words')['publicMessages'] => PublicMessage::get()->count(),
        Lang::get('words')['chatGroupMessages'] => ChatGroupMessage::get()->count(),
        Lang::get('words')['likes'] => Like::get()->count(),
      ],
    ]);
  }

  function usersData() {
    $model = User::query();

    return DataTables::eloquent($model)
      ->addColumn('name', '{{ $firstname . " " . $lastname }}')
      ->addColumn('action', '
        <section class="flex items-center justify-center gap-4">
          <button data-id="{{$id}}" class="delete-button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Delete
          </button>
          <button data-id="{{$id}}" class="edit-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Edit
          </button>
        </section>
      ')
      ->removeColumn(['created_at', 'updated_at', 'deleted_at', 'firstname', 'lastname', 'email_verified_at'])
      ->rawColumns(['action'])
      ->toJson();
  }

  function usersExcelExport() {
    return Excel::download(new UsersExport, 'Users.xlsx');
    // return Excel::download(new UsersExport, 'users.pdf', \Maatwebsite\Excel\Excel::DOMPDF);
  }

  function postsExcelExport() {
    return Excel::download(new PostsExport, 'Posts.xlsx');
    // return Excel::download(new UsersExport, 'users.pdf', \Maatwebsite\Excel\Excel::DOMPDF);
  }

  public function postsExcelImport() {
    // Excel::import(new PostsImport, 'posts.xlsx'); //  The file is expected to be located in your default filesystem disk (see config/filesystems.php).
    $file = request()->file('posts_excel');
    if ($file) {
      Excel::import(new PostsImport, request()->file('posts_excel'), 'public', \Maatwebsite\Excel\Excel::XLSX);
      // return ['status' => 'Importing Posts'];
    } else {
      return ['status' => 'No File Was Uploaded'];
    }
  }

  function editUser(User $user) {
    return Inertia::render('Users/Index');
  }

  function updateUser(User $user) {
  }

  function deleteUser(User $user) {
    $user->delete();
  }

  function postsData() {
    $model = Post::query();

    return DataTables::eloquent($model)
      ->addColumn('action', '
        <section class="flex items-center justify-center gap-4">
          <button data-id="{{$id}}" class="delete-button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Delete
          </button>
          <button data-id="{{$id}}" class="edit-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Edit
          </button>
        </section>
      ')
      ->editColumn('content', '
        {{ strlen($content) > 30 ? substr($content, 0, 30) . "....." : $content }}
      ')
      ->addColumn('author', '
        <p class="text-bold">{{$model->user->firstname . " " . $model->user->lastname}}</p>
      ')
      ->removeColumn(['created_at', 'updated_at'])
      ->rawColumns(['action', 'author'])
      ->toJson();
  }

  function deletePost(Post $post) {
    $post->delete();
  }

  function commentsData() {
    $model = Comment::query();

    return DataTables::eloquent($model)
      ->addColumn('action', '
        <section class="flex items-center justify-center gap-4">
          <button data-id="{{$id}}" class="delete-button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Delete
          </button>
          <button data-id="{{$id}}" class="edit-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Edit
          </button>
        </section>
      ')
      ->editColumn('content', '
        {{ strlen($content) > 30 ? substr($content, 0, 30) . "....." : $content }}
      ')
      ->addColumn('author', '
        <p class="text-bold">{{$model->user->firstname . " " . $model->user->lastname}}</p>
      ')
      ->removeColumn(['created_at', 'updated_at'])
      ->rawColumns(['action', 'author'])
      ->toJson();
  }

  function deleteComment(Comment $comment) {
    $comment->delete();
  }

  function repliesData() {
    $model = Reply::query();

    return DataTables::eloquent($model)
      ->addColumn('action', '
        <section class="flex items-center justify-center gap-4">
          <button data-id="{{$id}}" class="delete-button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Delete
          </button>
          <button data-id="{{$id}}" class="edit-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Edit
          </button>
        </section>
      ')
      ->editColumn('content', '
        {{ strlen($content) > 30 ? substr($content, 0, 30) . "....." : $content }}
      ')
      ->addColumn('author', '
        <p class="text-bold">{{$model->user->firstname . " " . $model->user->lastname}}</p>
      ')
      ->removeColumn(['created_at', 'updated_at'])
      ->rawColumns(['action', 'author'])
      ->toJson();
  }

  function deleteReply(Reply $reply) {
    $reply->delete();
  }

  function publicMessagesData() {
    $model = PublicMessage::query();

    return DataTables::eloquent($model)
      ->addColumn('action', '
        <section class="flex items-center justify-center gap-4">
          <button data-id="{{$id}}" class="delete-button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Delete
          </button>
          <button data-id="{{$id}}" class="edit-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Edit
          </button>
        </section>
      ')
      ->editColumn('content', '
        {{ strlen($content) > 30 ? substr($content, 0, 30) . "....." : $content }}
      ')
      ->addColumn('author', '
        <p class="text-bold">{{$model->user->firstname . " " . $model->user->lastname}}</p>
      ')
      ->removeColumn(['created_at', 'updated_at'])
      ->rawColumns(['action', 'author'])
      ->toJson();
  }

  function deletePublicMessage(PublicMessage $message) {
    $message->delete();
  }
}
