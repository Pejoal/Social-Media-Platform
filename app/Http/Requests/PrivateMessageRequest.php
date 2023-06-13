<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PrivateMessageRequest extends FormRequest {
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
   */
  public function rules(): array
  {
    return [
      "content" => ['required', 'string', 'max:1000', 'min:1'],
      "friendship_id" => ['required', 'numeric', 'min:1'],
    ];
  }
}
