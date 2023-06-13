<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import { useForm, Link, Head, usePage } from "@inertiajs/vue3";
import InputError from "@/Components/InputError.vue";
import TextInput from "@/Components/TextInput.vue";
import { ref } from "vue";
import Dropdown from "@/Components/Dropdown.vue";
import swal from "sweetalert";
import { useFetch } from "@/utils";
import Loading from "@/Components/Loading.vue";

const { component, props: properities } = usePage();

let props = defineProps({
  commentId: Number,
  commentContent: String,
  commentAuthor: String,
  commentorUsername: String,
  canUpdateComment: Boolean,
  replies: {
    type: Array,
    default: [],
  },
});

const contentInput = ref(null);

const form = useForm({
  content: "",
});

const page = ref(2);
const { data: allReplies, loading } = useFetch(
  route("comments.replies", props.commentId),
  page,
  props.replies
);

const storeReply = () => {
  form.post(route("comments.replies.store", props.commentId), {
    preserveScroll: true,
    onSuccess: () => {
      const mergedArray = [...props.replies, ...allReplies.value];
      allReplies.value = Array.from(new Set(mergedArray.map((obj) => obj.id)))
        .map((id) => mergedArray.find((obj) => obj.id === id));
      form.reset();
    },
    onError: () => {
      if (form.errors.content) {
        form.reset("content");
        contentInput.value.focus();
      }
    },
  });
};

const back = () => {
  window.history.back();
};

const deleteCommentForm = useForm({
  component,
});
const deleteReplyForm = useForm({});

function handleDeleteComment(id) {
  swal({
    title: properities.words.are_you_sure,
    text: properities.words.once_deleted_comment,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      deleteCommentForm.delete(route("comments.delete", id), {
        preserveScroll: true,
        onSuccess: () => {
          swal(properities.words.comment_deleted, {
            icon: "success",
          });
          form.reset("content");
        },
        onError: (error) => {
          swal(properities.words.something_went_wrong, error.message, "error");
        },
      });
    } else {
      swal(properities.words.comment_is_safe);
    }
  });
}

function handleDeleteReply(commentId, replyId) {
  swal({
    title: properities.words.are_you_sure,
    text: properities.words.once_deleted_reply,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      deleteReplyForm.delete(
        route("comments.replies.delete", [commentId, replyId]),
        {
          preserveScroll: true,
          onSuccess: () => {
            swal(properities.words.reply_deleted, {
              icon: "success",
            });
            allReplies.value = allReplies.value.filter(function (reply) {
              return reply.id != replyId;
            });
            form.reset("content");
          },
          onError: (error) => {
            swal(
              properities.words.something_went_wrong,
              error.message,
            );
          },
        }
      );
    } else {
      swal(properities.words.reply_is_safe);
    }
  });
}
</script>

