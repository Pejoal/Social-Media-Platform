<script setup>
import { ref } from "vue";
import { Link } from "@inertiajs/vue3";
import ResuableModal from "./ResuableModal.vue";

let showModal = ref(true);
let friendshipRequests = ref([]);

async function getFriendShipRequests() {
  showModal.value = !showModal.value;
  try {
    axios.get("/getFriendShipRequests").then((res) => {
      friendshipRequests.value = res.data;
    });
  } catch (err) {
    console.log(err);
  }
}
getFriendShipRequests();

async function rejectFriendshipRequest(friendshipRequestId, user2_id) {
  // console.log(requester_id);
  friendshipRequests.value = friendshipRequests.value.filter(function (
    friendshipRequest
  ) {
    return friendshipRequest.id != friendshipRequestId;
  });
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
  friendshipRequests.value = friendshipRequests.value.filter(function (
    friendshipRequest
  ) {
    return friendshipRequest.id != friendshipRequestId;
  });
  try {
    axios.post("/acceptFriendshipRequest", {
      friendshipRequestId,
      user2_id,
    });
  } catch (err) {
    console.log(err);
  }
}
</script>
<template>
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    @click="getFriendShipRequests"
  >
    <span
      class="bg-red-500 text-white rounded-full px-3 py-1 text-sm font-semibold"
      >{{ friendshipRequests.length }}</span
    >
    {{ $page.props.words.requests }}
  </button>
  <Teleport to="body">
    <ResuableModal :show="showModal" @close="showModal = false">
      <template #content>
        <section class="w-[70vw]">
          <h2 class="text-lg py-2 px-4">
            {{ $page.props.words.friendship_requests }}
          </h2>
          <div class="flex flex-col gap-3 max-h-[85vh] overflow-y-auto">
            <div
              v-for="friendshipRequest in friendshipRequests"
              class="bg-zinc-800 shadow-md rounded-lg p-2 w-full"
            >
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-lg font-bold">
                  {{ friendshipRequest.requester_name }}
                </h3>
                <button
                  class="text-red-500 font-bold hover:underline"
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
              <p class="text-sm text-gray-100">
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
                <Link
                  :href="
                    route('user.profile', friendshipRequest.requester_username)
                  "
                  as="button"
                  class="bg-gray-700 hover:bg-gray-600 text-gray-100 font-bold py-2 px-4 rounded"
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
