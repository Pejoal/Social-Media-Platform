<script setup>
import Dropdown from "@/Components/Dropdown.vue";

const props = defineProps({
  horizontal: {
    tpye: Boolean,
    default: false,
  },
  vertical: {
    tpye: Boolean,
    default: false,
  },
});
</script>
<template>
  <div
    :class="{
      'hidden md:flex items-center space-x-2 relative': props.horizontal,
      'py-2 my-2 border-b flex justify-between items-center': props.vertical,
    }"
  >
    <p>{{ $page.props.words.choose_locale }}</p>
    <Dropdown width="48">
      <template #trigger>
        <span class="inline-flex rounded-md">
          <button
            type="button"
            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
          >
            <svg
              class="ml-2 -mr-0.5 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </span>
      </template>

      <template #content>
        <a
          v-for="locale in $page.props.locales"
          class="flex justify-between p-2 text-gray-900 hover:text-white bg-white hover:bg-zinc-900"
          :key="locale.code"
          :href="locale.url"
          :lang="locale.code"
        >
          <span>{{ locale.native }}</span>
          <span>{{ locale.emoji }}</span>
        </a>
      </template>
    </Dropdown>
  </div>
</template>
