<?php

namespace App\Mail;

use App\Models\Post;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PostLikedEmail extends Mailable {
  use Queueable, SerializesModels;
  public $liker;
  public $post;
  /**
   * Create a new message instance.
   */
  public function __construct(User $liker, Post $post) {
    $this->liker = $liker;
    $this->post = $post;
  }

  /**
   * Get the message envelope.
   */
  public function envelope(): Envelope {
    return new Envelope(
      subject:'Someone Liked Your Post',
    );
  }

  /**
   * Get the message content definition.
   */
  public function content(): Content {
    return new Content(
      markdown:'emails.posts.post_liked',
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
