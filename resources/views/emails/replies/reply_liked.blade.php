<x-mail::message>
  # Your Reply Was Liked

  {{ $liker->firstname }} liked one of your Replies.

  <x-mail::button :url="route('comments.replies', $comment)">
    View Reply
  </x-mail::button>

  Thanks,<br>
  {{ config('app.name') }}
</x-mail::message>
