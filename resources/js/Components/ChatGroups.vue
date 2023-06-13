<script setup>
import { Link } from "@inertiajs/vue3";

const props = defineProps({
  joined_chat_groups: {
    type: Array,
    default: [],
  },
});
</script>

<template>
  <section>
    <h2 class="text-lg font-bold px-4 py-2">{{ $page.props.words.chat_groups }}</h2>
    <section v-if="props.joined_chat_groups" class="flex flex-col gap-2 p-2 bg-zinc-800 rounded-lg">
      <h3 class="text-md">{{$page.props.words.joined_chat_groups}}</h3>
      <div
        v-for="chat_group in props.joined_chat_groups"
        :key="chat_group.id"
        class="flex flex-col bg-slate-700 px-4 py-2 rounded-lg"
      >
        <Link
          class="text-lg hover:underline hover:font-bold"
          :href="route('chat.groups.view', chat_group.id)"
          >{{ chat_group.name }}</Link
        >

        <p v-if="chat_group.description" class="text-gray-200 text-md">
          {{ chat_group.description }}
        </p>
        <span class="text-gray-300 text-md self-end">{{
          chat_group.created_at
        }}</span>
      </div>
    </section>
    <section v-if="props.all_chat_groups" class="flex flex-col gap-2 p-2 bg-zinc-800 rounded-lg">
      <h3 class="text-md">{{$page.props.words.all_chat_groups}}</h3>
      <div
        v-for="chat_group in props.all_chat_groups"
        :key="chat_group.id"
        class="flex flex-col bg-slate-700 px-4 py-2 rounded-lg"
      >
        <Link
          class="text-lg hover:underline hover:font-bold"
          :href="route('chat.groups.view', chat_group.id)"
          >{{ chat_group.name }}</Link
        >

        <p v-if="chat_group.description" class="text-gray-200 text-md">
          {{ chat_group.description }}
        </p>
        <span class="text-gray-300 text-md self-end">{{
          chat_group.created_at
        }}</span>
      </div>
    </section>
  </section>
</template>
