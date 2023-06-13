<script setup>
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import { useForm } from "@inertiajs/vue3";
import { ref } from "vue";

const passwordInput = ref(null);
const currentPasswordInput = ref(null);

const form = useForm({
  current_password: "",
  password: "",
  password_confirmation: "",
});

const updatePassword = () => {
  form.put(route("password.update"), {
    preserveScroll: true,
    onSuccess: () => form.reset(),
    onError: () => {
      if (form.errors.password) {
        form.reset("password", "password_confirmation");
        passwordInput.value.focus();
      }
      if (form.errors.current_password) {
        form.reset("current_password");
        currentPasswordInput.value.focus();
      }
    },
  });
};
</script>

<template>
  <section>
    <header>
      <h2 class="text-lg font-medium text-gray-200">
        {{ $page.props.words.update_password }}
      </h2>

      <p class="mt-1 text-sm text-gray-100">
        {{
          $page.props.words
            .ensure_your_account_is_using_a_long_random_password_to_stay_secure
        }}
      </p>
    </header>

    <form @submit.prevent="updatePassword" class="mt-6 space-y-6">
      <div>
        <InputLabel
          for="current_password"
          :value="$page.props.words.current_password"
        />

        <TextInput
          id="current_password"
          ref="currentPasswordInput"
          v-model="form.current_password"
          type="password"
          class="mt-1 block w-full"
          autocomplete="current-password"
        />

        <InputError :message="form.errors.current_password" class="mt-2" />
      </div>

      <div>
        <InputLabel for="password" :value="$page.props.words.new_password" />

        <TextInput
          id="password"
          ref="passwordInput"
          v-model="form.password"
          type="password"
          class="mt-1 block w-full"
          autocomplete="new-password"
        />

        <InputError :message="form.errors.password" class="mt-2" />
      </div>

      <div>
        <InputLabel
          for="password_confirmation"
          :value="$page.props.words.confirm_password"
        />

        <TextInput
          id="password_confirmation"
          v-model="form.password_confirmation"
          type="password"
          class="mt-1 block w-full"
          autocomplete="new-password"
        />

        <InputError :message="form.errors.password_confirmation" class="mt-2" />
      </div>

      <div class="flex items-center gap-4">
        <button class="btn btn-success" :disabled="form.processing">
        {{$page.props.words.save}}
        </button>

        <Transition
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
          class="transition ease-in-out"
        >
          <p v-if="form.recentlySuccessful" class="text-sm text-gray-100">
            {{ $page.props.words.saved }}
          </p>
        </Transition>
      </div>
    </form>
  </section>
</template>
