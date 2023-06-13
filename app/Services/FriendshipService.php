<?php

namespace App\Services;

use App\Models\Friendship;
use App\Models\User;

class FriendshipService {
  public static function isFriend(int | string $friendship_id = 0, int $user2_id = 0) {
    if ($friendship_id !== 0) {
      $friendship = Friendship::find($friendship_id);
      if ($friendship != null && $friendship->status->name === 'accepted' && ($friendship->user1_id == auth()->user()->id || $friendship->user2_id == auth()->user()->id)) {
        return true;
      }
    } else {
      return Friendship::
        where(function ($query) use ($user2_id) {
        $query->where('user1_id', $user2_id)
          ->where('user2_id', auth()->user()->id)
          ->orWhere('user1_id', auth()->user()->id)
          ->where('user2_id', $user2_id);
      })
        ->whereHas('status', function ($query) {
          $query->where('name', 'accepted');
        })
        ->exists();
    }

    return false;
  }

  public static function friends(User $user) {
    return $user->hasMany(Friendship::class, 'user1_id')
      ->whereHas('status', function ($query) {
        $query->where('name', 'accepted');
      })
      ->orWhere(function ($query) use ($user) {
        $query->where('user2_id', $user->id)
          ->whereHas('status', function ($query) {
            $query->where('name', 'accepted');
          });
      })
      ->get()->map(function ($friendship) {
      // dd(auth()->user()->id);
      return auth()->user()->id == User::find($friendship->user1_id)->id ? User::find($friendship->user2_id) : User::find($friendship->user1_id);
    });
  }

}