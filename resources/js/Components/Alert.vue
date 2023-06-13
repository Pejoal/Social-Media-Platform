<script setup>
let props = defineProps({
  message: {
    type: Object,
    default: {},
  },
});
</script>
<template>
  <section
    class="flex px-1 py-2 my-2 text-sm rounded-lg"
    :class="{
      'text-blue-800 border border-blue-300  bg-blue-50':
        message.type === 'join',
      'text-red-800 border border-red-300 bg-red-50': message.type === 'leave',
    }"
    role="alert"
  >
    <template v-if="message.type === 'join'">
      <svg
        aria-hidden="true"
        class="flex-shrink-0 inline w-5 h-5 mr-3"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </template>
    <template v-if="message.type === 'leave'">
      <svg
        aria-hidden="true"
        class="flex-shrink-0 inline w-5 h-5 mr-3"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </template>
    <div class="w-full">
      <div class="flex justify-between items-center my-2">
        <span class="font-medium">Info alert!</span>
        <time class="text-gray-500 text-sm"> at {{ message.created_at }} </time>
      </div>
      <p>
        {{ message.firstname + " " + message.lastname }} has
        {{ message.type === "leave" ? "left" : "joined" }} the room
      </p>
    </div>
  </section>
</template>
