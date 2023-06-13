<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Friendship extends Model {
  use HasFactory;
  protected $fillable = ['user1_id', 'user2_id'];

  public function status() {
    return $this->hasOne(FriendshipStatus::class)->latestOfMany();
  }

  public function statuses() {
    return $this->hasMany(FriendshipStatus::class);
  }
}
