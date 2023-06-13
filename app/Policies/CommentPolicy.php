<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Comment;

class CommentPolicy {
  /**
   * Determine whether the user can Delete or Update the model.
   */
  public function update(User $user, Comment $comment): bool {
    return $user->id === $comment->user_id || $user->type === 'super admin';
  }

}
