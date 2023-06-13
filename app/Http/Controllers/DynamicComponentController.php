<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DynamicComponentController extends Controller
{
  public function index() {
    return Inertia::render('Dynamic/Index');
  }
}
