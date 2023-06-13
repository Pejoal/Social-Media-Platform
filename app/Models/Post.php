<?php

namespace App\Models;

use App\Models\Comment;
use App\Models\Like;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model {
  use HasFactory, SoftDeletes;
  protected $fillable = ['title', 'content','created_at','user_id'];

  public static function boot() {
    parent::boot();

    static::deleting(function ($post) {
      $post->deleted_by = auth()->id();
      $post->save();
      $post->comments()->update(['deleted_by' => auth()->id()]);
      $post->comments()->delete();
      $post->likes()->update(['deleted_by' => auth()->id()]);
      $post->likes()->delete();
    });
  }
  public function user() {
    return $this->belongsTo(User::class);
  }

  public function likedBy(User $user) {
    return $this->likes->contains('user_id', $user->id);
  }

  public function trashLikedBy(User $user) {
    $like = $this->likes()->onlyTrashed()->where('user_id', $user->id)->first();

    if ($like) {
      $like->restore();
      return true;
    } else {
      return false;
    }
  }

  public function comments() {
    return $this->hasMany(Comment::class);
  }

  public function postLikes() {
    return $this->hasManyThrough(Like::class, User::class);
  }

  // Get all of the post's likes.

  public function likes() {
    return $this->morphMany(Like::class, 'likeable');
  }
}
