<?php

namespace App\Http\Controllers;

use App\Http\Requests\FriendshipRequest;
use App\Jobs\FriendshipRequestEmailJob;
use App\Models\Friendship;
use App\Models\User;
use App\Services\FriendshipService;
use Illuminate\Http\Request;

class FriendshipController extends Controller {

  // public function __construct(Request $request) {
  //   // dd((int) $request->user1_id); // 11
  //   $user1_id = (int) $request->user1_id;
  //   $this->middleware("can.send.friendship.request:$request->");
  // }

  function getFriends() {
    $friendships =
    FriendshipService::friends(auth()->user())
      ->map(function ($friend) {
        return [
          'friend_id' => $friend->id,
          'friend_username' => $friend->username,
          'friend_name' => $friend->firstname . ' ' . $friend->lastname,
          // 'updated_at' => $friendship->updated_at->diffForHumans(),
        ];
      });
    // dd($friendships);
    return $friendships;
  }

  function getFriendshipRequest(Request $request) {
    $friendshipRequest = Friendship::
      where('user1_id', '=', $request->user1_id)
      ->where('user2_id', '=', auth()->user()->id)
      ->with('status') // Eager load the 'status' relationship
      ->whereHas('status', function ($query) {
        $query->where('name', 'pending');
      })
      ->first();

    if ($friendshipRequest) {
      return [
        'id' => $friendshipRequest->id,
        'requester_id' => User::find($friendshipRequest->user1_id)->id,
        'requester_username' => User::find($friendshipRequest->user1_id)->username,
        'requester_name' => User::find($friendshipRequest->user1_id)->firstname . ' ' . User::find($friendshipRequest->user1_id)->lastname,
        'updated_at' => $friendshipRequest->updated_at->diffForHumans(),
      ];
    } else {
      return null;
    }
  }

  function getFriendShipRequests() {
    $friendshipRequests = Friendship::
      where('user2_id', '=', auth()->user()->id)
      ->with('status') // Eager load the 'status' relationship
      ->whereHas('status', function ($query) {
        $query->where('name', 'pending');
      })
      ->get()
      ->map(function ($friendshipRequest) {
        // dd(User::find($friendshipRequest->user1_id)->firstname);
        return [
          'id' => $friendshipRequest->id,
          'requester_id' => User::find($friendshipRequest->user1_id)->id,
          'requester_username' => User::find($friendshipRequest->user1_id)->username,
          'requester_name' => User::find($friendshipRequest->user1_id)->firstname . ' ' . User::find($friendshipRequest->user1_id)->lastname,
          'updated_at' => $friendshipRequest->updated_at->diffForHumans(),
        ];
      });
    // dd($friendshipRequests);
    return $friendshipRequests;
  }

  function sendFriendshipRequest(FriendshipRequest $request) {
    // dd($request->user1_id);
    // dd($request->friendshipRequestId);

    if (auth()->user()->id == $request->user2_id) {
      return false;
    }

    $friendshipRequest = Friendship::
      // where('status', 'pending')
      where(function ($query) use ($request) {
      $query->where('user1_id', auth()->user()->id)
        ->where('user2_id', $request->user2_id)
        ->orWhere('user1_id', $request->user2_id)
        ->where('user2_id', auth()->user()->id);
    })
      ->first();

    // dd($friendshipRequest);
    if (isset($friendship->status) && in_array($friendshipRequest->status->name, ['blocked', 'accepted'])) {
      return response(['msg' => 'Not Allowed'], 403);
    }

    if (Friendship::find($request->friendshipRequestId) == null) {
      // dd(Friendship::find($request->friendshipRequestId),$request->friendshipRequestId);
      $friendship = Friendship::create([
        'user1_id' => auth()->user()->id,
        'user2_id' => $request->user2_id,
      ]);
      $friendship->status()->create([
        'name' => 'pending',
      ]);
    } else {
      $friendship = Friendship::find($request->friendshipRequestId)
        ->update([
          'user1_id' => auth()->user()->id,
          'user2_id' => $request->user2_id,
        ]);
      Friendship::find($request->friendshipRequestId)->status()->create([
        'name' => 'pending',
      ]);
    };

    FriendshipRequestEmailJob::dispatch(User::find(auth()->user()->id), User::find($request->user2_id)); // Process Email Sending in The Queue

    return ['message' => 'Friendship Request Sent Successfully'];
  }

  function cancelFriendshipRequest(FriendshipRequest $request) {
    // dd($request->input('user2_id'));
    if (auth()->user()->id == $request->input('user2_id')) {
      return false;
    }

    $friendship = Friendship::
      where('user1_id', auth()->user()->id)
      ->where('user2_id', $request->input('user2_id'))->with(['status'])->first();
    // dd($friendship, $friendship->status);
    if (!$friendship || !$friendship->status || $friendship->status->name != 'pending') {
      abort(403, 'Not Allowed');
    }

    $friendship->statuses()->create([
      'name' => 'canceled',
    ]);

    return ['message' => 'Friendship Request Canceled Successfully'];
  }

  function unfriend(FriendshipRequest $request) {
    // dd($request->input('user2_id'));
    if (auth()->user()->id == $request->input('user2_id')) {
      return false;
    }

    $friendship = Friendship::
      where(function ($query) use ($request) {
      $query->where('user1_id', auth()->user()->id)
        ->where('user2_id', $request->input('user2_id'));
    })
      ->orWhere(function ($query) use ($request) {
        $query->where('user2_id', auth()->user()->id)
          ->where('user1_id', $request->input('user2_id'));
      })
      ->first();

    if (isset($friendship->status) && !in_array($friendship->status->name, ['accepted'])) {
      return response(['msg' => 'Not Allowed'], 403);
    }
    // dd($friendship);
    $friendship->statuses()->create([
      'name' => 'unfriended',
    ]);

    return ['message' => 'Friend Removed Successfully'];
  }

  function acceptFriendshipRequest(Request $request) {

    // dd($request->friendshipRequestId);
    if (auth()->user()->id == $request->user2_id) {
      return false;
    }

    $friendship = Friendship::
      find($request->friendshipRequestId);

    if (!$friendship->status->name == 'pending') {
      abort(403, 'Not Allowed');
    }

    if (!$friendship->user2_id == auth()->user()->id) {
      abort(403, 'Not Authorized');
    }

    $friendship->statuses()->create([
      'name' => 'accepted',
    ]);

    return ['message' => 'Friendship Request Accepted Successfully'];

  }

  function rejectFriendshipRequest(Request $request) {
    // dd($request);
    if (auth()->user()->id === $request->input('user2_id')) {
      return false;
    }

    $friendship = Friendship::
      find($request->friendshipRequestId);

    if (!$friendship->status->name == 'accepted') {
      abort(403, 'Not Allowed');
    }

    if (!$friendship->user2_id == auth()->user()->id) {
      abort(403, 'Not Authorized');
    }

    $friendship->statuses()->create([
      'name' => 'rejected',
    ]);

    return ['message' => 'Friendship Request Rejected Successfully'];
  }

}
