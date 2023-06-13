<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest {
  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
   */
  public function rules(): array
  {
    return [
      'firstname' => 'required|string|max:255',
      'lastname' => 'required|string|max:255',
      'username' => ['required', 'string', 'max:30', Rule::unique(User::class)->ignore($this->user()->id)],
      'gender' => ['required', 'string', Rule::in(['male', 'female'])],
      'email' => ['email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
    ];
  }
}
