<script setup>
import { Link, useForm, usePage } from "@inertiajs/vue3";
import InputError from "@/Components/InputError.vue";
import Dropdown from "@/Components/Dropdown.vue";
import swal from "sweetalert";
import Loading from "@/Components/Loading.vue";
import { ref } from "vue";
import { useFetch } from "@/utils";

const properities = defineProps({
  post: Object,
});

const { component, props } = usePage();
const canLikePost = ref(properities.post.canLikePost);
const postLikes = ref(properities.post.likes);
const comments = ref(properities.post?.comments?.data ?? []);

let allComments = ref([]);
let page = ref(2);
let loading = ref(false);

({ data: allComments, loading } = useFetch(
  route("user.post", [properities.post.id]),
  page,
  comments
));

const handleLikePost = () => {
  canLikePost.value = !canLikePost.value;
  postLikes.value++;
}

const handleUnlikePost = () => {
  canLikePost.value = !canLikePost.value;
  postLikes.value--;
}

const handleLikeComment = (key) => {
  allComments.value[key].canLikeComment =
    !allComments.value[key].canLikeComment;
  allComments.value[key].likes++;
}

const handleUnlikeComment = (key) => {
  allComments.value[key].canLikeComment =
    !allComments.value[key].canLikeComment;
  allComments.value[key].likes--;
}

const commentForm = useForm({
  content: "",
});

const deletePostForm = useForm({
  component,
});

const deleteCommentForm = useForm({});

const submit = () => {
  commentForm.post(route("posts.comment", properities.post.id), {
    preserveScroll: true,
    onSuccess: () => {
      const mergedArray = [
        ...allComments.value,
        ...properities.post.comments.data,
      ];
      allComments.value = Array.from(new Set(mergedArray.map((obj) => obj.id)))
        .map((id) => mergedArray.find((obj) => obj.id === id))
        .sort((a, b) => b.id - a.id);
      commentForm.reset("content");
    },
  });
};

const emit = defineEmits(["deletePost"]);

function handleDeletePost() {
  // if (component == "User/Post") {
  //   console.log(true);
  // }
  swal({
    title: props.words.are_you_sure,
    text: props.words.once_deleted_post,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      deletePostForm.delete(route("user.posts.delete", properities.post.id), {
        preserveScroll: true,
        onSuccess: () => {
          swal(props.words.post_deleted, {
            icon: "success",
          });
          emit("deletePost", properities.post.id);
        },
        onError: (error) => {
          swal(props.words.something_went_wrong, error.message, "error");
        },
      });
    } else {
      swal(props.words.post_is_safe);
    }
  });
}

function handleDeleteComment(id) {
  swal({
    title: props.words.are_you_sure,
    text: props.words.once_deleted_comment,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      deleteCommentForm.delete(route("comments.delete", id), {
        preserveScroll: true,
        onSuccess: () => {
          swal(props.words.comment_deleted, {
            icon: "success",
          });
          allComments.value = allComments.value.filter(function (comment) {
            return comment.id != id;
          });
        },
        onError: (error) => {
          swal(props.words.something_went_wrong, error.message, "error");
        },
      });
    } else {
      swal(props.words.comment_is_safe);
    }
  });
}
</script>

