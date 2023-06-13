<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class MakeServiceCommand extends Command {
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'make:service {name}';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Create a new service class';

  /**
   * Execute the console command.
   *
   * @return int
   */
  public function handle() {
    $name = $this->argument('name');
    $stub = file_get_contents(__DIR__ . '/stubs/service.stub');
    $stub = str_replace('{{classname}}', $name, $stub);
    $path = app_path('Services/' . $name . '.php');

    if (file_exists($path)) {
      $this->error('Service already exists!');
      return 1;
    }

    file_put_contents($path, $stub);

    $this->info($name . ' created successfully.');
    return 0;
  }
}
