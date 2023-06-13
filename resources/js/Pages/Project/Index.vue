<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import { Head, Link } from "@inertiajs/vue3";
import { ref } from "vue";

let props = defineProps({
  projects: {
    type: Array,
    default: [],
  },
});

let selectedProject = ref("");
</script>

<template>
  <Head :title="$page.props.words.projects" />

  <AuthLayout>
    <template #content>
      <div class="bg-zinc-800 rounded-lg text-white">
        <div class="overflow-hidden shadow-sm sm:rounded-lg">
          <div class="container mx-auto">
            <section class="flex flex-col py-2 px-4 my-2 mx-4">
              <label for="project" class="block font-medium"
                >{{ $page.props.words.projects }}:</label
              >
              <select
                id="project"
                v-model="selectedProject"
                class="block w-full text-black mt-1 rounded-md shadow-sm border-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="" disabled>
                  {{ $page.props.words.please_select }}
                </option>
                <option
                  v-for="project in props.projects"
                  :id="project.id"
                  :value="project.slug"
                  class="bg-zinc-800 hover:bg-zinc-800 text-gray-100 hover:text-white"
                >
                  {{ project.code }} - {{ project.name }}
                </option>
              </select>
              <Link
                class="btn btn-primary w-36 h-10 mx-auto my-2"
                :href="route('project.show', selectedProject)"
              >
                {{ $page.props.words.show_project }}
              </Link>
            </section>
          </div>
        </div>
      </div>
    </template>
  </AuthLayout>
</template>
