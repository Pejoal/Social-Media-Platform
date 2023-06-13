<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  statusId: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["handleTaskAdded", "closeAddTaskForm"]);

const state = ref({
  newTask: {
    title: "",
    description: "",
    status_id: null,
  },
  errorMessage: "",
});

function handleAddNewTask() {
  // Basic validation so we don't send an empty task to the server
  if (!state.value.newTask.title) {
    state.value.errorMessage = "The title field is required";
    return;
  }

  // Send new task to server
  axios
    .post(route('task.store', props.statusId), state.value.newTask)
    .then((res) => {
      // Tell the parent component we've added a new task and include it
      // emit("task-added", res.data);
      emit("handleTaskAdded", res.data);
      state.value.newTask.title = '';
      state.value.newTask.description = '';
    })
    .catch((err) => {
      // Handle the error returned from our request
      handleErrors(err);
    });
}

function handleErrors(err) {
  if (err.response && err.response.status === 422) {
    // We have a validation error
    const errorBag = err.response.data.errors;
    if (errorBag?.title) {
      state.value.errorMessage = errorBag.title[0];
    } else if (errorBag?.description) {
      state.value.errorMessage = errorBag.description[0];
    } else {
      state.value.errorMessage = err.response?.message;
    }
  } else {
    // We have bigger problems
    console.log(err);
  }
}

// On mount, set the status id of the new task
onMounted(() => {
  state.value.newTask.status_id = props.statusId;
});
</script>

<template>
  <form
    class="relative mb-3 flex flex-col justify-between bg-white rounded-md shadow overflow-hidden"
    @submit.prevent="handleAddNewTask"
  >
    <div class="p-3 flex-1">
      <input
        class="block text-black w-full px-2 py-1 text-lg border-b border-blue-800 rounded"
        type="text"
        placeholder="Enter a title"
        v-model.trim="state.newTask.title"
      />
      <textarea
        class="mt-3 block text-black w-full p-1 border text-sm rounded"
        rows="2"
        placeholder="Add a description (optional)"
        v-model.trim="state.newTask.description"
      ></textarea>
      <div v-show="state.errorMessage">
        <span class="text-xs text-red-500">
          {{ state.errorMessage }}
        </span>
      </div>
    </div>
    <div class="p-3 flex justify-between items-end text-sm bg-gray-100">
      <button
        @click="$emit('closeAddTaskForm')"
        type="reset"
        class="py-1 leading-5 text-gray-600 hover:text-gray-700"
      >
        {{ $page.props.words.cancel }}
      </button>
      <button
        type="submit"
        class="px-3 py-1 leading-5 text-white bg-orange-600 hover:bg-orange-500 rounded"
      >
        {{ $page.props.words.add }}
      </button>
    </div>
  </form>
</template>
