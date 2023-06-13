<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;

class ProviderController extends Controller {
  public function redirect($provider) {
    return Socialite::driver($provider)->redirect();
  }

  public function callback($provider) {
    $user = Socialite::driver($provider)->user();
    // $user->token
    dd($user);
  }
}
