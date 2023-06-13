<script setup>
import DashboardLayout from "@/Layouts/DashboardLayout.vue";
import { Head, usePage } from "@inertiajs/vue3";
import { ref } from "vue";
import UsersDatatable from "./UsersDatatable.vue";
import PostsDatatable from "./PostsDatatable.vue";
import CommentsDatatable from "./CommentsDatatable.vue";
import RepliesDatatable from "./RepliesDatatable.vue";
import PublicMessagesDatatable from "./PublicMessagesDatatable.vue";

const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
});

const currentTab = ref("Users");

const tabs = {
  Users: UsersDatatable,
  Posts: PostsDatatable,
  Comments: CommentsDatatable,
  Replies: RepliesDatatable,
  "Public Messages": PublicMessagesDatatable,
};

const { props: properities } = usePage();
</script>

<template>
  <Head>
    <title>{{ properities.words.dashboard }}</title>
  </Head>
  <DashboardLayout>
    <template #content>
      <main>
        <section v-if="props.data != null" class="bg-zinc-900 py-4 rounded-md text-white">
          <h2 class="text-lg px-2">{{ $page.props.words.data }}</h2>
          <section class="bg-zinc-700 p-2 rounded-lg">
            <div
              class="bg-slate-800 px-2 py-1 rounded-md my-2"
              v-for="(value, key) in props.data"
            >
              {{ key }}: {{ value }}
            </div>
          </section>
        </section>
        <section
          class="py-2 my-4 mx-auto w-full md:w-[80vw] overflow-x-auto pl-32 sm:pl-0"
        >
          <div class="flex items-center justify-center gap-2">
            <button
              class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-l-lg"
              v-for="(_, tab) in tabs"
              :key="tab"
              :class="['tab-button', { active: currentTab === tab }]"
              @click="currentTab = tab"
            >
              {{ tab }}
            </button>
          </div>
        </section>
        <Component :is="tabs[currentTab]" />
      </main>
    </template>
  </DashboardLayout>
</template>

<style scoped>
.tab-button.active {
  background: #222;
  color: #fff;
}
</style>
