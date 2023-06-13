<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import ResuableModal from "@/Components/ResuableModal.vue";
import { Head, Link, useForm } from "@inertiajs/vue3";
import { ref, onMounted, onUnmounted } from "vue";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

const env = import.meta.env;

const props = defineProps({
  messages: {
    type: Array,
    default: [],
  },
  chat_group: {
    type: Object,
    default: {},
  },
  friends: {
    type: Object,
    default: [],
  },
  joined_chat_groups: {
    type: Array,
    default: [],
  },
});

onMounted(() => {
  window.addEventListener("scroll", getMessagess);

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
    .join(`chat.group.${props.chat_group.id}`)
    .here((users) => {
      // console.log("users here:", users, "#####");
    })
    .joining((user) => {
      // console.log(user, "Joined the channel", "#####");
    })
    .leaving((user) => {
      // console.log(user, "Left the channel", "#####");
    })
    .listen("ChatGroupMessageSent", (data) => {
      // console.log("Event received:", data);
      messages.value.unshift({
        id: data.id,
        content: data.content,
        canUpdateMessage: data.canUpdateMessage,
        created_at: data.created_at,
        user: {
          name: data.name,
          username: data.username,
        },
      });
    })
    .error((error) => {
      console.error(error);
    });
});

onUnmounted(() => {
  window.removeEventListener("scroll", getMessagess);
});

let addMemberModal = ref(false);
let removeMemberModal = ref(false);

let form = useForm({
  user_id: 0,
});

let messageForm = useForm({
  content: "",
});

function addMember(id) {
  addMemberModal.value = false;
  form.user_id = id;
  form.post(route("chat.groups.user.add", [props.chat_group.id]), {
    preserveScroll: true,
    onSuccess: () => {},
  });
}

function removeMember(id) {
  removeMemberModal.value = false;
  form.user_id = id;
  form.delete(route("chat.groups.user.remove", [props.chat_group.id]), {
    preserveScroll: true,
    onSuccess: () => {},
  });
}

