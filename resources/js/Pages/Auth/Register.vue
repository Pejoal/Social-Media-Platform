<script setup>
import GuestLayout from "@/Layouts/GuestLayout.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import { Head, Link, useForm } from "@inertiajs/vue3";

const form = useForm({
  firstname: "",
  lastname: "",
  username: "",
  gender: "",
  email: "",
  password: "",
  password_confirmation: "",
  profile_photo: null,
  // terms: false,
});

const submit = () => {
  form.post(route("register"), {
    preserveScroll: true,
    onFinish: () => form.reset("password", "password_confirmation"),
  });
};
</script>

<template>
  <GuestLayout>
    <Head title="Register" />

    <form
      @submit.prevent="submit"
      class="bg-zinc-800 w-full mt-2 mb-4 rounded-lg md:container px-8 py-4 flex flex-col gap-2"
    >
      <div>
        <InputLabel for="firstname" :value="$page.props.words.firstname" />

        <TextInput
          id="firstname"
          type="text"
          class="mt-1 block w-full"
          v-model="form.firstname"
          :placeholder="$page.props.words.firstname"
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
          :placeholder="$page.props.words.lastname"
          required
          autofocus
          autocomplete="lastname"
        />

        <InputError class="mt-2" :message="form.errors.lastname" />
      </div>
      <div>
        <InputLabel for="username" :value="$page.props.words.user_name" />

        <TextInput
          id="username"
          type="text"
          class="mt-1 block w-full"
          v-model="form.username"
          :placeholder="$page.props.words.user_name"
          required
          autofocus
          autocomplete="username"
        />

        <InputError class="mt-2" :message="form.errors.username" />
      </div>
      <div>
        <InputLabel value="Gender" />
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

      <div class="mt-4">
        <InputLabel for="email" :value="$page.props.words.email" />

        <TextInput
          id="email"
          type="email"
          class="mt-1 block w-full"
          v-model="form.email"
          :placeholder="$page.props.words.email"
          required
          autocomplete="username"
        />

        <InputError class="mt-2" :message="form.errors.email" />
      </div>

      <div class="mt-4">
        <InputLabel for="password" :value="$page.props.words.password" />

        <TextInput
          id="password"
          type="password"
          class="mt-1 block w-full"
          v-model="form.password"
          :placeholder="$page.props.words.password"
          required
          autocomplete="new-password"
        />

        <InputError class="mt-2" :message="form.errors.password" />
      </div>

      <div class="mt-4">
        <InputLabel
          for="password_confirmation"
          :value="$page.props.words.confirm_password"
        />

        <TextInput
          id="password_confirmation"
          type="password"
          class="mt-1 block w-full"
          v-model="form.password_confirmation"
          :placeholder="$page.props.words.confirm_password"
          required
          autocomplete="new-password"
        />

        <InputError class="mt-2" :message="form.errors.password_confirmation" />
      </div>

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

      <div class="flex items-center justify-end mt-2">
        <Link
          :href="route('login')"
          class="underline text-sm text-gray-200 hover:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {{ $page.props.words.already_registered }}
        </Link>

        <button
          class="ml-4 btn btn-primary"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          {{ $page.props.words.register }}
        </button>
      </div>
    </form>
  </GuestLayout>
</template>
