<script setup>
import DangerButton from "@/Components/DangerButton.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import Modal from "@/Components/Modal.vue";
import TextInput from "@/Components/TextInput.vue";
import { useForm } from "@inertiajs/vue3";
import { nextTick, ref } from "vue";

const confirmingUserDeletion = ref(false);
const passwordInput = ref(null);

const form = useForm({
  password: "",
});

const confirmUserDeletion = () => {
  confirmingUserDeletion.value = true;

  nextTick(() => passwordInput.value.focus());
};

const deleteUser = () => {
  form.delete(route("profile.destroy"), {
    preserveScroll: true,
    onSuccess: () => closeModal(),
    onError: () => passwordInput.value.focus(),
    onFinish: () => form.reset(),
  });
};

const closeModal = () => {
  confirmingUserDeletion.value = false;

  form.reset();
};
</script>

<template>
  <section class="space-y-6">
    <header>
      <h2 class="text-lg font-medium text-gray-200">
        {{ $page.props.words.delete_account }}
      </h2>

      <p class="mt-1 text-sm text-gray-300">
        {{
          $page.props.words
            .once_your_account_is_deleted_all_of_its_resources_and_data_will_be_permanently_deleted_before_deleting_your_account_please_download_any_data_or_information_that_you_wish_to_retain
        }}
      </p>
    </header>

    <DangerButton @click="confirmUserDeletion">{{
      $page.props.words.delete_account
    }}</DangerButton>

    <Modal :show="confirmingUserDeletion" @close="closeModal">
      <div class="p-6 bg-zinc-800">
        <h2 class="text-lg font-medium text-gray-50">
          {{ $page.props.words.are_you_sure_you_want_to_delete_your_account }}
        </h2>

        <p class="mt-1 text-sm text-gray-200">
          {{
            $page.props.words
              .once_your_account_is_deleted_all_of_its_resources_and_data_will_be_permanently_deleted_please_enter_your_password_to_confirm_you_would_like_to_permanently_delete_your_account
          }}
        </p>

        <div class="mt-6">
          <InputLabel
            for="password"
            :value="$page.props.words.password"
            class="sr-only"
          />

          <TextInput
            id="password"
            ref="passwordInput"
            v-model="form.password"
            type="password"
            class="mt-1 block w-3/4"
            placeholder="Password"
            @keyup.enter="deleteUser"
          />

          <InputError :message="form.errors.password" class="mt-2" />
        </div>

        <div class="mt-6 flex justify-end">
          <button class="btn btn-secondary" @click="closeModal">
            {{ $page.props.words.cancel }}
          </button>

          <DangerButton
            class="ml-3"
            :class="{ 'opacity-25': form.processing }"
            :disabled="form.processing"
            @click="deleteUser"
          >
            {{ $page.props.words.delete_account }}
          </DangerButton>
        </div>
      </div>
    </Modal>
  </section>
</template>
