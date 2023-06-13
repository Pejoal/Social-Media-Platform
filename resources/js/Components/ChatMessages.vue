<script setup>
let props = defineProps({
  messages: {
    type: Array,
    default: [],
  },
});
</script>
<template>
  <ul class="bg-slate-900 py-4 text-white rounded-lg">
    <li
      class="bg-gray-800 px-4 py-4 my-4 mx-4 max-w-full rounded-lg overflow-hidden shadow-lg"
      v-for="message in props.messages"
      :key="message.id"
    >
      <div class="header">
        <strong class="font-bold text-xl my-2">
          {{ message.user_firstname }}
        </strong>
      </div>
      <p class="indent-4 text-gray-200 text-base my-4">
        {{ message.content }}
      </p>
    </li>
  </ul>
</template>
