<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import { usePage, Head } from "@inertiajs/vue3";
import { ref } from "vue";
import PrivateMessage from "@/Components/PrivateMessage.vue";

const props = defineProps({
  messages: {
    type: Array,
    default: [],
  },
  recipient_username: {
    type: String,
    default: "",
  },
  friendship_id: {
    type: Number,
    default: 0,
  },
});

const user = usePage().props.auth.user;
let messages = ref(props.messages);
const { props: properities } = usePage();

async function addMessage(data) {
  messages.value.push({
    id: data.id,
    content: data.content,
    created_at: data.created_at,
    recipient_username: data.recipient_username,
  });
}
</script>

<template>
  <Head :title="properities.words.private_chat" />

  <AuthLayout>
    <template #content>
      <div class="shadow-lg rounded-lg bg-zinc-800">
        <div>
          <section
            v-if="messages.length > 0"
            class="px-2 py-4 rounded-lg shadow-2xl h-[80vh] overflow-y-auto"
          >
            <div
              v-for="message in messages"
              :key="message.id"
              class="flex justify-between py-2 px-4 my-2 rounded-lg w-[90%]"
              :class="{
                'bg-green-700 float-left':
                  message.recipient_username != user.username,
                'bg-slate-500 float-right':
                  message.recipient_username == user.username,
              }"
            >
              <p class="text-white">{{ message.content }}</p>
              <span class="text-gray-200 mt-6"> {{ message.created_at }}</span>
            </div>
          </section>
          <div class="clear-both"></div>
          <PrivateMessage
            :friendship_id="props.friendship_id"
            :recipient_username="props.recipient_username"
            v-on:addMessage="addMessage"
          />
        </div>
      </div>
    </template>
  </AuthLayout>
</template>
