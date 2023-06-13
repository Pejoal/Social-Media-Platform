<script setup>
import { ref, onMounted } from "vue";
import swal from "sweetalert";
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
    url: route("dashboard.posts.data"),
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

const form = useForm({
  id: 0,
});

function handleDelete(id) {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this Post!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      form.delete(route("dashboard.posts.delete", id), {
        preserveScroll: true,
        onSuccess: () => {
          new swal("Post has been deleted!", {
            icon: "success",
          });
          tableRef.value.dt.ajax.reload();
        },
        onError: (error) => {
          new swal("Oops! Something went wrong.", error.message, "error");
        },
      });
    } else {
      swal("Post is safe!");
    }
  });
}

const handleEdit = (id) => {};

const importExcelForm = useForm({
  posts_excel: null,
});

const importExcel = () => {
  importExcelForm.post(route("dashboard.posts.excel.import"), {
    preserveScroll: true,
    onFinish: () => importExcelForm.reset(),
  });
};
</script>

<template>
  <div class="overflow-x-auto">
    <div class="flex justify-center items-center gap-2 py-2 border my-2">
      <form @submit.prevent="importExcel">
        <input
          id="posts_excel"
          type="file"
          @input="importExcelForm.posts_excel = $event.target.files[0]"
        />
        <button type="submit" class="btn btn-primary">Import</button>
      </form>

      <form :action="route('dashboard.posts.excel.export')" method="GET">
        <button>
          <img
            class="cursor-pointer"
            src="https://img.icons8.com/color/48/null/microsoft-excel-2019--v1.png"
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