const getMessagess = async () => {
  // console.log('scrolling...');
  const windowHeight =
    "innerHeight" in window
      ? window.innerHeight
      : document.documentElement.offsetHeight;
  const body = document.body;
  const html = document.documentElement;
  const docHeight = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
  const windowBottom = windowHeight + window.pageYOffset;
  // when Reaching half Screnn of windowBottom
  if (windowBottom + window.innerHeight / 2 >= docHeight) {
    if (lastPage.value || loading.value) {
      return;
    }

    try {
      loading.value = true;
      const response = await axios.get(
        route("chat.groups.view", [props.chat_group.id]),
        {
          params: {
            page: page.value,
          },
        }
      );

      messages.value.unshift(...response.data.data);
      lastPage.value = !response.data.links.next;
      page.value++;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  }
};

const messages = ref(props.messages);
const contentInput = ref(null);
const page = ref(2); // first page data already got from props
const lastPage = ref(false);
const loading = ref(false);

function sendMessage() {
  axios
    .post(route("chat.groups.message.store", [props.chat_group.id]), {
      content: messageForm.content,
    })
    .then(function () {
      messageForm.reset();
      messageForm.recentlySuccessful = true;
      setTimeout(() => {
        messageForm.recentlySuccessful = false;
      }, 2500);
    })
    .catch(function (e) {
      // console.log(e.response.data.errors);
      messageForm.errors.content = e.response.data.errors?.content[0] ?? false;
      contentInput.value.focus();
      setTimeout(() => {
        messageForm.errors.content = false;
      }, 4000);
    });
}

function handleDeleteGroupMessage(id) {
  axios
    .delete(route("chat.groups.message.delete", [props.chat_group.id, id]))
    .then(function () {
      messages.value = messages.value.filter(function (message) {
        return message.id != id;
      });
    });
}
</script>

<template>
  <Head :title="props.chat_group.name" />
  <AuthLayout :joined_chat_groups="props.joined_chat_groups">
    <template #content>
      <section class="px-2 py-1 bg-zinc-800">
        <section class="flex items-center justify-between px-2">
          <h2 class="text-xl px-4 py-2">{{ props.chat_group.name }}</h2>
          <p v-if="chat_group.description" class="text-gray-200 text-md">
            {{ chat_group.description }}
          </p>
          <span class="text-gray-300 text-md self-end">{{
            $page.props.words.created + " " + chat_group.created_at
          }}</span>
        </section>

        <section
          v-if="chat_group.creator_id == $page.props.auth.user.id"
          class="flex gap-2 bg-neutral-600 rounded-md px-4 py-2"
        >
          <button class="btn btn-primary" @click="addMemberModal = true">
            {{ $page.props.words.add_member }}
          </button>

          <button class="btn btn-danger" @click="removeMemberModal = true">
            {{ $page.props.words.remove_member }}
          </button>
        </section>

        <Teleport to="body">
          <ResuableModal :show="addMemberModal" @close="addMemberModal = false">
            <template #content>
              <div
                v-if="props.friends"
                v-for="friend in props.friends"
                :key="friend.id"
                class="bg-zinc-800 shadow-md my-2 rounded-lg p-2 w-full"
              >
                <div class="flex items-center justify-between mb-2">
                  <Link
                    :href="route('user.profile', friend.username)"
                    as="button"
                    class="text-lg font-bold"
                  >
                    {{ friend.name }}
                  </Link>
                  <form @submit.prevent="addMember(friend.id)">
                    <button class="btn btn-primary">
                      {{ $page.props.words.add_to_group }}
                    </button>
                  </form>
                </div>
              </div>
            </template>
          </ResuableModal>
        </Teleport>

        <Teleport to="body">
          <ResuableModal
            :show="removeMemberModal"
            @close="removeMemberModal = false"
          >
            <template #content>
              <div
                v-if="props.chat_group.members"
                v-for="member in props.chat_group.members"
                :key="member.id"
                class="bg-zinc-800 shadow-md my-2 rounded-lg p-2 w-full"
              >
                <div class="flex items-center justify-between">
                  <Link
                    :href="route('user.profile', member.username)"
                    as="button"
                    class="text-lg font-bold"
                  >
                    {{ member.name }}
                  </Link>
                  <form @submit.prevent="removeMember(member.id)">
                    <button class="btn btn-danger">
                      {{ $page.props.words.remove_from_group }}
                    </button>
                  </form>
                </div>
              </div>
            </template>
          </ResuableModal>
        </Teleport>

        <!-- <Link
          class="text-gray-100 font-bold hover:text-white hover:underline"
          :href="route('user.profile', props.chat_group.creatorUsername)"
        >
          {{ props.chat_group.creatorName }}
        </Link> -->
        <h3 class="text-lg mt-2">{{ $page.props.words.members }}</h3>
        <section
          class="flex gap-2 bg-stone-700 overflow-x-auto px-2 py-1 mb-2 rounded-lg"
        >
          <div
            v-for="member in props.chat_group.members"
            :key="member.id"
            class="my-2 bg-slate-700 px-2 py-1 rounded-md"
          >
            <Link
              :href="route('user.profile', member.username)"
              as="button"
              class="text-lg font-bold"
              >{{ member.name }}</Link
            >
          </div>
        </section>
        <section class="bg-slate-700 px-2 pt-1 pb-4 rounded-lg">
          <form @submit.prevent="sendMessage()">
            <div class="flex gap-2 my-4">
              <input
                v-model="messageForm.content"
                type="text"
                :placeholder="$page.props.words.content"
                class="px-4 py-2 rounded-lg text-black flex-1"
                ref="contentInput"
              />
              <button class="btn btn-primary">
                {{ $page.props.words.send }}
              </button>
            </div>
            <Transition
              enter-from-class="opacity-0"
              leave-to-class="opacity-0"
              class="transition ease-in-out"
            >
              <p
                v-if="messageForm.recentlySuccessful"
                class="mt-2 text-sm text-gray-200"
              >
                {{ $page.props.words.sent }}
              </p>
            </Transition>
            <p v-if="messageForm.errors.content" class="error">
              {{ messageForm.errors.content }}
            </p>
          </form>
          <section v-if="messages.length >= 1">
            <div
              class="bg-zinc-700 rounded-md my-2 px-2 py-1"
              v-for="message in messages"
              :key="message.id"
            >
              <Link
                class="text-white font-bold py-2"
                :href="route('user.profile', [message.user.username])"
                >{{ message.user.name }}</Link
              >
              <p class="text-gray-100 px-4">{{ message.content }}</p>
              <div class="flex items-center justify-end">
                <button
                  v-if="message.canUpdateMessage"
                  @click="handleDeleteGroupMessage(message.id)"
                  class="btn btn-danger"
                >
                  {{ $page.props.words.delete }}
                </button>
              </div>
            </div>
          </section>
        </section>
      </section>
    </template>
  </AuthLayout>
</template>
