<?php

namespace App\Models;

use App\Models\ChatGroup;
use App\Models\Comment;
use App\Models\Like;
use App\Models\Post;
use App\Models\PrivateMessage;
use App\Models\PublicMessage;
use App\Models\Reply;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail {
  use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'firstname',
    'lastname',
    'username',
    'type',
    'email_verified_at',
    'gender',
    'email',
    'password',
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array<int, string>
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array<string, string>
   */
  protected $casts = [
    'email_verified_at' => 'datetime',
  ];

  public static function boot() {
    parent::boot();

    static::deleting(function ($user) {
      $user->deleted_by = auth()->id();
      $user->save();
      $user->posts()->update(['deleted_by' => auth()->id()]);
      $user->posts()->delete();
      $user->comments()->update(['deleted_by' => auth()->id()]);
      $user->comments()->delete();
      $user->replies()->update(['deleted_by' => auth()->id()]);
      $user->replies()->delete();
      $user->likes()->update(['deleted_by' => auth()->id()]);
      $user->likes()->delete();
      $user->publicMessages()->update(['deleted_by' => auth()->id()]);
      $user->publicMessages()->delete();
      $user->privateMessages()->update(['deleted_by' => auth()->id()]);
      $user->privateMessages()->delete();
    });
  }

  public function posts() {
    return $this->hasMany(Post::class);
  }

  // all comments he did
  public function comments() {
    return $this->hasMany(Comment::class);
  }

  // all comments on their posts
  public function postsComments() {
    return $this->hasManyThrough(Comment::class, Post::class);
  }

  public function replies() {
    return $this->hasMany(Reply::class);
  }

  // Likes I Did

  public function likes() {
    return $this->hasMany(Like::class);
  }

  // Likes I Got To My Posts      [likeable_id => posts.id]
  public function postLikesGot() {
    return $this->hasManyThrough(Like::class, Post::class, 'user_id', 'likeable_id', 'id', 'id')->where('likes.likeable_type', '=', "App\Models\Post");
  }

  // Likes I Got To My Comments   [likeable_id => comments.id]
  public function commentLikesGot() {
    return $this->hasManyThrough(Like::class, Post::class, 'user_id', 'likeable_id', 'id', 'id')->where('likes.likeable_type', '=', "App\Models\Comment");
  }

  // All Likes Got (Posts' Likes, Comments' Likes)
  public function likesGot() {
    return $this->hasManyThrough(Like::class, Post::class, 'user_id', 'likeable_id', 'id', 'id');
  }

  public function publicMessages() {
    return $this->hasMany(PublicMessage::class);
  }

  public function privateMessages() {
    return $this->hasMany(PrivateMessage::class);
  }

  public function receivedMessages() {
    return $this->hasMany(PrivateMessage::class, 'recipient_id');
  }

  public function createdChatGroups() {
    return $this->hasMany(ChatGroup::class, 'creator_id');
  }

  public function projects() {
    return $this->hasMany(Project::class, 'creator_id');
  }

  public function joinedChatGroups() {
    return $this->belongsToMany(ChatGroup::class);
  }

  public function tasks()
  {
      return $this->belongsToMany(Task::class);
  }

  protected function firstname(): Attribute {
    return Attribute::make(
      get:fn($value) => ucfirst($value),
    );
  }

  protected function lastname(): Attribute {
    return Attribute::make(
      get:fn($value) => ucfirst($value),
    );
  }

  protected function username(): Attribute {
    return Attribute::make(
      get:fn($value) => strtolower($value),
    );
  }
}
