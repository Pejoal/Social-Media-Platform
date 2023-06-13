<script setup>
defineProps({
  type: {
    type: String,
    default: "submit",
  },
});
</script>

<template>
  <button
    :type="type"
    class="flex items-center justify-center px-4 py-2 bg-green-500 hover:bg-green-600 focus:bg-green-700 active:bg-green-900 focus:outline-none border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest transition ease-in-out duration-150"
  >
    <slot />
  </button>
</template>
