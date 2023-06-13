<x-mail::message>
  # Your Comment Was Liked

  {{ $liker->firstname }} liked one of your comments.

  <x-mail::button :url="route('user.post', $comment->post) . '#' . $comment->id">
    View Comment
  </x-mail::button>

  Thanks,<br>
  {{ config('app.name') }}
</x-mail::message>
