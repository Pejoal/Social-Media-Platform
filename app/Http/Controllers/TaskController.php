<?php

namespace App\Http\Controllers;

use App\Models\Status;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TaskController extends Controller {
  public function store(Request $request, Status $status) {
    $request->validate([
      'title' => ['required', 'string', 'max:56'],
      'description' => ['required', 'string'],
    ]);

    // $request->only('title', 'description', 'status_id')
    return $status->tasks()
      ->create([
        'title' => $request->title,
        'order' => 0,
        'description' => $request->description,
        'creator_id' => auth()->user()->id,
        'slug' => Str::slug($request->name, '-'),
      ]);
  }

  public function sync(Request $request) {
    $request->validate([
      'statuses' => ['required', 'array'],
    ]);

    foreach ($request->statuses as $status) {
      foreach ($status['tasks'] as $i => $task) {
        $order = $i + 1;
        if ($task['status_id'] !== $status['id'] || $task['order'] !== $order) {

          Task::find($task['id'])->update(['status_id' => $status['id'], 'order' => $order]);
          
        }
      }
    }

    // return $request->user()->statuses()->with('tasks')->get();
  }
}
