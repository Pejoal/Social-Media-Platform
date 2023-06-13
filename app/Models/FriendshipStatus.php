<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Friendship;

class FriendshipStatus extends Model {
  use HasFactory;
  protected $fillable = ['name'];

  public function friendship() {
    return $this->belongsTo(Friendship::class);
  }
}
