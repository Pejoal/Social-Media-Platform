<script setup>
import { Link } from "@inertiajs/vue3";

const props = defineProps({
  projects: {
    type: Array,
    default: [],
  },
});
</script>

<template>
  <section>
    <h2 class="text-lg font-bold px-4 py-2">
      {{ $page.props.words.projects }}
    </h2>
    <section
      v-if="props.projects"
      class="flex flex-col gap-2 p-2 bg-zinc-800 rounded-lg"
    >
      <div
        v-for="project in props.projects"
        :key="project.id"
        class="flex flex-col bg-slate-700 px-4 py-2 rounded-lg"
      >
        <Link
          class="text-lg hover:underline hover:font-bold"
          :href="route('project.show', project.slug)"
          >{{ project.name }}</Link
        >

        <p v-if="project.description" class="text-gray-200 text-md">
          {{ project.code }}
        </p>
        <span class="text-gray-300 text-md self-end">{{
          project.created_at
        }}</span>
      </div>
    </section>
  </section>
</template>
