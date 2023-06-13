<script setup>
import AuthLayout from "@/Layouts/AuthLayout.vue";
import Switcher from "@/Components/Switcher.vue";
import DeleteUserForm from "./Partials/DeleteUserForm.vue";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm.vue";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm.vue";
import { Head, useForm } from "@inertiajs/vue3";

defineProps({
  mustVerifyEmail: Boolean,
  status: String,
});

const form = useForm({
  profile_photo: null,
});

function uploadProfilePhoto() {
  form.post(route("profile.photo.update"), {
    preserveScroll: true,
  });
}

const enableNotifications = (event) => {
  console.log(event.target.checked);
}

</script>

<template>
  <Head :title="$page.props.words.profile" />

  <AuthLayout>
    <template #content>
      <div class="bg-zinc-800 py-2">
        <div class="p-4 sm:p-8 shadow sm:rounded-lg">
          <UpdateProfileInformationForm
            :must-verify-email="mustVerifyEmail"
            :status="status"
            class="max-w-xl"
          />
        </div>

        <div class="p-4 sm:p-8 shadow sm:rounded-lg">
          <UpdatePasswordForm class="max-w-xl text-white" />
        </div>

        <form
          class="p-4 sm:p-8 shadow sm:rounded-lg"
          @submit.prevent="uploadProfilePhoto"
        >
          <section class="flex justify-between flex-col sm:flex-row">
            <div class="my-2">
              <label class="pr-2" for="profile_photo">
                {{ $page.props.words.profile_photo }}
              </label>
              <input
                id="profile_photo"
                type="file"
                @input="form.profile_photo = $event.target.files[0]"
              />
            </div>
            <button
              class="btn btn-success"
              type="submit"
              :disabled="form.processing"
            >
              {{ $page.props.words.upload }}
            </button>
          </section>
          <p
            v-if="form.errors.profile_photo"
            class="text-sm bg-red-600 text-white rounded-md my-1 px-2 py-1"
          >
            {{ form.errors.profile_photo }}
          </p>
          <progress
            v-if="form.progress"
            :value="form.progress.percentage"
            max="100"
          >
            {{ form.progress.percentage }}%
          </progress>
          <Transition
            enter-from-class="opacity-0"
            leave-to-class="opacity-0"
            class="transition ease-in-out"
          >
            <p v-if="form.recentlySuccessful" class="text-sm text-gray-100">
              {{ $page.props.words.uploaded }}
            </p>
          </Transition>
        </form>

        <form class="p-4 sm:p-8 shadow sm:rounded-lg" @submit.prevent="enableNotifications()">
          <section class="flex justify-between">
            <label for="enable-notifications">Enable Notifications</label>
            <Switcher id="enable-notifications" @change="(e) => enableNotifications(e)" name="notifications" />
          </section>
        </form>

        <div class="p-4 sm:p-8 shadow sm:rounded-lg">
          <DeleteUserForm class="max-w-xl text-white" />
        </div>
      </div>
    </template>
  </AuthLayout>
</template>
