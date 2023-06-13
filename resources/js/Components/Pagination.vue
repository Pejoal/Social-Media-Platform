<script setup>
import { Link } from "@inertiajs/vue3";

defineProps({
  links: Array,
});
</script>

<template>
  <div class="flex items-center justify-center gap-2 flex-wrap py-4 rounded-lg bg-slate-800">
    <Component
      :is="link.url ? Link : 'span'"
      v-for="link in links"
      v-html="link.label"
      :href="link.url"
      :class="{ 'text-gray-500': !link.url, 'font-bold': link.active }"
    />
  </div>
</template>
