<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import { ref } from "vue";
import { Head } from "@inertiajs/vue3";
import { useFetch } from "@/utils";
import Loading from "@/Components/Loading.vue";

const props = defineProps({
  likers: {
    type: Array,
    default: [],
  },
  object: {
    type: String,
    default: "",
  },
  objectId: {
    type: Number,
    default: 0,
  },
  object2Id: {
    type: Number,
    default: 0,
  },
});

let allLikers = ref([]);
let page = ref(2);
let loading = ref(false);

if (props.object === "post") {
  ({ data: allLikers = props.likers, loading } = useFetch(
    route("posts.likes", props.objectId),
    page,
    props.likers
  ));
} else if (props.object === "comment") {
  ({ data: allLikers = props.likers, loading } = useFetch(
    route("comments.likes", props.objectId),
    page,
    props.likers
  ));
} else if (props.object === "reply") {
  ({ data: allLikers = props.likers, loading } = useFetch(
    route("comments.replies.likes", [props.objectId, props.object2Id]),
    page,
    props.likers
  ));
}

const back = () => {
  window.history.back();
};
</script>

<template>
  <Head title="Likers" />

  <AuthLayout>
    <template #content>
      <div v-if="likers.length" class="bg-zinc-800 px-2 py-4 rounded-lg">
        <section
          v-for="liker in allLikers"
          :key="liker.id"
          class="flex flex-col gap-2 my-2 py-6 px-4 bg-zinc-700 rounded-md"
        >
          <p>
            <span class="font-bold">{{ liker.name }}</span>
          </p>
        </section>
        <button class="ml-6 btn btn-warning" @click="back">
          {{ $page.props.words.back }}
        </button>
      </div>
      <div v-else>No Likers Yet...</div>
      <Loading v-if="loading" />
    </template>
  </AuthLayout>
</template>
