<?php

namespace App\Models;

use App\Models\Like;
use App\Models\User;
use App\Models\Comment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Reply extends Model {
  use HasFactory, SoftDeletes;

  protected $fillable = ['content', 'comment_id'];

  public static function boot() {
    parent::boot();

    static::deleting(function ($reply) {
      $reply->deleted_by = auth()->id();
      $reply->save();
      $reply->likes()->delete();
    });
  }
  public function user() {
    return $this->belongsTo(User::class);
  }
  public function comment() {
    return $this->belongsTo(Comment::class);
  }

  public function likes() {
    return $this->morphMany(Like::class, 'likeable');
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

}
