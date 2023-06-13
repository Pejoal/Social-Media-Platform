<script setup>
import InputError from "@/Components/InputError.vue";
import TextInput from "@/Components/TextInput.vue";
import { useForm } from "@inertiajs/vue3";
import { ref, onMounted } from "vue";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axios from "axios";

const props = defineProps({
  recipient_username: {
    type: String,
    default: "",
  },
  friendship_id: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["addMessage"]);
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
  echo
    .join(`friend.chat.${props.friendship_id}`)
    .here((users) => {
      // console.log("Here", users);
    })
    .joining((user) => {
      // console.log("Joined", user);
    })
    .leaving((user) => {
      // console.log("Left", user);
    })
    .listen("PrivateMessageSent", (data) => {
      // console.log("Event received:", data);
      emit("addMessage", {
        id: data.id,
        content: data.content,
        recipient_username: data.recipient_username,
        created_at: "Few seconds ago...",
      });
    })
    .error((err) => {
      // console.log(err);
    });
});

let contentInput = ref(null);

const form = useForm({
  content: "",
});

const storeMessage = () => {
  axios
    .post(route("private.messages.store", props.recipient_username), {
      content: form.content,
      friendship_id: props.friendship_id,
    })
    .then((res) => {
      form.reset();
      form.recentlySuccessful = true;
      setTimeout(() => {
        form.recentlySuccessful = false;
      }, 2500);
    })
    .catch((e) => {
      // console.log(e.response.data.errors.content[1]);
      form.errors.content = e.response.data.errors.content[0];
      contentInput.value.focus();
      setTimeout(() => {
        form.errors.content = false;
      }, 4000);
    });
};
</script>
<template>
  <form
    @submit.prevent="storeMessage"
    class="bg-zinc-900 flex flex-col items-center p-2 pb-6"
  >
    <div class="flex w-full gap-2">
      <TextInput
        id="content"
        type="text"
        class="mt-1 flex-1 text-black"
        :placeholder="$page.props.words.type_your_message_here"
        v-model="form.content"
        ref="contentInput"
      />
      
      <button
        class="btn btn-primary"
        :disabled="form.processing"
        >{{ $page.props.words.send }}</button
      >
    </div>
      <Transition
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
        class="transition ease-in-out"
      >
        <p v-if="form.recentlySuccessful" class="mt-2 text-sm text-gray-200">
          {{ $page.props.words.sent }}
        </p>
      </Transition>
      <InputError
        v-if="form.errors.content"
        :message="form.errors.content"
        class="error"
      />
  </form>
</template>
