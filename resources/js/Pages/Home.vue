<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import { ref, watch } from "vue";
import Post from "@/Components/Post.vue";
import Loading from "@/Components/Loading.vue";
import { Head } from "@inertiajs/vue3";
import { useFetch } from "@/utils";
// import { trans } from 'laravel-vue-i18n';
import { loadLanguageAsync } from 'laravel-vue-i18n';

const props = defineProps({
  posts: {
    type: Array,
    default: [],
  },
  filters: {
    type: Object,
    default: {
      search: "",
    },
  },
  joined_chat_groups: {
    type: Array,
    default: [],
  },
  projects: {
    type: Array,
    default: [],
  },
});

let search = ref(props.filters.search);
function setPosts() {
  const mergedArray = [...props.posts, ...allPosts.value];
  allPosts.value = Array.from(new Set(mergedArray.map((obj) => obj.id))).map(
    (id) => mergedArray.find((obj) => obj.id === id)
  );
}

let allPosts = ref([]);
let page = ref(2);
let loading = ref(false);

({
  data: allPosts,
  page,
  loading,
} = useFetch(route("home"), page, props.posts));

async function doSearch(search) {
  try {
    loading.value = true;
    const response = await axios.get(route("home"), {
      params: {
        search,
      },
    });

    allPosts.value = response.data.data;
    page.value == 2;
    // lastPage.value = false;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

watch(search, (value) => {
  // console.log(search.value, value, search.value == value);
  doSearch(value);
});

function deletePost(id) {
  allPosts.value = allPosts.value.filter(function (post) {
    return post.id != id;
  });
}
</script>

<template>
  <Head>
    <title>{{ $page.props.words.home }}</title>
  </Head>
  <AuthLayout
    v-on:setPosts="setPosts"
    :joined_chat_groups="props.joined_chat_groups"
    :projects="props.projects"
  >
    <template #left-sidebar> </template>
    <template #content>
      <section class="flex items-center justify-between px-4 md:px-0 pt-6 pb-4">
        <button class="btn btn-primary" @click="doSearch(search)">
          {{ $page.props.words.search }}
          <!-- {{ trans('words.my_profile') }} -->
        </button>
        <!-- <button @click="loadLanguageAsync('en')">Change to English Language</button> -->

        <input
          class="py-2 px-4 rounded-xl text-black w-3/4"
          type="search"
          name="search"
          :placeholder="$page.props.words.search + ' ' + $page.props.appName"
          id="search"
          v-model="search"
        />
      </section>
      <section v-if="allPosts.length >= 1">
        <div
          v-for="post in allPosts"
          :key="post.id"
          class="flex flex-col gap-1 my-4 p-2 bg-neutral-900 rounded-lg"
        >
          <Post :post="post" v-on:deletePost="deletePost" />
        </div>
        <!-- <Pagination :links="props.data.links" /> -->
        <Loading v-if="loading" />
      </section>
    </template>
  </AuthLayout>
</template>
