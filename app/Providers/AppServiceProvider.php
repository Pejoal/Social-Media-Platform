<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\ServiceProvider;
use Laravel\Pennant\Feature;

class AppServiceProvider extends ServiceProvider {
  /**
   * Register any application services.
   *
   * @return void
   */
  public function register() {
    //
  }

  /**
   * Bootstrap any application services.
   *
   * @return void
   */
  public function boot() {
    if ($this->app->environment('production')) {
      \URL::forceScheme('https');
    }

    // Feature::define('new-design', function (User $user) {
    //   return $user->id == 1;
    // });
  }
}
