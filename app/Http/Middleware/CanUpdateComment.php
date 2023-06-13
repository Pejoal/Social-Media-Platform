<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Comment;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CanUpdateComment
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $comment): Response {
      // dd(comment::find($comment)); // comment data
      // dd($request->user());
      if (auth()->user()->cannot('update', Comment::find($comment))) {
        abort(403); // Forbidden
      }
      return $next($request);
    }
}
