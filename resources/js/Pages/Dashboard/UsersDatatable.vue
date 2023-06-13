<script setup>
import { ref, onMounted } from "vue";
import swal from "sweetalert";
import { useForm } from "@inertiajs/vue3";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import "datatables.net-select";
import "datatables.net-responsive";

DataTable.use(DataTablesCore);

let tableRef = ref(null);

let options = {
  serverSide: true,
  processing: true,
  ajax: {
    url: route("dashboard.users.data"),
    type: "GET",
  },
  columns: [
    { data: "id", title: "ID" },
    { data: "name", title: "Name" },
    { data: "username", title: "User Name" },
    { data: "email", title: "Email", visible: false },
    { data: "gender", title: "Gender" },
    { data: "type", title: "Type" },
    { data: "action", title: "Action" },
  ],

  order: [[0, "desc"]],
  buttons: ["colvis", "excel", "print"],
};

onMounted(() => {
  const el = tableRef.value.$el.querySelector("tbody");
  el.addEventListener("click", (event) => {
    if (event.target.matches(".delete-button")) {
      handleDelete(event.target.dataset.id);
    } else if (event.target.matches(".edit-button")) {
      handleEdit(event.target.dataset.id);
    }
  });
});

let form = useForm({
  id: 0,
});

function handleDelete(id) {
  new swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this User!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      form.delete(route("dashboard.users.delete", id), {
        preserveScroll: true,
        onSuccess: () => {
          new swal("User has been deleted!", {
            icon: "success",
          });
          tableRef.value.dt.ajax.reload();
        },
        onError: (error) => {
          new swal("Oops! Something went wrong.", error.message, "error");
        },
      });
    } else {
      new swal("User is safe!");
    }
  });
}

function handleEdit(id) {}
</script>

<template>
  <div class="overflow-x-auto">
    <div class="flex justify-center items-center gap-2 py-2 border my-2">
      <form :action="route('dashboard.users.excel')" method="GET">
        <button class="cursor-pointer">
          <img
            src="https://img.icons8.com/color/48/null/microsoft-excel-2019--v1.png"
            alt="Excel"
          />
        </button>
      </form>
    </div>
    <DataTable :options="options" ref="tableRef" class="display"></DataTable>
  </div>
</template>
<style>
@import "datatables.net-dt";
</style>
