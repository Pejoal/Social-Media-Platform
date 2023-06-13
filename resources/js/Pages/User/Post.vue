<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import Post from "@/Components/Post.vue";
import { Head } from "@inertiajs/vue3";

const props = defineProps({
  post: Object,
});

const back = () => {
  window.history.back();
};
</script>

<template>
  <Head>
    <title>{{ $page.props.words.post_details }}</title>
  </Head>
  <AuthLayout>
    <template #content>
      <section
        v-if="props.post"
        class="pt-2 pb-4 text-white bg-zinc-800 rounded-lg"
      >
        <Post :post="props.post" />
        <button class="ml-6 btn btn-warning" @click="back">
          {{$page.props.words.back}}
        </button>
      </section>
    </template>
  </AuthLayout>
</template>
