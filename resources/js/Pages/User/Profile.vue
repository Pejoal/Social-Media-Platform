<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import { usePage, Head, Link } from "@inertiajs/vue3";
import { ref } from "vue";
import Post from "@/Components/Post.vue";
import ResuableModal from "@/Components/ResuableModal.vue";
import Loading from "@/Components/Loading.vue";
import { useFetch } from "@/utils";

const props = defineProps({
  posts: {
    type: Array,
    default: [],
  },
  author: String,
  authorId: Number,
  authorUsername: String,
  postLikesGot: Number,
  friendshipRequestSenderId: {
    type: Number,
    default: 0,
  },
  friendshipRequestId: {
    type: Number,
    default: 0,
  },
  friendshipStatus: {
    type: String,
    default: "no",
  },
});

let allPosts = ref([]);
let page = ref(2);
let loading = ref(false);

({ data: allPosts, loading } = useFetch(
  route("user.profile", props.authorId),
  page,
  props.posts
));

let friendshipStatus = ref(props.friendshipStatus);
let friendshipRequestSenderId = ref(props.friendshipRequestSenderId);

const user = usePage().props.auth.user;

async function sendFriendshipRequest() {
  try {
    axios
      .post("/sendFriendshipRequest", {
        user2_id: props.authorId,
        friendshipRequestId: props.friendshipRequestId,
      })
      .then((res) => {
        friendshipStatus.value = "pending";
        friendshipRequestSenderId.value = user.id;
      });
  } catch (err) {
    console.log(err);
  }
}

async function cancelFriendshipRequest() {
  try {
    axios
      .delete("/cancelFriendshipRequest", {
        params: {
          user2_id: props.authorId,
        },
      })
      .then((res) => {
        friendshipStatus.value = "canceled";
      });
  } catch (err) {
    console.log(err);
  }
}

let showModal = ref(true);
let friendshipRequest = ref([]);

async function getFriendShipRequest() {
  showModal.value = !showModal.value;
  try {
    axios
      .get("/getFriendShipRequest", {
        params: {
          user1_id: props.authorId,
        },
      })
      .then((res) => {
        friendshipRequest.value = res.data;
      });
  } catch (err) {
    console.log(err);
  }
}
if (
  props.friendshipRequestId != 0 &&
  props.friendshipStatus === "pending" &&
  ![user.id, 0].includes(props.friendshipRequestSenderId)
) {
  getFriendShipRequest();
}

async function rejectFriendshipRequest(friendshipRequestId, user2_id) {
  // console.log(requester_id);
  showModal.value = false;
  friendshipStatus.value = "rejected";
  try {
    axios.delete("/rejectFriendshipRequest", {
      params: {
        friendshipRequestId,
        user2_id,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

async function acceptFriendshipRequest(friendshipRequestId, user2_id) {
  showModal.value = false;
  friendshipStatus.value = "accepted";
  try {
    axios.post("/acceptFriendshipRequest", {
      friendshipRequestId,
      user2_id,
    });
  } catch (err) {
    console.log(err);
  }
}

function deletePost(id) {
  allPosts.value = allPosts.value.filter(function (post) {
    return post.id != id;
  });
}
</script>

<template>
  <Head :title="props.author + `'s Profile`" />

  <AuthLayout>
    <template #content>
      <section class="flex justify-between py-6 px-4">
        <h2 class="font-semibold text-lg text-white leading-tight">
          {{ props.author }}'s Profile
        </h2>
        <div v-if="postLikesGot">
          {{ props.postLikesGot }} {{ $page.props.words.likes }}
        </div>
      </section>
      <section
        v-if="props.authorId != user.id && friendshipStatus !== 'accepted'"
        class="flex justify-end bg-zinc-700 text-white px-4 py-2"
      >
        <button
          v-if="
            friendshipStatus === 'pending' &&
            friendshipRequestSenderId == user.id
          "
          class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          @click="cancelFriendshipRequest"
        >
          {{ $page.props.words.cancel }}
        </button>
        <div
          class="my-2"
          v-else-if="
            props.friendshipRequestId != 0 &&
            friendshipStatus === 'pending' &&
            ![user.id, 0].includes(friendshipRequestSenderId)
          "
        >
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            @click="getFriendShipRequest"
          >
            {{ $page.props.words.respond }}
          </button>
          <Teleport to="body">
            <ResuableModal :show="showModal" @close="showModal = false">
              <template #content>
                <div class="flex flex-col w-[70vw] px-2 py-1 overflow-y-auto">
                  <div class="bg-zinc-800 shadow-md rounded-lg p-2 w-full">
                    <div class="flex items-center justify-between mb-2">
                      <h3 class="text-lg font-bold text-white">
                        {{ props.author }}
                      </h3>
                      <button
                        class="text-red-500 font-bold"
                        @click="
                          rejectFriendshipRequest(
                            friendshipRequest.id,
                            friendshipRequest.requester_id
                          )
                        "
                      >
                        {{ $page.props.words.reject }}
                      </button>
                    </div>
                    <p class="text-sm text-gray-200">
                      {{ $page.props.words.sent_friend_request }}
                    </p>
                    <p class="text-sm text-gray-300">
                      {{ friendshipRequest.updated_at }}
                    </p>
                    <div class="flex justify-end mt-2">
                      <button
                        @click="
                          acceptFriendshipRequest(
                            friendshipRequest.id,
                            friendshipRequest.requester_id
                          )
                        "
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        {{ $page.props.words.accept }}
                      </button>
                    </div>
                  </div>
                </div>
              </template>
            </ResuableModal>
          </Teleport>
        </div>
        <button
          v-else-if="!['accepted', 'blocked'].includes(friendshipStatus)"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="sendFriendshipRequest"
        >
          {{ $page.props.words.add_friend }}
        </button>
      </section>
      <section
        v-if="friendshipStatus === 'accepted'"
        class="flex justify-between py-4 px-12"
      >
        <h2 class="text-xl border-b">
          {{ $page.props.words.you_are_friends }}
        </h2>
        <Link
          :href="route('private.messages.index', props.authorUsername)"
          as="button"
          class="text-lg text-green-500 hover:text-green-700 hover:underline"
        >
          {{ $page.props.words.chat }}
        </Link>
      </section>
      <div class="py-6">
        <section
          v-if="allPosts.length >= 1"
          class="bg-zinc-900 text-white py-4 rounded-lg"
        >
          <Post
            v-for="post in allPosts"
            :key="post.id"
            class="my-2 p-2 bg-zinc-800 rounded-lg"
            v-on:deletePost="deletePost"
            :post="post"
          />
          <Loading v-if="loading" />
        </section>
        <section v-else>
          <h3 class="text-xl py-2 px-4 border-b text-white">
            {{ $page.props.words.no_posts_yet }}
          </h3>
        </section>
      </div>
    </template>
  </AuthLayout>
</template>
