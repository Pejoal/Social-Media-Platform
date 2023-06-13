<?php

namespace App\Policies;

use App\Models\Post;
use App\Models\User;

class PostPolicy {

  /**
   * Determine whether the user can Delete or Update the model.
   */
  public function update(User $user, Post $post): bool {
    return $user->id === $post->user_id || $user->type === 'super admin';
  }

}
