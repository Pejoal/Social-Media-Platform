<?php

namespace App\Policies;

use App\Models\User;
use App\Models\ChatGroupMessage;

class ChatGroupMessagePolicy {
  /**
   * Create a new policy instance.
   */

  public function update(User $user, ChatGroupMessage $chatGroupMessage): bool {
    // return $user->id === $chatGroupMessage->user_id || $user->type === 'super admin';
    return $user->id === $chatGroupMessage->user_id;
  }

}
