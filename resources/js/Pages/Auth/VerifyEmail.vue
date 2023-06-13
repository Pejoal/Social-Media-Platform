<script setup>
import { computed } from "vue";
import GuestLayout from "@/Layouts/GuestLayout.vue";
import { Head, Link, useForm } from "@inertiajs/vue3";

const props = defineProps({
  status: String,
});

const form = useForm({});

const submit = () => {
  form.post(route("verification.send"));
};

const verificationLinkSent = computed(
  () => props.status === "verification-link-sent"
);
</script>

<template>
  <GuestLayout>
    <Head title="Email Verification" />

    <div class="my-2 text-gray-200">
      Thanks for signing up! Before getting started, could you verify your email
      address by clicking on the link we just emailed to you? If you didn't
      receive the email, we will gladly send you another.
    </div>

    <div
      class="my-2 font-medium text-sm text-green-700"
      v-if="verificationLinkSent"
    >
      A new verification link has been sent to the email address you provided
      during registration.
    </div>

    <form @submit.prevent="submit">
      <div class="mt-4 flex items-center justify-between">
        <button
          class="btn btn-primary"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Resend Verification Email
        </button>

        <Link
          :href="route('logout')"
          method="post"
          as="button"
          class="underline ml-3 text-gray-200 hover:text-white bg-red-600 px-2 py-1 rounded-md"
          >Log Out</Link
        >
      </div>
    </form>
  </GuestLayout>
</template>
