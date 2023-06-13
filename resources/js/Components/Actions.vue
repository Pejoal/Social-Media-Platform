<script setup>
import CreatePostForm from "@/Components/CreatePostForm.vue";
import CreateChatGroup from "@/Components/CreateChatGroup.vue";
import CreateProject from "@/Components/CreateProject.vue";

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
  <section>
    <h2 class="text-lg my-2 font-bold">{{ $page.props.words.actions }}</h2>
    <section
      class="flex"
      :class="{
        '': props.horizontal,
        'flex-col': props.vertical,
      }"
    >
      <CreatePostForm v-on:setPosts="$emit('setPosts')" />
      <CreateChatGroup />
      <CreateProject />
    </section>
  </section>
</template>
