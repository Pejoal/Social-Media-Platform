<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Post;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CanUpdatePost {
  /**
   * Handle an incoming request.
   *
   * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
   */
  public function handle(Request $request, Closure $next, $post): Response {
    // dd(Post::find($post)); // post data
    // dd($request->user());
    if ($request->user()->cannot('update', Post::find($post))) {
      abort(403); // Forbidden
    }
    return $next($request);
  }
}
