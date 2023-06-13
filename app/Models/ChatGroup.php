<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatGroup extends Model {
  use HasFactory;

  protected $fillable = ['name', 'description'];

  public function creator() {
    return $this->belongsTo(User::class, 'creator_id');
  }

  public function members() {
    return $this->belongsToMany(User::class);
  }

  public function chatGroupMessages() {
    return $this->hasMany(ChatGroupMessage::class);
  }
}
