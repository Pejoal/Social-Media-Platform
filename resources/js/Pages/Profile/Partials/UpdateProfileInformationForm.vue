<script setup>
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import { Link, useForm, usePage } from "@inertiajs/vue3";

const props = defineProps({
  mustVerifyEmail: Boolean,
  status: String,
});

const user = usePage().props.auth.user;

const form = useForm({
  firstname: user.firstname,
  lastname: user.lastname,
  username: user.username,
  gender: user.gender,
  email: user.email,
});
</script>

<template>
  <section>
    <header>
      <h2 class="text-lg font-medium text-white">
        {{ $page.props.words.profile_information }}
      </h2>

      <p class="mt-1 text-sm text-slate-200">
        {{
          $page.props.words
            .update_your_account_profile_information_and_email_address
        }}
      </p>
    </header>

    <form
      @submit.prevent="form.patch(route('profile.update'))"
      class="mt-6 space-y-6"
    >
      <div>
        <InputLabel for="firstname" :value="$page.props.words.firstname" />

        <TextInput
          id="firstname"
          type="text"
          class="mt-1 block w-full"
          v-model="form.firstname"
          required
          autofocus
          autocomplete="firstname"
        />

        <InputError class="mt-2" :message="form.errors.firstname" />
      </div>

      <div>
        <InputLabel for="lastname" :value="$page.props.words.lastname" />

        <TextInput
          id="lastname"
          type="text"
          class="mt-1 block w-full"
          v-model="form.lastname"
          required
          autofocus
          autocomplete="lastname"
        />

        <InputError class="mt-2" :message="form.errors.lastname" />
      </div>

      <div>
        <InputLabel for="username" :value="$page.props.words.username" />

        <TextInput
          id="username"
          type="text"
          class="mt-1 block w-full"
          v-model="form.username"
          required
          autofocus
          autocomplete="username"
        />

        <InputError class="mt-2" :message="form.errors.username" />
      </div>

      <div>
        <InputLabel :value="$page.props.words.gender" />
        <div class="flex justify-center gap-12">
          <section>
            <input type="radio" id="male" value="male" v-model="form.gender" />
            <label class="ml-2" for="male">{{ $page.props.words.male }}</label>
          </section>
          <section>
            <input
              type="radio"
              id="female"
              value="female"
              v-model="form.gender"
            />
            <label class="ml-2" for="female">{{
              $page.props.words.female
            }}</label>
          </section>
        </div>
        <InputError class="mt-2" :message="form.errors.gender" />
      </div>

      <div>
        <InputLabel for="email" :value="$page.props.words.email" />

        <TextInput
          id="email"
          type="email"
          class="mt-1 block w-full"
          v-model="form.email"
          required
          autocomplete="email"
        />

        <InputError class="mt-2" :message="form.errors.email" />
      </div>

      <div v-if="props.mustVerifyEmail && user.email_verified_at === null">
        <p class="text-sm mt-2 text-gray-50">
          {{ $page.props.words.your_email_address_is_unverified }}
          <Link
            :href="route('verification.send')"
            method="post"
            as="button"
            class="underline text-sm text-gray-200 hover:text-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {{ $page.props.words.click_here_to_re_send_the_verification_email }}
          </Link>
        </p>

        <div
          v-show="props.status === 'verification-link-sent'"
          class="mt-2 font-medium text-sm text-green-600"
        >
          {{
            $page.props.words
              .a_new_verification_link_has_been_sent_to_your_email_address
          }}
        </div>
      </div>

      <div class="flex items-center gap-4">
        <button class="btn btn-success" :disabled="form.processing">
          {{ $page.props.words.save }}
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
