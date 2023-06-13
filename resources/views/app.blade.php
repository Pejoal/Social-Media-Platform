<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <meta name="theme-color" content="#6777ef" />
  <link rel="apple-touch-icon" href="{{ asset('logo.PNG') }}">
  <link rel="manifest" href="{{ asset('/manifest.json') }}">

  <title inertia>{{ config('app.name', 'Laravel') }}</title>

  <!-- Fonts -->
  <link rel="stylesheet" href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap">

  <!-- Scripts -->
  @routes
  @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])
  @inertiaHead
</head>

<body class="font-sans antialiased">
  @inertia

  {{-- <script src="{{ asset('/sw.js') }}"></script>
  <script>
    if (!navigator.serviceWorker || !navigator.serviceWorker.controller) {
      navigator.serviceWorker.register("/sw.js").then(function(reg) {
        console.log("Service worker has been registered for scope: " + reg.scope);
      });
    }
  </script> --}}
</body>

</html>