<template>
  <Head :title="properities.words.replies" />

  <AuthLayout>
    <template #content>
      <section
        class="relative py-6 mb-4 rounded-lg bg-zinc-800 text-white"
        v-if="props.commentId"
      >
        <section v-if="props.canUpdateComment" class="absolute right-4 top-2">
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
              <button
                @click="handleDeleteComment(props.commentId)"
                class="block w-full text-red-400 hover:text-red-500 text-lg hover:underline px-4 py-2"
              >
                {{ $page.props.words.delete }}
              </button>
              <Link
                :href="route('comments.edit', props.commentId)"
                as="button"
                class="block w-full text-green-500 ml-auto hover:green-red-800 text-lg hover:underline"
                >{{ $page.props.words.edit }}</Link
              >
            </template>
          </Dropdown>
        </section>
        <Link
          :href="route('user.profile', props.commentorUsername)"
          as="button"
          class="text-gray-300 px-2 font-bold hover:text-gray-50 text-lg hover:underline"
        >
          {{ props.commentAuthor }}</Link
        >
        <p class="mt-3 px-4" v-html="props.commentContent"></p>
        <form
          @submit.prevent="storeReply"
          class="bg-zinc-700 mt-6 mx-2 space-y-6 p-2 rounded-lg"
        >
          <div>
            <TextInput
              id="content"
              ref="contentInput"
              v-model="form.content"
              :placeholder="$page.props.words.reply_content"
              type="text"
              class="mt-1 text-black block w-full"
            />

            <InputError
              class="my-2 px-4 py-2 bg-slate-100 rounded-lg"
              :message="form.errors.content"
            />
          </div>
          <div class="flex items-center gap-4">
            <button class="btn btn-primary" :disabled="form.processing">
              {{ $page.props.words.reply }}
            </button>
            <Transition
              enter-from-class="opacity-0"
              leave-to-class="opacity-0"
              class="transition ease-in-out"
            >
              <p v-if="form.recentlySuccessful" class="text-white text-sm my-1">
                {{ $page.props.words.replied }}
              </p>
            </Transition>
          </div>
        </form>
        <section
          v-if="allReplies.length >= 1"
          class="py-4 my-4 border border-zinc-700 rounded-lg bg-zinc-700 text-white"
        >
          <p class="px-2">{{ $page.props.words.the_replies }}:</p>
          <section class="py-3 px-1">
            <div
              v-for="reply in allReplies"
              :key="reply.id"
              class="my-2 p-2 rounded-lg relative bg-zinc-800"
            >
              <Link
                :href="route('user.profile', reply.author)"
                as="button"
                class="flex gap-2 items-center self-start text-gray-300 font-bold hover:text-gray-50 text-lg hover:underline"
              >
                <img
                  class="w-10 h-10 md:w-14 md:h-14 rounded-full"
                  v-if="reply.authorPhoto"
                  :src="reply.authorPhoto"
                  :alt="$page.props.words.profile_photo"
                />
                {{ reply.author }}
              </Link>
              <p class="indent-3 mt-4 pb-2 border-b">{{ reply.content }}</p>

              <div class="flex justify-between px-6 py-2 my-1">
                <Link
                  :href="
                    route('comments.replies.likes', [props.commentId, reply.id])
                  "
                  class="text-gray-300 hover:text-gray-50 text-lg hover:underline"
                >
                  {{ reply.likes }} {{ $page.props.words.likes }}
                </Link>
                <Link
                  v-if="reply.canLikeReply"
                  :preserve-scroll="true"
                  :href="
                    route('comments.replies.likes.store', [
                      props.commentId,
                      reply.id,
                    ])
                  "
                  method="post"
                  as="button"
                  class="btn btn-success"
                >
                  {{ $page.props.words.like }}</Link
                >
                <Link
                  v-if="!reply.canLikeReply"
                  :preserve-scroll="true"
                  :href="
                    route('comments.replies.likes.delete', [
                      props.commentId,
                      reply.id,
                    ])
                  "
                  method="delete"
                  as="button"
                  class="btn btn-danger"
                >
                  {{ $page.props.words.unlike }}</Link
                >
              </div>
              <section
                v-if="reply.canUpdateReply"
                class="absolute right-4 top-2"
              >
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
                    <button
                      @click="handleDeleteReply(props.commentId, reply.id)"
                      class="block w-full text-red-400 hover:text-red-500 text-lg hover:underline px-4 py-2"
                    >
                      {{ $page.props.words.delete }}
                    </button>
                    <Link
                      :href="
                        route('comments.replies.edit', [
                          props.commentId,
                          reply.id,
                        ])
                      "
                      as="button"
                      class="block w-full text-green-500 ml-auto hover:green-red-800 text-lg hover:underline"
                      >{{ $page.props.words.edit }}</Link
                    >
                  </template>
                </Dropdown>
              </section>
            </div>
            <Loading v-if="loading" />
          </section>
          <button class="ml-6 btn btn-warning" @click="back">
            {{ $page.props.words.back }}
          </button>
        </section>
      </section>
    </template>
  </AuthLayout>
</template>
