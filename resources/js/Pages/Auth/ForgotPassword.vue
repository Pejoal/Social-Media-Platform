<script setup>
import GuestLayout from "@/Layouts/GuestLayout.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import { Head, useForm } from "@inertiajs/vue3";

defineProps({
  status: String,
});

const form = useForm({
  input_type: "",
});

const submit = () => {
  form.post(route("password.email"));
};
</script>

<template>
  <GuestLayout>
    <Head title="Forgot Password" />

    <div class="mb-4 text-sm text-gray-600">
      Forgot your password? No problem. Just let us know your email address and
      we will email you a password reset link that will allow you to choose a
      new one.
    </div>

    <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
      {{ status }}
    </div>

    <form @submit.prevent="submit">
      <div>
        <InputLabel for="input_type" value="Email / Username" />

        <TextInput
          id="input_type"
          type="text"
          class="mt-1 block w-full"
          v-model="form.input_type"
          required
          autofocus
          autocomplete="username"
        />

        <InputError class="mt-2" :message="form.errors.username" />
        <InputError class="mt-2" :message="form.errors.email" />
      </div>

      <div class="flex items-center justify-end mt-4">
        <button 
          class = "btn btn-success"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Email Password Reset Link
        </button>
      </div>
    </form>
  </GuestLayout>
</template>
