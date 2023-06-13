<script setup>
import { Link, usePage } from "@inertiajs/vue3";
const user = usePage().props.auth.user;

const props = defineProps({
  horizontal: {
    tpye: Boolean,
    default: false,
  },
  vertical: {
    tpye: Boolean,
    default: false,
  },
  dark: {
    tpye: Boolean,
    default: false,
  },
});
</script>
<template>
  <nav
    :class="{
      'hidden md:flex items-center justify-center gap-2': props.horizontal,
      'flex flex-col space-y-2 px-4': props.vertical,
    }"
  >
    <Link
      :href="route('home')"
      class="text-gray-100 hover:text-white hover:font-bold"
      :class="{
        'text-zinc-700 hover:text-zinc-800': props.dark,
        'underline text-white font-bold':
          route().current('home') || route().current('home'),
      }"
    >
      {{ $page.props.words.home }}
    </Link>
    <Link
      :href="route('public.chat.index')"
      class="text-gray-100 hover:text-white hover:font-bold"
      :class="{
        'text-zinc-700 hover:text-zinc-800': props.dark,
        'underline text-white font-bold': route().current('public.chat.index'),
      }"
    >
      {{ $page.props.words.public_chat }}
    </Link>
    <Link
      :href="route('rooms.index')"
      class="text-gray-100 hover:text-white hover:font-bold"
      :class="{
        'text-zinc-700 hover:text-zinc-800': props.dark,
        'underline text-white font-bold': route().current('rooms.*'),
      }"
    >
      {{ $page.props.words.rooms }}
    </Link>
    <Link
      :href="route('project.index')"
      class="text-gray-100 hover:text-white hover:font-bold"
      :class="{
        'text-zinc-700 hover:text-zinc-800': props.dark,
        'underline text-white font-bold': route().current('project.*'),
      }"
    >
      {{ $page.props.words.projects }}
    </Link>
    <Link
      v-if="user.type == 'super admin'"
      :href="route('dashboard.index')"
      class="text-gray-100 hover:text-white hover:font-bold"
      :class="{
        'text-zinc-700 hover:text-zinc-800': props.dark,
        'underline text-white font-bold': route().current('dashboard.index'),
      }"
    >
      {{ $page.props.words.dashboard }}
    </Link>

    <!-- Navigations For Small Pages -->
    <!-- <template> -->
    <Link
      :href="route('profile.edit')"
      class="text-gray-100 hover:text-white hover:font-bold"
      :class="{
        'text-zinc-700 hover:text-zinc-800': props.dark,
        'underline text-white font-bold': route().current('profile.edit'),
      }"
    >
      {{ $page.props.words.settings }}
    </Link>
    <Link
      :href="route('user.profile.me')"
      class="text-gray-100 hover:text-white hover:font-bold"
      :class="{
        'text-zinc-700 hover:text-zinc-800': props.dark,
        'underline text-white font-bold': route().current('user.profile.me'),
      }"
    >
      {{ $page.props.words.my_profile }}
    </Link>
    <Link
      :href="route('chat.groups.index')"
      class="md:hidden text-gray-100 hover:text-white hover:font-bold"
      :class="{
        'text-zinc-700 hover:text-zinc-800': props.dark,
        'underline text-white font-bold': route().current('chat.groups.index'),
      }"
    >
      {{ $page.props.words.chat_groups }}
    </Link>
    <!-- </template> -->
  </nav>
</template>
