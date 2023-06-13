<?php

namespace App\Models;

use App\Models\RoomMessage;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Room extends Model {
  use HasFactory;

  public function messages() {
    return $this->hasMany(RoomMessage::class);
  }
}
