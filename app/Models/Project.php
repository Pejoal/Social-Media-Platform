<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model {
  use HasFactory;

  protected $fillable = ['name', 'code', 'slug'];

  public function statuses() {
    return $this->hasMany(Status::class)->with(['tasks'])->orderBy('order', 'ASC');
  }

  public function tasks() {
    return $this->hasManyThrough(Task::class, Status::class);
  }
}
