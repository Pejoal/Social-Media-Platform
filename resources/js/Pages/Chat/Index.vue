<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import ChatMessages from "@/Components/ChatMessages.vue";
import ChatForm from "@/Components/ChatForm.vue";
import { usePage, Head } from "@inertiajs/vue3";
import { ref, onMounted } from "vue";
import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

const env = import.meta.env;

onMounted(() => {
  const pusher = new Pusher(env.VITE_PUSHER_APP_KEY, {
    cluster: env.VITE_PUSHER_APP_CLUSTER,
    encrypted: true,
  });
  const echo = new Echo({
    broadcaster: "pusher",
    key: env.VITE_PUSHER_APP_KEY,
    cluster: env.VITE_PUSHER_APP_CLUSTER,
    encrypted: true,
    pusher: pusher,
  });
  echo.channel("chat").listen("MessageSent", (data) => {
    messages.value.unshift({
      id: data.id,
      content: data.content,
      user_firstname: data.user_firstname,
    });
  });
  fetchMessages();
});

const user = usePage().props.auth.user;
let messages = ref([]);
const { props: properities } = usePage();

function fetchMessages() {
  axios.get(route('public.chat.fetch')).then((response) => {
    messages.value = response.data;
  });
}
async function addMessage(data) {
  try {
    axios.post(route('public.chat.create'), data);
  } catch (err) {
    console.log(err);
  }
}
</script>

<template>
  <Head :title="properities.words.chats" />

  <AuthLayout>
    <template #content>
      <div class="bg-zinc-800 px-2 py-4 rounded-lg">
        <div class="overflow-hidden shadow-sm sm:rounded-lg">
          <div class="container mx-auto">
            <div>
              <ChatForm v-on:messagesent="addMessage" />
              <ChatMessages :messages="messages" />
            </div>
          </div>
        </div>
      </div>
  </template>
  </AuthLayout>
</template>
