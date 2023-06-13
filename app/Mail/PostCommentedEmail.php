<?php

namespace App\Mail;

use App\Models\Post;
use App\Models\User;
use App\Models\Comment;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Contracts\Queue\ShouldQueue;

class PostCommentedEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $commentor;
    public $comment;
    public $post;
    /**
     * Create a new message instance.
     */
    public function __construct(User $commentor, Post $post, Comment $comment) {
      $this->commentor = $commentor;
      $this->comment = $comment;
      $this->post = $post;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Someone Commented On Your Post',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.posts.post_commented',
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
