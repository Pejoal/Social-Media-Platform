<script setup>
import { ref } from "vue";
import { getRandomDigits } from "@/utils";

const emit = defineEmits(["messagesent"]);
let newMessage = ref("");
let input = ref(null);

function sendMessage() {
  emit("messagesent", {
    id: getRandomDigits(),
    content: newMessage.value
  });
  newMessage.value = "";
  input.value.focus();
}
</script>

<template>
  <div class="flex items-center justify-center gap-4 my-4">
    <input
      type="text"
      class="text-black border border-gray-300 py-2 px-4 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      ref="input"
      name="content"
      :placeholder="$page.props.words.type_your_message_here"
      v-model="newMessage"
      @keyup.enter="sendMessage"
    />
    <button
      type="submit"
      @click="sendMessage"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline-blue focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      {{ $page.props.words.submit }}
    </button>
  </div>
</template>
