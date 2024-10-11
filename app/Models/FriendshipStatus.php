<?php

namespace App\Models;

use App\Models\Friendship;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FriendshipStatus extends Model {
  use HasFactory;
  protected $fillable = ['name', 'friendship_id'];

  public function friendship() {
    return $this->belongsTo(Friendship::class);
  }
}
