<?php

namespace App\Http\Controllers;

use App\Http\Requests\StatusRequest;
use App\Models\Project;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\Status;

class StatusController extends Controller {

  public function store(StatusRequest $request, Project $project) {
    $project->statuses()->create([
      'name' => $request->name,
      'order' => 0,
      'slug' => Str::slug($request->name, '-'),
      'creator_id' => auth()->user()->id,
    ]);
  }

  public function sync(Request $request) {
    $request->validate([
      'statuses' => ['required', 'array'],
    ]);

    foreach ($request->statuses as $i => $status) {
        $order = $i + 1;
        if ($status['order'] !== $order) {
          Status::find($status['id'])->update(['order' => $order]);
      }
    }

  }

}
