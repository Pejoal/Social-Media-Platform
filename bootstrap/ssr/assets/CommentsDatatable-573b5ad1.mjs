import { ref, onMounted, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import swal from "sweetalert";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import "datatables.net-select";
import "datatables.net-responsive";
import { useForm } from "@inertiajs/vue3";
const CommentsDatatable_vue_vue_type_style_index_0_lang = "";
const _sfc_main = {
  __name: "CommentsDatatable",
  __ssrInlineRender: true,
  setup(__props) {
    DataTable.use(DataTablesCore);
    let tableRef = ref(null);
    let options = {
      serverSide: true,
      processing: true,
      ajax: {
        url: route("dashboard.comments.data"),
        type: "GET"
      },
      columns: [
        { data: "id", title: "ID" },
        { data: "content", title: "Content" },
        { data: "author", title: "Author" },
        { data: "action", title: "Action" }
      ],
      order: [[0, "desc"]],
      buttons: ["colvis", "excel", "print"]
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
      id: 0
    });
    function handleDelete(id) {
      new swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this Comment!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then((willDelete) => {
        if (willDelete) {
          form.delete(route("dashboard.comments.delete", id), {
            preserveScroll: true,
            onSuccess: () => {
              new swal("Comment has been deleted!", {
                icon: "success"
              });
              tableRef.value.dt.ajax.reload();
            },
            onError: (error) => {
              new swal("Oops! Something went wrong.", error.message, "error");
            }
          });
        } else {
          new swal("Comment is safe!");
        }
      });
    }
    function handleEdit(id) {
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "overflow-x-auto" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(DataTable), {
        options: unref(options),
        ref_key: "tableRef",
        ref: tableRef,
        class: "display"
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard/CommentsDatatable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
