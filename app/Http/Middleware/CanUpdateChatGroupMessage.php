<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\ChatGroupMessage;
use Symfony\Component\HttpFoundation\Response;

class CanUpdateChatGroupMessage {
  /**
   * Handle an incoming request.
   *
   * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
   */
  public function handle(Request $request, Closure $next, $chatGroupMessage): Response {
    // dd(ChatGroupMessage::find($chatGroupMessage));
    if (auth()->user()->cannot('update', ChatGroupMessage::find($chatGroupMessage))) {
      abort(403); // Forbidden
    }
    return $next($request);
  }
}
