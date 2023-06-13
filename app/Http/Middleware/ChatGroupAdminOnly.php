<?php

namespace App\Http\Middleware;

use App\Models\ChatGroup;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ChatGroupAdminOnly {
  /**
   * Handle an incoming request.
   *
   * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
   */
  public function handle(Request $request, Closure $next): Response {
    $chatGroupId = $request->route('chatGroup')->id; // Get the chat group ID from the route parameter

    // Check if the authenticated user is a member of the chat group
    // dd(ChatGroup::find($chatGroupId));
    if (ChatGroup::find($chatGroupId)->creator_id != auth()->id()) {
      abort(403, "You are not admin in the chat group.");
    }
    return $next($request);
  }
}
