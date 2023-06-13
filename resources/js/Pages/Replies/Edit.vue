<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import { Head, Link, useForm, usePage } from "@inertiajs/vue3";
import InputError from "@/Components/InputError.vue";
import TextInput from "@/Components/TextInput.vue";

const { props: properities } = usePage();

const props = defineProps({
  reply: Object,
});

const form = useForm({
  content: props.reply.content,
});

const updateReply = () => {
  form.patch(
    route("comments.replies.update", [props.reply.comment_id, props.reply.id]),
    {
      preserveScroll: true,
      onSuccess: () => form.reset(),
      onError: () => {
        if (form.errors.content) {
          form.reset("content");
          contentInput.value.focus();
        }
      },
    }
  );
};
</script>

<template>
  <Head :title="properities.words.edit_reply" />

  <AuthLayout>
    <template #content>
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <section v-if="reply" class="bg-zinc-800 text-white rounded-lg p-3">
          <h2 class="font-semibold text-white mb-3 leading-tight">
            {{ $page.props.words.the_reply }}
          </h2>
          <form @submit.prevent="updateReply" class="space-y-6 p-2">
            <div>
              <textarea
                id="content"
                type="text"
                class="block w-full rounded-md h-32 mt-1 text-black"
                v-model="form.content"
              >
              </textarea>
            </div>
            <div class="flex items-center gap-4">
              <button class="btn btn-success" :disabled="form.processing">
              {{ $page.props.words.update }}
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
