<script setup>
import { ref, onMounted } from "vue";
import swal from 'sweetalert';
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import "datatables.net-select";
import "datatables.net-responsive";
import { useForm } from "@inertiajs/vue3";

DataTable.use(DataTablesCore);

let tableRef = ref(null);

let options = {
  serverSide: true,
  processing: true,
  ajax: {
    url: route('dashboard.public.messages.data'),
    type: "GET",
  },
  columns: [
    { data: "id", title: "ID" },
    { data: "content", title: "Content" },
    { data: "author", title: "Author" },
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
    text: "Once deleted, you will not be able to recover this Public Message!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      form.delete(route("dashboard.public.messages.delete", id), {
        preserveScroll: true,
        onSuccess: () => {
          new swal("Public Message has been deleted!", {
            icon: "success",
          });
          tableRef.value.dt.ajax.reload();
        },
        onError: (error) => {
          new swal("Oops! Something went wrong.", error.message, "error");
        },
      });
    } else {
      new swal("Public Message is safe!");
    }
  });
}

function handleEdit(id) {}
</script>

<template>
  <div class="overflow-x-auto">
    <DataTable :options="options" ref="tableRef" class="display"></DataTable>
  </div>
</template>
<style>
@import "datatables.net-dt";
</style>
