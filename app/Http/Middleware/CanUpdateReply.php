<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Reply;

class CanUpdateReply {
  /**
   * Handle an incoming request.
   *
   * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
   */
  public function handle(Request $request, Closure $next, $reply): Response {
    if ($request->user()->cannot('update', Reply::find($reply))) {
      abort(403); // Forbidden
    }
    return $next($request);
  }
}
