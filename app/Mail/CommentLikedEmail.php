<?php

namespace App\Mail;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CommentLikedEmail extends Mailable {
  use Queueable, SerializesModels;

  public $liker;
  public $comment;
  /**
   * Create a new message instance.
   */
  public function __construct(User $liker, Comment $comment) {
    $this->liker = $liker;
    $this->comment = $comment;
  }

  /**
   * Get the message envelope.
   */
  public function envelope(): Envelope {
    return new Envelope(
      subject:'Someone Liked Your Comment',
    );
  }

  /**
   * Get the message content definition.
   */
  public function content(): Content {
    return new Content(
      markdown:'emails.comments.comment_liked',
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
