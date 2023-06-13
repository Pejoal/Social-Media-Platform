<script setup>
import ResuableModal from "./ResuableModal.vue";
import { useForm, usePage } from "@inertiajs/vue3";
import TextInput from "@/Components/TextInput.vue";
import { ref } from "vue";

const nameInput = ref(null);
const codeInput = ref(null);
const { props: properities } = usePage();

const form = useForm({
  name: "",
  code: "",
});

const storeProject = () => {
  form.post(route("project.store"), {
    preserveScroll: true,
    onSuccess: () => {
      showModal.value = false;
      form.reset();
    },
    onError: () => {
      if (form.errors.name) {
        nameInput.value.focus();
      } else if (form.errors.code) {
        codeInput.value.focus();
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
    {{ $page.props.words.create_project }}
  </button>

  <Teleport to="body">
    <ResuableModal :show="showModal" @close="showModal = false">
      <template #content>
        <form
          @submit.prevent="storeProject"
          class="grid place-items-center w-full h-[35vh] bg-gray-900 px-4 py-2 rounded-lg"
        >
          <TextInput
            ref="nameInput"
            v-model="form.name"
            type="text"
            class="my-2 block w-3/4 text-black rounded-lg"
            :placeholder="properities.words.type_your_project_name_here"
          />

          <p v-if="form.errors.name" class="error">{{ form.errors.name }}</p>

          <TextInput
            ref="codeInput"
            v-model="form.code"
            type="text"
            class="my-2 block w-3/4 text-black rounded-lg"
            :placeholder="properities.words.type_your_project_code_here"
          />
          <p v-if="form.errors.code" class="error">{{ form.errors.code }}</p>
          <button class="btn btn-primary" :disabled="form.processing">
            {{ properities.words.create_project }}
          </button>
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
