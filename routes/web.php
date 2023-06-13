<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\ChatGroupController;
use App\Http\Controllers\ChatGroupMessageController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DynamicComponentController;
use App\Http\Controllers\FriendshipController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LikeCommentController;
use App\Http\Controllers\LikePostController;
use App\Http\Controllers\LikeReplyController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PrivateChatController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ReplyController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserCommentController;
use App\Http\Controllers\UserPostController;
use App\Http\Controllers\UserReplyController;
use App\Models\Post;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */
Route::group([], function () {
  $locales = collect(LaravelLocalization::getSupportedLocales())->map(function ($properties, $localeCode) {
    return [
      'code' => $localeCode,
      'native' => $properties['native'],
      'url' => LaravelLocalization::getLocalizedURL($localeCode, null, [], true),
      'emoji' => $properties['emoji'],
    ];
  });
  Inertia::share([
    'locales' => $locales,
    'active_locale_code' => LaravelLocalization::getCurrentLocale(),
    'appName' => config('app.name'),
    'words' => Lang::get('words'),
  ]);
  Route::get('/', function () {
    // dd(auth()->check()); // return bool
    // return 'This is your multi-tenant application. The id of the current tenant is ' . tenant('id');
    // return Inertia::render('Welcome', [
    //   'canLogin' => Route::has('login'),
    //   'canRegister' => Route::has('register'),
    //   'laravelVersion' => Application::VERSION,
    //   'phpVersion' => PHP_VERSION,
    // ]);
    return redirect(route('home'));
  });

  require __DIR__ . '/auth.php';

  Route::middleware(['auth', 'verified'])->group(function () {

    // Route::group(['prefix' => 'auth'], function () {
    //   Route::get('/{provider}/redirect', [ProviderController::class, 'redirect']);
    //   Route::get('/{provider}/callback', [ProviderController::class, 'callback']);
    // });

    Route::get('/home', [HomeController::class, 'index'])->name('home');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/profile/photo/update', [ProfileController::class, 'updateProfilePhoto'])->name('profile.photo.update');

    Route::post('/dashboard/posts', [PostController::class, 'store'])->name('posts.store');
    Route::get('/user/{user:username}/profile', [PostController::class, 'userProfile'])->name('user.profile');
    Route::get('/user/profile', [PostController::class, 'myProfile'])->name('user.profile.me');
    Route::get('/user/posts/{post:id}', [PostController::class, 'view'])->name('user.post')->where(['post' => '[0-9]+']);

    Route::delete('/user/posts/{post:id}', [UserPostController::class, 'destroy'])->name('user.posts.delete');
    Route::get('/user/posts/{post:id}/edit', [UserPostController::class, 'edit'])->name('user.posts.edit');
    Route::patch('/user/posts/{post:id}/edit', [UserPostController::class, 'update'])->name('user.posts.update');

    Route::get('/posts/{post:id}/likes', [LikePostController::class, 'index'])->name('posts.likes');
    Route::post('/posts/{post:id}/likes', [LikePostController::class, 'store'])->name('posts.likes.store');
    Route::delete('/posts/{post:id}/likes', [LikePostController::class, 'destroy'])->name('posts.likes.delete');

    Route::get('/comments/{comment:id}/likes', [LikeCommentController::class, 'index'])->name('comments.likes');
    Route::post('/comments/{comment:id}/likes', [LikeCommentController::class, 'store'])->name('comments.likes.store');
    Route::delete('/comments/{comment:id}/likes', [LikeCommentController::class, 'destroy'])->name('comments.likes.delete');

    Route::post('/posts/{post:id}/comment', [CommentController::class, 'store'])->name('posts.comment');

    Route::get('/comments/{comment:id}', [UserCommentController::class, 'edit'])->name('comments.edit');
    Route::patch('/comments/{comment:id}', [UserCommentController::class, 'update'])->name('comments.update');
    Route::delete('/comments/{comment:id}', [UserCommentController::class, 'destroy'])->name('comments.delete');

    Route::get('/comments/{comment:id}/replies', [ReplyController::class, 'index'])->name('comments.replies');
    Route::post('/comments/{comment:id}/replies', [ReplyController::class, 'store'])->name('comments.replies.store');

    Route::get('/comments/{comment:id}/{reply:id}/edit', [UserReplyController::class, 'edit'])->name('comments.replies.edit');
    Route::patch('/comments/{comment:id}/{reply:id}/update', [UserReplyController::class, 'update'])->name('comments.replies.update');
    Route::delete('/comments/{comment:id}/{reply:id}/delete', [UserReplyController::class, 'destroy'])->name('comments.replies.delete');

    Route::get('/comments/{comment:id}/{reply:id}/likes', [LikeReplyController::class, 'index'])->name('comments.replies.likes');
    Route::post('/comments/{comment:id}/{reply:id}/likes', [LikeReplyController::class, 'store'])->name('comments.replies.likes.store');
    Route::delete('/comments/{comment:id}/{reply:id}/likes', [LikeReplyController::class, 'destroy'])->name('comments.replies.likes.delete');

    // Route::get('/mostLikedPosts', function () {
    //   $mostLikedPosts = Post::withCount('likes')->orderBy('likes_count', 'desc')->take(5)->get();
    //   dd($mostLikedPosts);
    // });
    Route::group(['prefix' => '/public-chat', 'as' => 'public.chat.'], function () {
      Route::get('/index', [ChatController::class, 'index'])->name('index');
      Route::get('/messages', [ChatController::class, 'fetchMessages'])->name('fetch');
      Route::post('/messages', [ChatController::class, 'sendMessage'])->name('create');
    });

    Route::get('/rooms', [RoomController::class, 'index'])->name('rooms.index');
    Route::get('/rooms/{room:slug}', [RoomController::class, 'room'])->name('rooms.room');
    Route::post('/room_message', [RoomController::class, 'broadcastMessage']);

    Route::get('/getFriends', [FriendshipController::class, 'getFriends']);
    Route::get('/getFriendShipRequest', [FriendshipController::class, 'getFriendShipRequest']);
    Route::get('/getFriendShipRequests', [FriendshipController::class, 'getFriendShipRequests']);
    Route::post('/sendFriendshipRequest', [FriendshipController::class, 'sendFriendshipRequest']);
    Route::delete('/cancelFriendshipRequest', [FriendshipController::class, 'cancelFriendshipRequest']);
    Route::post('/acceptFriendshipRequest', [FriendshipController::class, 'acceptFriendshipRequest']);
    Route::delete('/rejectFriendshipRequest', [FriendshipController::class, 'rejectFriendshipRequest']);
    Route::delete('/unfriend', [FriendshipController::class, 'unfriend']);

    Route::get('/{user:username}/privat_messages/index', [PrivateChatController::class, 'index'])->name('private.messages.index');
    Route::get('/{user:username}/privat_messages/get_chat', [PrivateChatController::class, 'getChat'])->name('private.messages.chat');
    Route::post('/{user:username}/privat_messages/store', [PrivateChatController::class, 'store'])->name('private.messages.store');

    Route::get('/dynamic', [DynamicComponentController::class, 'index'])->name('dynamic.index');

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard.index');
    Route::get('/dashboard/users/data', [DashboardController::class, 'usersData'])->name('dashboard.users.data');

    Route::delete('/dashboard/users/{user:id}/delete', [DashboardController::class, 'deleteUser'])->name('dashboard.users.delete');
    Route::get('/dashboard/users/{user:id}', [DashboardController::class, 'editUser'])->name('dashboard.users.edit');
    Route::patch('/dashboard/users/{user:id}/update', [DashboardController::class, 'updateUser'])->name('dashboard.users.update');
    Route::get('/dashboard/posts/data', [DashboardController::class, 'postsData'])->name('dashboard.posts.data');
    Route::delete('/dashboard/posts/{post:id}/delete', [DashboardController::class, 'deletePost'])->name('dashboard.posts.delete');
    Route::get('/dashboard/comments/data', [DashboardController::class, 'commentsData'])->name('dashboard.comments.data');
    Route::delete('/dashboard/comments/{comment:id}/delete', [DashboardController::class, 'deleteComment'])->name('dashboard.comments.delete');
    Route::get('/dashboard/replies/data', [DashboardController::class, 'repliesData'])->name('dashboard.replies.data');
    Route::delete('/dashboard/replies/{reply:id}/delete', [DashboardController::class, 'deleteReply'])->name('dashboard.replies.delete');
    Route::get('/dashboard/public-messages/data', [DashboardController::class, 'publicMessagesData'])->name('dashboard.public.messages.data');
    Route::delete('/dashboard/public-messages/{message:id}/delete', [DashboardController::class, 'deletePublicMessage'])->name('dashboard.public.messages.delete');

    Route::get('/dashboard/users/excel', [DashboardController::class, 'usersExcelExport'])->name('dashboard.users.excel');
    Route::get('/dashboard/posts/excelExport', [DashboardController::class, 'postsExcelExport'])->name('dashboard.posts.excel.export');
    Route::post('/dashboard/posts/excelImport', [DashboardController::class, 'postsExcelImport'])->name('dashboard.posts.excel.import');

    Route::get('/chat-groups', [ChatGroupController::class, 'index'])->name('chat.groups.index');
    Route::post('/chat-groups/store', [ChatGroupController::class, 'store'])->name('chat.groups.store');
    Route::group(['middleware' => 'joined-users-only'], function () {
      Route::get('/chat-groups/{chatGroup:id}', [ChatGroupController::class, 'view'])->name('chat.groups.view');
      Route::get('/chat-groups/{chatGroup:id}/messages/index', [ChatGroupMessageController::class, 'index'])->name('chat.groups.messages.index');
      Route::post('/chat-groups/{chatGroup:id}/message/store', [ChatGroupMessageController::class, 'store'])->name('chat.groups.message.store');

      Route::get('/chat-groups/{chatGroup:id}/messages/{chatGroupMessage:id}/edit', [UserChatGroupMessageController::class, 'edit'])->name('chat.groups.message.edit');
      Route::patch('/chat-groups/{chatGroup:id}/messages/{chatGroupMessage:id}/update', [UserChatGroupMessageController::class, 'update'])->name('chat.groups.message.update');
      Route::delete('/chat-groups/{chatGroup:id}/messages/{chatGroupMessage:id}/delete', [UserChatGroupMessageController::class, 'destroy'])->name('chat.groups.message.delete');
    });
    Route::group(['middleware' => 'chat-group-admin-only'], function () {
      Route::post('/chat-groups/{chatGroup:id}/user/add', [ChatGroupController::class, 'addUser'])->name('chat.groups.user.add');
      Route::delete('/chat-groups/{chatGroup:id}/user/remove', [ChatGroupController::class, 'removeUser'])->name('chat.groups.user.remove');
    });

    Route::get('/project', [ProjectController::class, 'index'])->name('project.index');
    Route::post('/project/store', [ProjectController::class, 'store'])->name('project.store');
    Route::get('/project/{project:slug}', [ProjectController::class, 'show'])->name('project.show');

    Route::post('/project/{project:slug}/status/store', [StatusController::class, 'store'])->name('status.store');
    Route::put('/project/status/sync', [StatusController::class, 'sync'])->name('status.sync');
    
    Route::post('/project/{status:id}/task/store', [TaskController::class, 'store'])->name('task.store');
    Route::put('/project/task/sync', [TaskController::class, 'sync'])->name('task.sync');

  });
  // Route::get('/README.md', function () {
  //   return Illuminate\Mail\Markdown::parse(file_get_contents(base_path() . '/README.md'));
  // });
});