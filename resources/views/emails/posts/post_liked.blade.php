<x-mail::message>
  # Your Post Was Liked

  {{ $liker->firstname }} liked one of your posts.

  <x-mail::button :url="route('user.post', $post)">
    View Post
  </x-mail::button>

  Thanks,<br>
  {{ config('app.name') }}
</x-mail::message>
