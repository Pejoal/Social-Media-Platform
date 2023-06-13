<?php

namespace App\Imports;

use App\Models\Post;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithStartRow;

class PostsImport implements ToModel, WithStartRow {
  /**
   * @param array $row
   *
   * @return \Illuminate\Database\Eloquent\Model|null
   */
  public function model(array $row) {
    return new Post([
      'id' => $row[0],
      'content' => $row[1],
      'create_at' => $row[2],
      'user_id' => $row[3],
    ]);
  }

  /**
   * @inheritDoc
   */
  public function startRow(): int {
    return 2; // Skip the first row
  }
  
}
