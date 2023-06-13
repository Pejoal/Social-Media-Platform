<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model {
  use HasFactory;

  protected $fillable = ['name', 'order', 'slug', 'creator_id'];

  public function tasks() {
    return $this->hasMany(Task::class)->orderBy('order');
  }

  public function project() {
    return $this->belongsTo(Project::class);
  }

}
