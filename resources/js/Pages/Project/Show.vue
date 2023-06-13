<script setup>
import AddTaskForm from "@/Components/AddTaskForm.vue";
import AuthLayout from "@/Layouts/AuthLayout.vue";
import { Head, useForm } from "@inertiajs/vue3";
import { ref } from "vue";
import Draggable from "vuedraggable";

const props = defineProps({
  project: {
    type: Object,
    default: {
      name: "",
    },
  },
  statuses: {
    type: Array,
    default: [],
  },
});

// const statuses = ref(props.statuses);
const newTaskForStatus = ref(0);

const handleTaskAdded = (newTask) => {
  // Find the index of the status where we should add the task
  const statusIndex = props.statuses.findIndex(
    (status) => status.id === newTask.status_id
  );

  // Add newly created task to our statuse
  props.statuses[statusIndex].tasks.push(newTask);

  // Reset and close the AddTaskForm
  closeAddTaskForm();
};

const closeAddTaskForm = () => {
  newTaskForStatus.value = 0;
};

const openAddTaskForm = (statusId) => {
  newTaskForStatus.value = statusId;
};

const taskMoved = () => {
  // props.statuses.forEach((status) => {
  //   status.tasks.forEach((task, index) => {
  //     task.status_id = status.id;
  //     task.order = index + 1;
  //   })
  // });
  axios.put(route("task.sync"), {
    statuses: props.statuses,
  });
};

const statusMoved = () => {
  axios.put(route("status.sync"), {
    statuses: props.statuses,
  });
};

const nameInput = ref(null);
const statusForm = useForm({
  name: "",
});

const createStatus = () => {
  statusForm.post(route("status.store", props.project.slug), {
    onFinish: () => {
      statusForm.name = '';
    },
  });
};
</script>

<template>
  <Head :title="props.project.name" />

  <AuthLayout>
    <template #content>
      <form
        @submit.prevent="createStatus"
        class="bg-gray-900 px-4 py-2 rounded-lg"
      >
        <section class="flex justify-between px-2">
          <input
            ref="nameInput"
            v-model="statusForm.name"
            type="text"
            class="text-black rounded-lg"
            :placeholder="$page.props.words.type_status_name_here"
          />

          <button
            type="submit"
            class="btn btn-primary"
            :disabled="statusForm.processing"
          >
            {{ $page.props.words.create_status }}
          </button>
        </section>
        <p v-if="statusForm.errors.name" class="error">
          {{ statusForm.errors.name }}
        </p>
        <Transition
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
          class="transition ease-in-out"
        >
          <p v-if="statusForm.recentlySuccessful" class="p-4 text-gray-100">
            {{ $page.props.words.created }}
          </p>
        </Transition>
      </form>
      <div class="relative p-2 flex overflow-x-auto h-full">
        <!-- statuses (Statuses) -->
        <Draggable
          v-if="statuses"
          :list="statuses"
          group="statuses"
          itemKey="id"
          class="flex flex-1 flex-shrink-0"
          @change="statusMoved"
        >
          <template #item="{ element, index }">
            <div class="flex-1 mx-2 rounded-md shadow-md overflow-hidden">
              <div class="p-3 flex justify-between items-baseline bg-blue-800">
                <h4 class="font-medium text-white">
                  {{ element.name }}
                </h4>
                <button
                  class="py-1 px-2 text-sm text-orange-500 hover:underline"
                  @click="openAddTaskForm(element.id)"
                >
                  {{ $page.props.words.add_task }}
                </button>
              </div>
              <div
                class="p-2 flex-1 flex flex-col h-full overflow-x-hidden overflow-y-auto bg-blue-100"
              >
                <AddTaskForm
                  v-if="newTaskForStatus === element.id"
                  :statusId="element.id"
                  v-on:handleTaskAdded="handleTaskAdded"
                  v-on:closeAddTaskForm="closeAddTaskForm"
                />
                <Draggable
                  :list="element.tasks"
                  group="tasks"
                  itemKey="id"
                  @change="taskMoved"
                >
                  <template #item="{ element, index }">
                    <div class="bg-slate-300 p-2 my-2 cursor-pointer">
                      <p class="block mb-2 text-xl text-gray-900">
                        {{ element.title }}
                      </p>
                      <span class="text-gray-700 truncate">
                        {{ element.description }}
                      </span>
                    </div>
                  </template>
                </Draggable>
                <div
                  v-show="!element.tasks && newTaskForStatus !== element.id"
                  class="flex-1 p-4 flex flex-col items-center justify-center"
                >
                  <span class="text-gray-600">{{
                    $page.props.words.no_tasks_yet
                  }}</span>
                  <button
                    class="mt-1 text-sm text-orange-600 hover:underline"
                    @click="openAddTaskForm(element.id)"
                  >
                    {{ $page.props.words.add_task }}
                  </button>
                </div>
              </div>
            </div>
          </template>
        </Draggable>
        <!-- ./statuses -->
      </div>
    </template>
  </AuthLayout>
</template>
