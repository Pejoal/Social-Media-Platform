<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Pennant\Feature;

class ProfileController extends Controller {
  /**
   * Display the user's profile form.
   */
  public function edit(Request $request): Response {
    // $isNewDesignActive = false;
    // if (Feature::active('new-design')) {
    //   $isNewDesignActive = true;
    // }
    return Inertia::render('Profile/Edit', [
      'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
      'status' => session('status'),
      // 'isNewDesignActive' => $isNewDesignActive,
    ]);
  }

  /**
   * Update the user's profile information.
   */
  public function update(ProfileUpdateRequest $request): RedirectResponse {
    $request->user()->fill($request->validated());

    if ($request->user()->isDirty('email')) {
      $request->user()->email_verified_at = null;
    }

    $request->user()->save();

    return Redirect::route('profile.edit');
  }

  /**
   * Delete the user's account.
   */
  public function destroy(Request $request): RedirectResponse {
    $request->validate([
      'password' => ['required', 'current-password'],
    ]);

    $user = $request->user();

    Auth::logout();

    $user->delete();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return Redirect::to('/');
  }

  public function updateProfilePhoto(Request $request) {
    if ($request->hasFile('profile_photo')) {
      $request->validate([
        // 'profile_photo' => ['required', 'image', 'max:1024'], // Maximum file size of 1MB
        'profile_photo' => ['required', 'image', 'mimes:jpeg,png,jpg', 'max:6000'],
      ]);
      $path = $request->file('profile_photo')->store('public/profiles');
      auth()->user()->profile_photo_url = Storage::url($path);
      auth()->user()->save();

      // return response()->json(['path' => Storage::url($path)], 200);
    } else {
      return;
    }
  }
}
