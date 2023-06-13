<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
  public function index() {
    return Inertia::render('Project/Index', [
      'projects' => Project::all()->toArray(),
    ]);
  }

  public function show(Project $project) {
    $statuses = $project->statuses()->get();
    
    // dd($statuses);

    return Inertia::render('Project/Show', [
      "project" => [
        'name' => $project->name,
        'slug' => $project->slug,
      ],
      "statuses" => $statuses,
    ]);
  }

  public function store(ProjectRequest $request){

    auth()->user()->projects()->create([
      'name' => $request->name,
      'code' => $request->code,
      'slug' => Str::slug($request->name, '-'),
    ]);

  }

}
