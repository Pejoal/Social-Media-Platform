<script setup>
import { ref } from "vue";
import { Link } from "@inertiajs/vue3";
import ResuableModal from "./ResuableModal.vue";

let showModal = ref(true);
let friendships = ref([]);

async function getFriends() {
  showModal.value = !showModal.value;
  try {
    axios.get("/getFriends").then((res) => {
      friendships.value = res.data;
    });
  } catch (err) {
    console.log(err);
  }
}
getFriends();

async function unfriend(friendship_id, user2_id) {
  try {
    axios
      .delete("/unfriend", {
        params: {
          user2_id: user2_id,
        },
      })
      .then((res) => {
        friendships.value = friendships.value.filter(function (friendship) {
          return friendship.id != friendship_id;
        });
      });
  } catch (err) {
    console.log(err);
  }
}
</script>
<template>
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    @click="getFriends"
  >
    <span
      class="bg-red-500 text-white rounded-full px-3 py-1 text-sm font-semibold"
      >{{ friendships.length }}</span
    >
    {{ $page.props.words.friends }}
  </button>
  <Teleport to="body">
    <ResuableModal :show="showModal" @close="showModal = false">
      <template #content>
        <section class="w-[70vw]">

        <h2 class="text-lg py-2 px-4">{{ $page.props.words.your_friends }}</h2>
        <div
          class="flex flex-col gap-2 max-h-[85vh] overflow-y-auto"
        >
          <div
            v-for="friendship in friendships"
            :key="friendship.id"
            class="bg-zinc-800 shadow-md rounded-lg p-2 w-full"
          >
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-lg font-bold">
                {{ friendship.friend_name }}
              </h3>
              <button
                class="text-red-500 font-bold hover:underline"
                @click="unfriend(friendship.id, friendship.friend_id)"
              >
                {{ $page.props.words.unfriend }}
              </button>
            </div>
            <p class="text-sm text-gray-200">
              {{ friendship.updated_at }}
            </p>
            <div class="flex justify-between mt-2">
              <Link
                :href="
                  route('private.messages.index', friendship.friend_username)
                "
                as="button"
                class="text-md font-bold text-teal-500 hover:text-teal-700 hover:underline"
              >
                {{ $page.props.words.chat }}
              </Link>
              <Link
                :href="route('user.profile', friendship.friend_username)"
                as="button"
                class="text-sm text-gray-200 hover:text-white underline"
              >
                {{ $page.props.words.view_profile }}
              </Link>
            </div>
          </div>
        </div>
      </section>
      </template>
    </ResuableModal>
  </Teleport>
</template>
