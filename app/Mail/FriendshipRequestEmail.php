<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class FriendshipRequestEmail extends Mailable {
  use Queueable, SerializesModels;

  /**
   * Create a new message instance.
   */
  public $user;
  public function __construct(User $user) {
    $this->user = $user;
  }

  /**
   * Get the message envelope.
   */
  public function envelope(): Envelope {
    return new Envelope(
      subject:'Someone Sent You a Friendship Request',
    );
  }

  /**
   * Get the message content definition.
   */
  public function content(): Content {
    return new Content(
      markdown:'emails.friendships.friendship_request',
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
