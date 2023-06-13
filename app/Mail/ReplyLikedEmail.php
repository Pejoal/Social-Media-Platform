<?php

namespace App\Mail;

use App\Models\User;
use App\Models\Comment;
use App\Models\Reply;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Envelope;

class ReplyLikedEmail extends Mailable {
  use Queueable, SerializesModels;

  public $liker;
  public $reply;
  public $comment;
  /**
   * Create a new message instance.
   */
  public function __construct(User $liker, Comment $comment, Reply $reply) {
    $this->liker = $liker;
    $this->reply = $reply;
    $this->comment = $comment;
  }

  /**
   * Get the message envelope.
   */
  public function envelope(): Envelope {
    return new Envelope(
      subject:'Someone Liked Your Reply',
    );
  }

  /**
   * Get the message content definition.
   */
  public function content(): Content {
    return new Content(
      markdown:'emails.replies.reply_liked',
    );
  }

  /**
   * Get the attachments for the message.
   *
   * @return array<int, \Illuminate\Mail\Mailables\Attachment>
   */
  public function attachments(): array
  {
    return [];
  }
}
