<script setup>
import ResuableModal from "./ResuableModal.vue";
import { useForm, usePage } from "@inertiajs/vue3";
import InputError from "@/Components/InputError.vue";
import { ref } from "vue";

const contentInput = ref(null);
const { props: properities } = usePage();

const form = useForm({
  content: "",
});

const emit = defineEmits(["setPosts"]);

const storePost = () => {
  form.post(route("posts.store"), {
    preserveScroll: true,
    onSuccess: () => {
      showModal.value = false;
      emit("setPosts");
      form.reset();
    },
    onError: () => {
      if (form.errors.content) {
        contentInput.value.focus();
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
    {{ $page.props.words.create_post }}
  </button>

  <Teleport to="body">
    <ResuableModal :show="showModal" @close="showModal = false">
      <template #content>
        <form
          @submit.prevent="storePost"
          class="block w-full bg-gray-900 px-4 py-2 rounded-lg"
        >
          <textarea
            id="content"
            ref="contentInput"
            v-model="form.content"
            type="text"
            class="my-2 block w-full min-h-[35vh] text-black rounded-lg"
            :placeholder="properities.words.type_your_post_here"
          >
          </textarea>
          <InputError
            :message="form.errors.content"
            class="my-2 bg-white rounded-md px-2 py-1"
          />
          <button class="btn btn-primary" :disabled="form.processing">
            {{ properities.words.post }}</button
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
