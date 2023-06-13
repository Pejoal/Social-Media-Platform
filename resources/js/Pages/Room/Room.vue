<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import Message from "@/Components/Message.vue";
import CreateMessage from "@/Components/CreateMessage.vue";
import Alert from "@/Components/Alert.vue";
import { Head } from "@inertiajs/vue3";
import { ref, onMounted } from "vue";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { getRandomDigits } from "@/utils";

let props = defineProps({
  title: {
    type: String,
    default: "",
  },
  roomId: {
    type: Number,
    default: 0,
  },
  // messages: {
  //   type: Array,
  //   default: [],
  // },
});

const env = import.meta.env;
let initials = ref([]); // Online Users
let messages = ref([]);

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
  echo
    .join(`chat.${props.roomId}`)
    .here((users) => {
      // console.log("users here:", users, "#####");
      initials.value = users.map(function (user) {
        return {
          id: user.id,
          name: user.firstname[0] + user.lastname[0],
        };
      });
    })
    .joining((user) => {
      // console.log(user, "Joined the channel", "#####");
      messages.value.unshift({
        id: getRandomDigits(),
        firstname: user.firstname,
        lastname: user.lastname,
        created_at: new Date().toLocaleTimeString(),
        type: "join",
      });
      initials.value.unshift({
        id: user.id,
        name: user.firstname[0] + user.lastname[0],
      });
    })
    .leaving((user) => {
      messages.value.unshift({
        id: getRandomDigits(),
        firstname: user.firstname,
        lastname: user.lastname,
        created_at: new Date().toLocaleTimeString(),
        type: "leave",
      });
      initials.value = initials.value.filter(function (ini) {
        return ini.id != user.id;
      });
    })
    .listen("RoomMessageSent", (data) => {
      // console.log("Event received:", data);
      messages.value.unshift({
        id: getRandomDigits(),
        firstname: data.firstname,
        lastname: data.lastname,
        content: data.content,
        created_at: new Date().toLocaleTimeString(),
        type: "content",
      });
    })
    .error((error) => {
      console.error(error);
    });
});

function unshiftMessage(data) {
  messages.value.unshift({
    id: getRandomDigits(),
    firstname: data.firstname,
    lastname: data.lastname,
    content: data.content,
    created_at: new Date().toLocaleTimeString(),
    type: "content",
  });
}
</script>

<template>
  <Head :title="props.title + ' Room'" />

  <AuthLayout>
    <template #content>
    <main class="bg-zinc-800">
      <div
        class="mb-2 bg-zinc-700 px-2 border border-gray-600 rounded-md shadow-lg"
      >
        <section class="flex gap-1 m-2 px-2 py-4 border rounded-lg overflow-x-auto">
          <div
            class="flex items-center justify-center w-10 h-10 bg-gray-800 text-white rounded-full"
            v-for="initial in initials"
            :key="initial.id"
            v-text="initial.name"
          ></div>
        </section>
        <div
          class="overflow-y-auto h-96 max-h-[75vh] mb-5 px-2 py-4 border border-gray-600 rounded-lg"
        >
          <section v-for="message in messages" :key="message.id">
            <Alert
              v-if="message.type === 'join' || message.type === 'leave'"
              :message="message"
            />
            <Message v-else :message="message" />
          </section>
        </div>
        <CreateMessage :roomId="props.roomId" v-on:unshiftMessage="unshiftMessage" />
      </div>
    </main>
  </template>

  </AuthLayout>
</template>
