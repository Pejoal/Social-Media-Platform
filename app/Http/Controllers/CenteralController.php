<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Inertia\Inertia;

class CenteralController extends Controller {
  public function index() {
    $centralDomains = config('tenancy.central_domains');
    $currentDomain = request()->getHost();

    if (!in_array($currentDomain, $centralDomains)) {
      array_push($centralDomains, $currentDomain);
    }

    config(['tenancy.central_domains' => $centralDomains]);

    return Inertia::render('Centeral/Index', [
      'tenants' => Tenant::with('domains')->get(),
      'domain' => request()->getHost(),
    ]);
  }

  public function store(Request $request) {

    // dd($request->all());

    $tenant = Tenant::create(['id' => $request->id]);
    $tenant->domains()->create(['domain' => $request->id . '.' . request()->getHost()]);

    $tenant->run(function () use ($request) {
      User::create([
        'firstname' => $request->adminName,
        'username' => $request->adminName,
        'type' => 'super admin',
        'email' => $request->adminEmail,
        'email_verified_at' => now(),
        'password' => bcrypt($request->password),
      ]);

      // For Channels & Broadcasting
      // $tenant = Tenant::create(['id' => $request->id]);
      // $tenant->domains()->create(['domain' => $request->id . '.' . request()->getHost()]);

      // For Groups
      Artisan::call('tenants:seed', [
        '--tenants' => $request->id,
        '--class' => 'TenantSetupSeeder',
      ]);

      if ($request->seed) {
        // dd($request->id);
        Artisan::call('tenants:seed', [
          '--tenants' => $request->id,
        ]);
        // $output = Artisan::output();
        // dd($output);
      }
    });

  }
}