<template>
  <main class="relative">
    <section class="flex gap-12 ml-2 py-2">
      <Link
        :href="route('user.profile', properities.post.username)"
        as="button"
        class="flex items-center gap-2 text-gray-300 font-bold hover:text-gray-50 text-lg hover:underline"
      >
        <img
          class="w-10 h-10 md:w-14 md:h-14 rounded-full"
          v-if="properities.post.authorPhoto"
          :src="properities.post.authorPhoto"
          :alt="$page.props.words.profile_photo"
        />
        {{ properities.post.author }}
      </Link>
    </section>
    <p class="ml-2 my-1">{{ properities.post.title }}</p>
    <div class="pl-6 my-2">
      {{ properities.post.content }}
      <div class="text-green-500 float-right pt-6 px-4">
        {{ properities.post.created_at }}
      </div>
    </div>
    <div class="clear-both"></div>
    <section class="flex justify-between items-center px-4">
      <Link
        :href="route('posts.likes', properities.post)"
        class="text-gray-300 hover:text-gray-50 text-lg hover:underline"
      >
        {{ postLikes }} {{ $page.props.words.likes }}</Link
      >
      <Link
        :href="route('user.post', properities.post)"
        class="text-gray-300 hover:text-gray-50 text-lg hover:underline"
      >
        {{ properities.post.commentsCount }}
        {{ $page.props.words.comments }}</Link
      >
    </section>
    <section class="grid place-items-center">
      <Link
        v-if="canLikePost"
        :preserve-scroll="true"
        :href="route('posts.likes.store', properities.post)"
        method="post"
        as="button"
        @click="handleLikePost"
        class="btn btn-success"
      >
        {{ $page.props.words.like }}</Link
      >
      <Link
        v-else
        :preserve-scroll="true"
        :href="route('posts.likes.delete', properities.post)"
        method="delete"
        as="button"
        @click="handleUnlikePost"
        class="btn btn-danger"
      >
        {{ $page.props.words.unlike }}</Link
      >
    </section>
    <form
      v-if="component === 'User/Post'"
      class="my-3"
      @submit.prevent="submit"
    >
      <div class="grid place-items-center">
        <textarea
          id="content"
          v-model="commentForm.content"
          required
          autofocus
          :placeholder="$page.props.words.comment"
          class="text-black rounded-lg py-2 px-4 my-2 w-3/4 h-24"
        ></textarea>
        <InputError
          class="my-2 px-4 py-2 bg-slate-100 rounded-lg"
          :message="commentForm.errors.content"
        />
        <button
          class="btn btn-primary"
          :class="{ 'opacity-25': commentForm.processing }"
          :disabled="commentForm.processing"
        >
          {{ $page.props.words.comment }}
        </button>
        <Transition
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
          class="transition ease-in-out"
        >
          <p
            v-if="commentForm.recentlySuccessful"
            class="text-sm my-1 text-white"
          >
            {{ $page.props.words.created }}
          </p>
        </Transition>
      </div>
    </form>
    <div v-if="properities.post.canUpdatePost" class="absolute right-4 top-2">
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
            @click="handleDeletePost()"
            class="block w-full text-red-400 hover:text-red-500 text-lg hover:underline px-4 py-2"
          >
            {{ $page.props.words.delete }}
          </button>
          <Link
            :href="route('user.posts.edit', properities.post.id)"
            as="button"
            class="block w-full text-green-500 hover:green-red-800 text-lg hover:underline px-4 py-2"
          >
            {{ $page.props.words.edit }}
          </Link>
        </template>
      </Dropdown>
    </div>
    <section
      v-if="allComments.length >= 1"
      class="bg-stone-800 py-2 rounded-lg"
    >
      <h2 class="text-lg indent-4">{{ $page.props.words.comments }}</h2>
      <section
        v-for="(comment, key) in allComments"
        :key="comment.id"
        class="flex flex-col gap-4 my-2 py-2 px-4 bg-zinc-900 rounded-lg relative"
        :id="comment.id"
      >
        <Link
          :href="route('user.profile', comment.authorUsername)"
          as="button"
          class="flex gap-2 items-center self-start text-gray-300 font-bold hover:text-gray-50 text-lg hover:underline"
        >
          <img
            class="w-10 h-10 md:w-14 md:h-14 rounded-full"
            v-if="comment.authorPhoto"
            :src="comment.authorPhoto"
            :alt="$page.props.words.profile_photo"
          />
          {{ comment.author }}</Link
        >
        <p class="indent-4">{{ comment.content }}</p>
        <div class="flex flex-col gap-6 px-4">
          <section class="flex justify-between py-3 border-t">
            <Link
              :href="route('comments.likes', comment)"
              class="text-gray-300 hover:text-gray-50 text-lg hover:underline"
            >
              {{ comment.likes }} {{ $page.props.words.likes }}</Link
            >
            <Link
              :href="route('comments.replies', comment)"
              class="text-green-300 hover:text-green-50 text-lg hover:underline"
            >
              {{ comment.repliesCount }} {{ $page.props.words.replies }}
            </Link>
            <Link
              v-if="comment.canLikeComment"
              :href="route('comments.likes.store', comment)"
              method="post"
              as="button"
              @click="handleLikeComment(key)"
              :preserve-scroll="true"
              class="btn btn-success"
              >{{ $page.props.words.like }}</Link
            >
            <Link
              v-if="!comment.canLikeComment"
              :href="route('comments.likes.delete', comment)"
              method="delete"
              as="button"
              @click="handleUnlikeComment(key)"
              :preserve-scroll="true"
              class="btn btn-danger"
              >{{ $page.props.words.unlike }}</Link
            >
          </section>
          <section
            v-if="comment.canUpdateComment"
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
                  @click="handleDeleteComment(comment.id)"
                  class="block w-full text-red-400 hover:text-red-500 text-lg hover:underline px-4 py-2"
                >
                  {{ $page.props.words.delete }}
                </button>
                <Link
                  :href="route('comments.edit', comment.id)"
                  as="button"
                  class="block w-full text-green-500 ml-auto hover:green-red-800 text-lg hover:underline"
                  >{{ $page.props.words.edit }}</Link
                >
              </template>
            </Dropdown>
          </section>
        </div>
      </section>
      <Loading v-if="loading" />
    </section>
  </main>
</template>
<style scoped>
:target {
  border: 2px solid palevioletred;
}
</style>
