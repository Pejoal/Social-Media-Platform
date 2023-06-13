<script setup>
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import { Link } from "@inertiajs/vue3";
</script>

<template>
  <div class="min-h-screen bg-black text-white">
    <header
      class="flex items-center justify-center h-20 bg-zinc-900 py-2 px-4 sm:px-6 lg:px-8"
    >
      <Link class="text-white font-bold text-xl" :href="route('home')">
        {{ $page.props.appName }}
      </Link>
    </header>
    <div class="grid place-items-center">
      <slot />
    </div>
  </div>
</template>
