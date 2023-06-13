<script setup>
import { ref } from "vue";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import Dropdown from "@/Components/Dropdown.vue";
import DropdownLink from "@/Components/DropdownLink.vue";
import NavLink from "@/Components/NavLink.vue";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink.vue";
import { Link, usePage } from "@inertiajs/vue3";

const showingNavigationDropdown = ref(false);
const user = usePage().props.auth.user;
</script>

<template>
  <div>
    <div class="min-h-screen bg-gray-100">
      <nav class="bg-white border-b border-gray-100">
        <!-- Primary Navigation Menu -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex">
              <!-- Logo -->
              <div class="shrink-0 flex items-center">
                <Link :href="route('home')">
                  <ApplicationLogo
                    class="block h-9 w-auto fill-current text-gray-800"
                  />
                </Link>
              </div>

              <!-- Navigation Links -->
              <div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                <NavLink
                  :href="route('home')"
                  :active="
                    route().current('home') || route().current('')
                  "
                >
                  {{ $page.props.words.home }}
                </NavLink>
                <NavLink
                  :href="route('public.chat.index')"
                  :active="route().current('public.chat.index')"
                >
                  {{ $page.props.words.public_chat }}
                </NavLink>
                <NavLink
                  :href="route('rooms.index')"
                  :active="route().current('rooms.*')"
                >
                  {{ $page.props.words.rooms }}
                </NavLink>
                <NavLink
                  v-if="user.type == 'super admin'"
                  :href="route('dashboard.index')"
                  :active="route().current('dashboard.index')"
                >
                  {{ $page.props.words.dashboard }}
                </NavLink>
              </div>
            </div>

            <div class="relative">
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
                    class="flex justify-between px-2 py-2 hover:bg-gray-900 hover:text-white transition"
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

            <div class="hidden sm:flex sm:items-center sm:ml-6">
              <!-- Settings Dropdown -->
              <div class="ml-3 relative">
                <Dropdown align="right" width="48">
                  <template #trigger>
                    <span class="inline-flex rounded-md">
                      <button
                        type="button"
                        class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                      >
                        {{ $page.props.auth.user.name }}

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
                    <DropdownLink :href="route('profile.edit')">
                      {{ $page.props.words.profile }}
                    </DropdownLink>
                    <DropdownLink
                      :href="route('logout')"
                      method="post"
                      as="button"
                    >
                      {{ $page.props.words.log_out }}
                    </DropdownLink>
                  </template>
                </Dropdown>
              </div>
            </div>

            <!-- Hamburger -->
            <div class="-mr-2 flex items-center sm:hidden">
              <button
                @click="showingNavigationDropdown = !showingNavigationDropdown"
                class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
              >
                <svg
                  class="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    :class="{
                      hidden: showingNavigationDropdown,
                      'inline-flex': !showingNavigationDropdown,
                    }"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    :class="{
                      hidden: !showingNavigationDropdown,
                      'inline-flex': showingNavigationDropdown,
                    }"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Responsive Navigation Menu -->
        <div
          :class="{
            block: showingNavigationDropdown,
            hidden: !showingNavigationDropdown,
          }"
          class="sm:hidden"
        >
          <div class="flex px-2">
            <ResponsiveNavLink
              :href="route('home')"
              :active="
                route().current('home')
              "
            >
              {{ $page.props.words.home }}
            </ResponsiveNavLink>
            <ResponsiveNavLink
              :href="route('public.chat.index')"
              :active="route().current('public.chat.index')"
            >
              {{ $page.props.words.public_chat }}
            </ResponsiveNavLink>
            <ResponsiveNavLink
              :href="route('rooms.index')"
              :active="route().current('rooms.*')"
            >
              {{ $page.props.words.rooms }}
            </ResponsiveNavLink>
            <ResponsiveNavLink
              v-if="user.type == 'super admin'"
              :href="route('dashboard.index')"
              :active="route().current('dashboard.index')"
            >
              {{ $page.props.words.dashboard }}
            </ResponsiveNavLink>
          </div>

          <!-- <div class="border-y py-2">
            <h3 class="text-center">{{ $page.props.words.choose_locale }}</h3>
            <div class="flex items-center justify-center flex-wrap gap-3 py-2 px-3 border-y">
              <a
                v-for="locale in $page.props.locales"
                :key="locale.code"
                :href="locale.url"
                :lang="locale.code"
                :class="{
                  'border-l-2 px-2 border-indigo-400 text-base font-bold text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out':
                    locale.code == $page.props.active_locale_code,
                }"
              >
                {{ locale.native }}
                {{ locale.emoji }}
              </a>
            </div>
          </div> -->

          <!-- Responsive Settings Options -->
          <div class="pt-4 pb-1 border-t border-gray-200">
            <div class="px-4">
              <div class="font-medium text-base text-gray-800">
                {{ $page.props.auth.user.name }}
              </div>
              <div class="font-medium text-sm text-gray-500">
                {{ $page.props.auth.user.email }}
              </div>
            </div>

            <div class="mt-3 space-y-1">
              <ResponsiveNavLink :href="route('profile.edit')">
                {{ $page.props.words.profile }}
              </ResponsiveNavLink>
              <ResponsiveNavLink
                :href="route('logout')"
                method="post"
                as="button"
              >
                {{ $page.props.words.log_out }}
              </ResponsiveNavLink>
            </div>
          </div>
        </div>
      </nav>

      <!-- Page Heading -->
      <header class="bg-white shadow" v-if="$slots.header">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <slot name="header" />
        </div>
      </header>

      <!-- Page Content -->
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>
