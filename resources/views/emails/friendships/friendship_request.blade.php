<x-mail::message>
  # You Got a New Friendship Request

  {{ $user->firstname . ' ' . $user->lastname }} requested to be your friend.

  <x-mail::button :url="route('user.profile.me')">
    View Friendship Requests
  </x-mail::button>

  Thanks,<br>
  {{ config('app.name') }}
</x-mail::message>
