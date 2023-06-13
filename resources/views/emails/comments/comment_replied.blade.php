<x-mail::message>
  # Your Comment Was Replied On

  {{ $replier->firstname }} replied on one of your comments.

  <x-mail::button :url="route('comments.replies', $comment)">
    View Comment
  </x-mail::button>

  Thanks,<br>
  {{ config('app.name') }}
</x-mail::message>
