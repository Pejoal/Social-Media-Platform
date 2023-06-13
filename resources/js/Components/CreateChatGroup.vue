<script setup>
import ResuableModal from "./ResuableModal.vue";
import { useForm, usePage } from "@inertiajs/vue3";
import TextInput from "@/Components/TextInput.vue";
import InputError from "@/Components/InputError.vue";
import { ref } from "vue";

const nameInput = ref(null);
const { props: properities } = usePage();

const form = useForm({
  name: "",
});

const storeGroup = () => {
  form.post(route("chat.groups.store"), {
    preserveScroll: true,
    onSuccess: () => {
      showModal.value = false;
      form.reset();
    },
    onError: () => {
      if (form.errors.name) {
        nameInput.value.focus();
      }
    },
  });
};
let showModal = ref(false);
</script>
<template>
  <button
    class="px-2 py-1 text-white hover:font-bold hover:underline"
    @click="showModal = true"
  >
    {{ $page.props.words.create_chat_group }}
  </button>

  <Teleport to="body">
    <ResuableModal :show="showModal" @close="showModal = false">
      <template #content>
        <form
          @submit.prevent="storeGroup"
          class="grid place-items-center w-full h-[20vh] bg-gray-900 px-4 py-2 rounded-lg"
        >
          <TextInput
            id="name"
            ref="nameInput"
            v-model="form.name"
            type="text"
            class="my-2 block w-3/4 text-black rounded-lg"
            :placeholder="properities.words.type_your_group_name_here"
          />
          <InputError
            :message="form.errors.name"
            class="my-2 bg-white rounded-md px-2 py-1"
          />
          <button class="btn btn-primary" :disabled="form.processing">
            {{ properities.words.create_chat_group }}</button
          >
          <Transition
            enter-from-class="opacity-0"
            leave-to-class="opacity-0"
            class="transition ease-in-out"
          >
            <p v-if="form.recentlySuccessful" class="text-sm text-gray-600">
              {{ $page.props.words.created }}
            </p>
          </Transition>
        </form>
      </template>
    </ResuableModal>
  </Teleport>
</template>
