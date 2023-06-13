<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class RegisteredUserController extends Controller {
  /**
   * Display the registration view.
   */
  public function create(): Response {
    return Inertia::render('Auth/Register');
  }

  /**
   * Handle an incoming registration request.
   *
   * @throws \Illuminate\Validation\ValidationException
   */
  public function store(Request $request): RedirectResponse {
    $request->validate([
      'firstname' => 'required|string|max:255',
      'lastname' => 'required|string|max:255',
      'username' => 'required|string|max:30|unique:' . User::class,
      'gender' => ['required', 'string', Rule::in(['male', 'female'])],
      'email' => 'required|email|max:255|unique:' . User::class,
      'password' => ['required', 'confirmed', Password::defaults()],
    ]);

    $user = User::create([
      'firstname' => $request->firstname,
      'lastname' => $request->lastname,
      'username' => $request->username,
      'gender' => $request->gender,
      // 'slug' => Str::slug($request->firstname . " " . $request->lastname, '-'),
      'email' => $request->email,
      'password' => Hash::make($request->password),
    ]);

    event(new Registered($user));

    Auth::login($user);

    if ($request->hasFile('profile_photo')) {
      $request->validate([
        'profile_photo' => ['image', 'mimes:jpeg,png,jpg', 'max:6000'],
      ]);
      $path = $request->file('profile_photo')->store('public/profiles');
      auth()->user()->profile_photo_url = Storage::url($path);
      auth()->user()->save();
    }

    return redirect(RouteServiceProvider::HOME);
  }
}
