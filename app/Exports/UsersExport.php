<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithProperties;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class UsersExport implements FromCollection, WithStyles, WithProperties, ShouldAutoSize, WithHeadings, WithMapping {
  /**
   * @return \Illuminate\Support\Collection
   */
  public function collection() {
    return User::all();
  }
  public function headings(): array
  {
    return [
      'ID',
      'Firstname',
      'Lastname',
      'User Name',
      'Gender',
      'Type',
    ];
  }

  public function map($user): array
  {
    return [
      $user->id,
      $user->firstname,
      $user->lastname,
      $user->username,
      $user->gender,
      $user->type,
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
      'title' => 'Users Export',
      'description' => 'Latest Users',
      'subject' => 'Users',
      'keywords' => 'Users,export,spreadsheet',
      'category' => 'Users',
      'manager' => 'Pejoal Nagy',
      'company' => 'Pejoal',
    ];
  }
}
