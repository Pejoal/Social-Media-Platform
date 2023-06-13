<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import { Head, useForm, usePage } from "@inertiajs/vue3";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import { ref } from "vue";

const { props: properities } = usePage();

const props = defineProps({
  comment: Object,
});

const form = useForm({
  content: props.comment.content,
});

let contentInput = ref(null);

const updateComment = () => {
  form.patch(route("comments.update", props.comment.id), {
    preserveScroll: true,
    onSuccess: () => form.reset(),
    onError: () => {
      if (form.errors.content) {
        form.reset("content");
        contentInput.value.focus();
      }
    },
  });
};
</script>

<template>
  <Head :title="properities.words.comments" />

  <AuthLayout>
    <template #content>
      <div>
        <section
          v-if="comment"
          class="bg-zinc-800 text-white rounded-lg p-3 mb-2"
        >
          <form @submit.prevent="updateComment" class="mt-6 space-y-6 p-2">
            <div>
              <InputLabel class="text-white" for="content" value="Comment" />
              <textarea
                id="content"
                type="text"
                class="block w-full rounded-md h-32 mt-1 text-black"
                v-model="form.content"
                :ref="contentInput"
              >
              </textarea>
              <div class="text-lime-500">{{ comment.created_at }}</div>
              <InputError :message="form.errors.content" class="mt-2" />
            </div>

            <div class="btn btn-success">
              <button :disabled="form.processing">
                {{$page.props.words.update}}
              </button>
              <Transition
                enter-from-class="opacity-0"
                leave-to-class="opacity-0"
                class="transition ease-in-out"
              >
                <p v-if="form.recentlySuccessful" class="text-sm text-gray-600">
                  {{ $page.props.words.updated }}
                </p>
              </Transition>
            </div>
          </form>
        </section>
      </div>
    </template>
  </AuthLayout>
</template>
