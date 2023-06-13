<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrivateMessage extends Model {
  use HasFactory;

  protected $fillable = ['content', 'recipient_id'];

  public function user() {
    return $this->belongsTo(User::class);
  }

  public function recipient() {
    return $this->belongsTo(User::class, 'recipient_id');
  }
}
