<x-mail::message>
  # Your Post Was Commented On

  {{ $commentor->firstname }} commented on one of your posts.

  <x-mail::button :url="route('user.post', $post) . '#' . $comment->id">
    View Post
  </x-mail::button>

  Thanks,<br>
  {{ config('app.name') }}
</x-mail::message>
