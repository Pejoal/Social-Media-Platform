<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model {
  use HasFactory;

  protected $fillable = ['title','slug','creator_id','description','order','status_id'];

  public function users() {
    return $this->belongsToMany(User::class);
  }

  public function status() {
    return $this->belongsTo(Status::class);
  }

  public function project() {
    return $this->belongsTo(Project::class, 'project_id')->via('status');
  }

}
