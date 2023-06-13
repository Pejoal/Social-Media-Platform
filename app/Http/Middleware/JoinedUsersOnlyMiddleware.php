<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class JoinedUsersOnlyMiddleware {
  /**
   * Handle an incoming request.
   *
   * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
   */
  public function handle(Request $request, Closure $next): Response {
    // dd($request->route('chatGroup'));
    // $chatGroupId = is_string($request->route('chatGroup')) ? $request->route('chatGroup') : $request->route('chatGroup')->id; // Get the chat group ID from the route parameter
    $chatGroupId = $request->route('chatGroup')->id;

    // Check if the authenticated user is a member of the chat group
    if (!auth()->user()->joinedChatGroups()->where('chat_group_id', $chatGroupId)->exists()) {
      abort(403, "You don't have permission to access this chat group.");
    }

    return $next($request);
  }
}
