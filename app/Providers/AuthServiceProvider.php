<?php

namespace App\Providers;

use App\Policies\FriendshipRequestPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider {
  /**
   * The model to policy mappings for the application.
   *
   * @var array<class-string, class-string>
   */
  protected $policies = [
    // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    Post::class => PostPolicy::class,
    Comment::class => CommentPolicy::class,
    Reply::class => ReplyPolicy::class,
    // Friendship::class => FriendshipRequestPolicy::class,
  ];

  /**
   * Register any authentication / authorization services.
   *
   * @return void
   */
  public function boot() {
    $this->registerPolicies();
    //
  }
}
