<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import { Head } from "@inertiajs/vue3";
import ChatGroups from "@/Components/ChatGroups.vue";

const props = defineProps({
  joined_chat_groups: {
    type: Array,
    default: [],
  },
});
</script>

<template>
  <Head :title="$page.props.words.chat_groups" />
  <AuthLayout>
    <template #content>
      <ChatGroups :joined_chat_groups="joined_chat_groups" />
    </template>
  </AuthLayout>
</template>
