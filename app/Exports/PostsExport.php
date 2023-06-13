<?php

namespace App\Exports;

use App\Models\Post;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithProperties;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class PostsExport implements FromCollection, WithStyles, WithProperties, ShouldAutoSize, WithHeadings, WithMapping {
  /**
   * @return \Illuminate\Support\Collection
   */
  public function collection() {
    return Post::all();
  }
  public function headings(): array
  {
    return [
      'ID',
      'Content',
      'Posted at',
      'Author Username',
    ];
  }

  public function map($Post): array
  {
    return [
      $Post->id,
      $Post->content,
      // $Post->created_at->diffforhumans(),
      $Post->created_at,
      $Post->user->username,
    ];
  }
  public function styles(Worksheet $sheet) {
    return [
      // Style the first row as bold text.
      1 => ['font' => ['bold' => true]],

      // // Styling a specific cell by coordinate.
      // 'B2' => ['font' => ['italic' => true]],

      // // Styling an entire column.
      // 'C' => ['font' => ['size' => 16]],
    ];
  }

  public function properties(): array
  {
    return [
      'creator' => 'Pejoal',
      'lastModifiedBy' => 'Pejoal Nagy',
      'title' => 'Posts Export',
      'description' => 'Latest Posts',
      'subject' => 'Posts',
      'keywords' => 'Posts,export,spreadsheet',
      'category' => 'Posts',
      'manager' => 'Pejoal Nagy',
      'company' => 'Pejoal',
    ];
  }
}
