<script setup>
import CenteralLayout from "@/Layouts/CenteralLayout.vue";
import { Head, useForm } from "@inertiajs/vue3";
import { watch } from "vue";
const props = defineProps({
  tenants: {
    type: Array,
    default: [],
  },
});
const form = useForm({
  id: "",
  domain: "",
  adminName: "",
  adminEmail: "",
  password: "",
  seed: false,
});
watch(form, (newForm) => {
  form.domain = newForm.id + ".localhost";
});
function createTenant() {
  form.post(route("centeral.tenant.store"), {
    preserveScroll: true,
    onSuccess: () => {
      form.reset()
    },
  });
}
</script>

<template>
  <Head title="Dashboard" />

  <CenteralLayout>
    <section class="conatiner mx-auto">
      <form @submit.prevent="createTenant" class="block w-full px-4">
        <div class="flex w-full my-2">
          <label for="id" class="text-white w-36">ID:</label>
          <input
            name="id"
            v-model="form.id"
            id="id"
            placeholder="id"
            class="rounded-md px-4 py-2 w-96"
          />
        </div>
        <div class="flex w-full my-2">
          <label for="domain" class="text-white w-36">Domain:</label>
          <input
            name="domain"
            v-model="form.domain"
            id="domain"
            placeholder="domain"
            class="rounded-md px-4 py-2 w-96"
          />
        </div>
        <div class="flex w-full my-2">
          <label for="adminEmail" class="text-white w-36">Admin Name:</label>
          <input
            name="adminName"
            v-model="form.adminName"
            id="adminName"
            placeholder="adminName"
            class="rounded-md px-4 py-2 w-96"
          />
        </div>
        <div class="flex w-full my-2">
          <label for="adminEmail" class="text-white w-36">Admin Email:</label>
          <input
            name="adminEmail"
            v-model="form.adminEmail"
            id="adminEmail"
            placeholder="adminEmail"
            class="rounded-md px-4 py-2 w-96"
          />
        </div>
        <div class="flex w-full my-2">
          <label for="password" class="text-white w-36">password:</label>
          <input
            name="password"
            type="password"
            v-model="form.password"
            id="password"
            placeholder="password"
            class="rounded-md px-4 py-2 w-96"
          />
        </div>
        <div class="flex w-full my-2">
          <label for="seed" class="text-white w-36">Seed:</label>
          <input
            name="seed"
            type="checkbox"
            v-model="form.seed"
            id="seed"
          />
        </div>
        <button
          type="submit"
          class="bg-green-600 rounded-lg text-white px-4 py-2"
        >
          Create
        </button>
      </form>
    </section>

    <section class="flex flex-col items-center justify-center p-2 text-white">
      <section class="flex gap-[40vw] border-b p-4">
        <th>ID</th>
        <th>Domain</th>
      </section>
      <section
        v-for="tenant in props.tenants"
        :key="tenant.id"
        class="flex gap-[40vw] border-b p-2"
      >
        <td class="px-2">{{ tenant.id }}</td>
        <td class="px-2 text-blue-500">
          <a :href="'http://' + tenant.domains[0]['domain']">{{
            tenant.domains[0]["domain"]
          }}</a>
        </td>
      </section>
    </section>
  </CenteralLayout>
</template>
