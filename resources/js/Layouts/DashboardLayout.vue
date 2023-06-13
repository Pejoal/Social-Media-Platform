<script setup>
import { ref } from "vue";
import { Link } from "@inertiajs/vue3";
import Navigations from "@/Components/Navigations.vue";
import Locales from "@/Components/Locales.vue";
import Hamburger from "@/Components/Hamburger.vue";

const props = defineProps({
  joined_chat_groups: {
    type: Array,
    default: [],
  },
});

const showNav = ref(false);
const toggleNav = () => {
  showNav.value = !showNav.value;
};
</script>
<template>
  <div class="min-h-screen bg-white text-black">
    <header class="flex items-center justify-between h-20 bg-zinc-100 py-2 px-4 sm:px-6 lg:px-8">
        <Link class="text-zinc-900 font-bold text-xl" :href="route('home')">
          {{ $page.props.appName }}
        </Link>
        <!-- Translations -->
        <Locales :horizontal="true" />

        <!-- Navigation Links -->
        <Navigations :horizontal="true" :dark="true" />

        <img class="rounded-full w-14 h-14 md:w-16 md:h-16" v-if="$page.props.auth.user.profile_photo_url" :src="$page.props.auth.user.profile_photo_url" :alt="$page.props.words.profile_photo">

        <!-- Hamburger -->
        <Hamburger class="md:hidden" @close="toggleNav" :show="showNav" :dark="true" />
      <!-- Side Menu  -->
      <transition name="slide">
        <div
          v-if="showNav"
          class="md:hidden fixed inset-y-0 left-0 z-40 w-full h-screen bg-zinc-200 shadow-lg px-8 py-4 overflow-y-auto"
        >
          <h2 class="text-xl font-bold mb-2">
            {{ $page.props.words.navigation_bar }}
          </h2>
          <!-- Navigation Links -->
          <Navigations class="pb-4" :vertical="true" :dark="true" />

          <!-- Translations -->
          <Locales class="border-t" :vertical="true" />

          <div class="py-2 border-b">
            <Link
              class="bg-red-600 text-gray-200 hover:font-bold hover:text-white py-1 px-3 rounded-lg"
              :href="route('logout')"
              method="post"
              as="button"
            >
              {{ $page.props.words.log_out }}
            </Link>
          </div>
          <!-- Button to close the menu -->
          <button
            @click="showNav = false"
            class="mt-4 px-3 py-1 bg-zinc-900 text-white hover:font-bold rounded-md"
          >
            {{ $page.props.words.close }}
          </button>
        </div>
      </transition>
      <!-- Overlay to cover the content when the menu is open -->
      <div
        v-if="showNav"
        class="fixed inset-0 bg-black opacity-25 z-30"
        @click="showNav = false"
      ></div>
    </header>
    <main class="lg:container lg:mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 lg:gap-10">
        <div class="hidden md:block">
          <slot name="left-sidebar">
        
            <div class="py-2 border-t">
              <Link
                class="bg-red-600 text-gray-100 hover:text-white hover:font-bold py-1 px-3 rounded-lg"
                :href="route('logout')"
                method="post"
                as="button"
              >
                {{ $page.props.words.log_out }}
              </Link>
            </div>
          </slot>
        </div>
        <section class="md:col-span-2">
          <slot name="content" />
        </section>
        <div class="hidden">
          <slot name="right-sidebar" />
        </div>
      </div>
    </main>
  </div>
</template>
<style scoped>
/* Transition styles */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>
