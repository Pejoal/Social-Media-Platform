<script setup>
import Actions from "@/Components/Actions.vue";
import FriendshipRequests from "@/Components/FriendshipRequests.vue";
import Friends from "@/Components/Friends.vue";
import Post from "@/Components/Post.vue";
import AuthLayout from "@/Layouts/AuthLayout.vue";
import { Head } from "@inertiajs/vue3";
import Loading from "@/Components/Loading.vue";
import { useFetch } from "@/utils";
import { ref } from "vue";

let props = defineProps({
  posts: {
    type: Array,
    default: [],
  },
  joined_chat_groups: {
    type: Array,
    default: [],
  },
});

let allPosts = ref([]);
let page = ref(2);
let loading = ref(false);

({ data: allPosts, loading } = useFetch(
  route("user.profile.me"),
  page,
  props.posts
));

function setPosts() {
  const mergedArray = [...props.posts, ...allPosts.value];
  allPosts.value = Array.from(new Set(mergedArray.map((obj) => obj.id))).map(
    (id) => mergedArray.find((obj) => obj.id === id)
  );
}

function deletePost(id) {
  allPosts.value = allPosts.value.filter(function (post) {
    return post.id != id;
  });
}
</script>

<template>
  <Head :title="$page.props.words.my_profile" />

  <AuthLayout
    v-on:setPosts="setPosts()"
    :joined_chat_groups="props.joined_chat_groups"
  >
    <template #content>
      <div class="flex items-center justify-center gap-2 py-2 shadow-lg">
        <FriendshipRequests />
        <Friends />
      </div>
      <div class="py-2 rounded-lg">
        <Actions class="md:hidden p-2 bg-zinc-900 rounded-lg" />
        <section
          v-if="allPosts.length >= 1"
          class="bg-zinc-800 text-white rounded-lg p-2 my-2"
        >
          <h2 class="text-lg px-2 py-1">{{ $page.props.words.posts }}</h2>
          <Post
            v-for="post in allPosts"
            :key="post.id"
            class="my-4 p-2 bg-zinc-900 rounded-lg"
            :post="post"
            v-on:deletePost="deletePost"
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
