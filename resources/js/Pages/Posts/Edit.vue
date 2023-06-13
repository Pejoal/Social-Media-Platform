<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import { ref } from "vue";
import { Head, Link, useForm, usePage } from "@inertiajs/vue3";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";

const { props: properities } = usePage();

const props = defineProps({
  post: Object,
});

const form = useForm({
  content: props.post.content,
});

let contentInput = ref(null);

const updatePost = () => {
  form.patch(route("user.posts.update", props.post.id), {
    preserveScroll: true,
    onSuccess: () => form.reset(),
    onError: () => {
      if (form.errors.content) {
        contentInput.value.focus();
      }
    },
  });
};
</script>

<template>
  <Head :title="properities.words.edit_post" />

  <AuthLayout>
    <template #content>
      <section v-if="post" class="bg-zinc-800 text-white rounded-lg">
        <div class="flex flex-col gap-1 mb-4 p-2 rounded-lg">
          <div class="font-bold">
            {{ $page.props.words.author }}: {{ post.author }}
          </div>
          <form @submit.prevent="updatePost" class="mt-6 space-y-6 p-2">
            <div>
              <InputLabel class="text-white" for="content" value="Post" />
              <textarea
                id="content"
                type="text"
                class="block w-full rounded-md h-32 mt-1 text-black"
                v-model="form.content"
                :ref="contentInput"
              >
              </textarea>
              <InputError :message="form.errors.content" class="mt-2" />
              <div class="text-lime-500">{{ post.created_at }}</div>
            </div>
            <div class="flex items-center gap-4">
              <button
                :disabled="form.processing"
                class="btn btn-success"
                >{{ $page.props.words.update }}</button
              >
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
        </div>
      </section>
    </template>
  </AuthLayout>
</template>
