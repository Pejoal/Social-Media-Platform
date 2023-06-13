<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import { Head, usePage } from "@inertiajs/vue3";
import { ref } from "vue";

const { props: properities } = usePage();

let props = defineProps({
  rooms: {
    type: Array,
    default: [],
  },
});

let selectedRoom = ref("");
</script>

<template>
  <Head :title="properities.words.rooms" />

  <AuthLayout>
    <template #content>
        <div class="bg-zinc-800 rounded-lg text-white">
          <div class="overflow-hidden shadow-sm sm:rounded-lg">
            <div class="container mx-auto">
              <form
                :action="route('rooms.room', selectedRoom)"
                class="flex flex-col py-2 px-4 my-2 mx-4"
                method="GET"
              >
                <label for="room" class="block font-medium"
                  >{{ $page.props.words.rooms }}:</label
                >
                <select
                  name="room"
                  id="room"
                  v-model="selectedRoom"
                  class="block w-full text-black mt-1 rounded-md shadow-sm border-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="" disabled>
                    {{ $page.props.words.please_select }}
                  </option>
                  <option
                    v-for="room in props.rooms"
                    :id="room.id"
                    :value="room.slug"
                    class="bg-zinc-800 hover:bg-zinc-800 text-gray-100 hover:text-white "
                  >
                    {{ room.title }}
                  </option>
                </select>
                <button
                  type="submit"
                  class="inline-block bg-indigo-500 hover:bg-indigo-700 text-white font-bold my-4 py-2 px-4 rounded-md self-center justify-center"
                >
                  {{ $page.props.words.join_room }}
                </button>
              </form>
            </div>
          </div>
      </div>
    </template>
  </AuthLayout>
</template>
