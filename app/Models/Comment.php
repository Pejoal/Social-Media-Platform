<?php

namespace App\Models;

use App\Models\Like;
use App\Models\Post;
use App\Models\Reply;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model {
  use HasFactory, SoftDeletes;

  protected $fillable = ['content', 'post_id'];

  public static function boot() {
    parent::boot();

    static::deleting(function ($comment) {
      $comment->deleted_by = auth()->id();
      $comment->save();
      $comment->replies()->update(['deleted_by' => auth()->id()]);
      $comment->replies()->delete();
      $comment->likes()->update(['deleted_by' => auth()->id()]);
      $comment->likes()->delete();
    });
  }

  public function user() {
    return $this->belongsTo(User::class);
  }

  // Get all of the comment's likes.
  public function likes() {
    return $this->morphMany(Like::class, 'likeable');
  }

  public function likedBy(User $user) {
    return $this->likes->contains('user_id', $user->id);
  }

  public function likers() {
    return $this->likes();
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

  public function post() {
    return $this->belongsTo(Post::class);
  }

  public function replies() {
    return $this->hasMany(Reply::class);
  }
}
