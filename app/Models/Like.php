<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Like extends Model {
  use HasFactory, SoftDeletes;
  protected $fillable = ['user_id'];

  public static function boot() {
    parent::boot();

    static::deleting(function ($user) {
      $user->deleted_by = auth()->id();
      $user->save();
    });
  }

  public function users() {
    return $this->belongsTo(User::class);
  }

  // Get the parent likeable model (post, comment or reply).

  public function likeable()
  {
      return $this->morphTo();
  }
}
