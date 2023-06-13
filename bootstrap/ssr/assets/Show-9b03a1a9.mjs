import { ref, onMounted, mergeProps, useSSRContext, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, withDirectives, vShow, withModifiers, vModelText, Transition } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderStyle, ssrRenderComponent, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { A as AuthLayout } from "./AuthLayout-a31bd95f.mjs";
import { useForm, Head } from "@inertiajs/vue3";
import Draggable from "vuedraggable";
import "./Hamburger-c1553109.mjs";
import "./Dropdown-d2a4ee41.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./TextInput-66ab7a8d.mjs";
const _sfc_main$1 = {
  __name: "AddTaskForm",
  __ssrInlineRender: true,
  props: {
    statusId: {
      type: Number,
      default: 0
    }
  },
  emits: ["handleTaskAdded", "closeAddTaskForm"],
  setup(__props, { emit }) {
    const props = __props;
    const state = ref({
      newTask: {
        title: "",
        description: "",
        status_id: null
      },
      errorMessage: ""
    });
    onMounted(() => {
      state.value.newTask.status_id = props.statusId;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "relative mb-3 flex flex-col justify-between bg-white rounded-md shadow overflow-hidden" }, _attrs))}><div class="p-3 flex-1"><input class="block text-black w-full px-2 py-1 text-lg border-b border-blue-800 rounded" type="text" placeholder="Enter a title"${ssrRenderAttr("value", state.value.newTask.title)}><textarea class="mt-3 block text-black w-full p-1 border text-sm rounded" rows="2" placeholder="Add a description (optional)">${ssrInterpolate(state.value.newTask.description)}</textarea><div style="${ssrRenderStyle(state.value.errorMessage ? null : { display: "none" })}"><span class="text-xs text-red-500">${ssrInterpolate(state.value.errorMessage)}</span></div></div><div class="p-3 flex justify-between items-end text-sm bg-gray-100"><button type="reset" class="py-1 leading-5 text-gray-600 hover:text-gray-700">${ssrInterpolate(_ctx.$page.props.words.cancel)}</button><button type="submit" class="px-3 py-1 leading-5 text-white bg-orange-600 hover:bg-orange-500 rounded">${ssrInterpolate(_ctx.$page.props.words.add)}</button></div></form>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AddTaskForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    project: {
      type: Object,
      default: {
        name: ""
      }
    },
    statuses: {
      type: Array,
      default: []
    }
  },
  setup(__props) {
    const props = __props;
    const newTaskForStatus = ref(0);
    const handleTaskAdded = (newTask) => {
      const statusIndex = props.statuses.findIndex(
        (status) => status.id === newTask.status_id
      );
      props.statuses[statusIndex].tasks.push(newTask);
      closeAddTaskForm();
    };
    const closeAddTaskForm = () => {
      newTaskForStatus.value = 0;
    };
    const openAddTaskForm = (statusId) => {
      newTaskForStatus.value = statusId;
    };
    const taskMoved = () => {
      axios.put(route("task.sync"), {
        statuses: props.statuses
      });
    };
    const statusMoved = () => {
      axios.put(route("status.sync"), {
        statuses: props.statuses
      });
    };
    const nameInput = ref(null);
    const statusForm = useForm({
      name: ""
    });
    const createStatus = () => {
      statusForm.post(route("status.store", props.project.slug), {
        onFinish: () => {
          statusForm.name = "";
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: props.project.name
      }, null, _parent));
      _push(ssrRenderComponent(AuthLayout, null, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="bg-gray-900 px-4 py-2 rounded-lg"${_scopeId}><section class="flex justify-between px-2"${_scopeId}><input${ssrRenderAttr("value", unref(statusForm).name)} type="text" class="text-black rounded-lg"${ssrRenderAttr("placeholder", _ctx.$page.props.words.type_status_name_here)}${_scopeId}><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(unref(statusForm).processing) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.create_status)}</button></section>`);
            if (unref(statusForm).errors.name) {
              _push2(`<p class="error"${_scopeId}>${ssrInterpolate(unref(statusForm).errors.name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(statusForm).recentlySuccessful) {
              _push2(`<p class="p-4 text-gray-100"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.created)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</form><div class="relative p-2 flex overflow-x-auto h-full"${_scopeId}>`);
            if (__props.statuses) {
              _push2(ssrRenderComponent(unref(Draggable), {
                list: __props.statuses,
                group: "statuses",
                itemKey: "id",
                class: "flex flex-1 flex-shrink-0",
                onChange: statusMoved
              }, {
                item: withCtx(({ element, index }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex-1 mx-2 rounded-md shadow-md overflow-hidden"${_scopeId2}><div class="p-3 flex justify-between items-baseline bg-blue-800"${_scopeId2}><h4 class="font-medium text-white"${_scopeId2}>${ssrInterpolate(element.name)}</h4><button class="py-1 px-2 text-sm text-orange-500 hover:underline"${_scopeId2}>${ssrInterpolate(_ctx.$page.props.words.add_task)}</button></div><div class="p-2 flex-1 flex flex-col h-full overflow-x-hidden overflow-y-auto bg-blue-100"${_scopeId2}>`);
                    if (newTaskForStatus.value === element.id) {
                      _push3(ssrRenderComponent(_sfc_main$1, {
                        statusId: element.id,
                        onHandleTaskAdded: handleTaskAdded,
                        onCloseAddTaskForm: closeAddTaskForm
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(ssrRenderComponent(unref(Draggable), {
                      list: element.tasks,
                      group: "tasks",
                      itemKey: "id",
                      onChange: taskMoved
                    }, {
                      item: withCtx(({ element: element2, index: index2 }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="bg-slate-300 p-2 my-2 cursor-pointer"${_scopeId3}><p class="block mb-2 text-xl text-gray-900"${_scopeId3}>${ssrInterpolate(element2.title)}</p><span class="text-gray-700 truncate"${_scopeId3}>${ssrInterpolate(element2.description)}</span></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "bg-slate-300 p-2 my-2 cursor-pointer" }, [
                              createVNode("p", { class: "block mb-2 text-xl text-gray-900" }, toDisplayString(element2.title), 1),
                              createVNode("span", { class: "text-gray-700 truncate" }, toDisplayString(element2.description), 1)
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`<div style="${ssrRenderStyle(!element.tasks && newTaskForStatus.value !== element.id ? null : { display: "none" })}" class="flex-1 p-4 flex flex-col items-center justify-center"${_scopeId2}><span class="text-gray-600"${_scopeId2}>${ssrInterpolate(_ctx.$page.props.words.no_tasks_yet)}</span><button class="mt-1 text-sm text-orange-600 hover:underline"${_scopeId2}>${ssrInterpolate(_ctx.$page.props.words.add_task)}</button></div></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex-1 mx-2 rounded-md shadow-md overflow-hidden" }, [
                        createVNode("div", { class: "p-3 flex justify-between items-baseline bg-blue-800" }, [
                          createVNode("h4", { class: "font-medium text-white" }, toDisplayString(element.name), 1),
                          createVNode("button", {
                            class: "py-1 px-2 text-sm text-orange-500 hover:underline",
                            onClick: ($event) => openAddTaskForm(element.id)
                          }, toDisplayString(_ctx.$page.props.words.add_task), 9, ["onClick"])
                        ]),
                        createVNode("div", { class: "p-2 flex-1 flex flex-col h-full overflow-x-hidden overflow-y-auto bg-blue-100" }, [
                          newTaskForStatus.value === element.id ? (openBlock(), createBlock(_sfc_main$1, {
                            key: 0,
                            statusId: element.id,
                            onHandleTaskAdded: handleTaskAdded,
                            onCloseAddTaskForm: closeAddTaskForm
                          }, null, 8, ["statusId"])) : createCommentVNode("", true),
                          createVNode(unref(Draggable), {
                            list: element.tasks,
                            group: "tasks",
                            itemKey: "id",
                            onChange: taskMoved
                          }, {
                            item: withCtx(({ element: element2, index: index2 }) => [
                              createVNode("div", { class: "bg-slate-300 p-2 my-2 cursor-pointer" }, [
                                createVNode("p", { class: "block mb-2 text-xl text-gray-900" }, toDisplayString(element2.title), 1),
                                createVNode("span", { class: "text-gray-700 truncate" }, toDisplayString(element2.description), 1)
                              ])
                            ]),
                            _: 2
                          }, 1032, ["list"]),
                          withDirectives(createVNode("div", { class: "flex-1 p-4 flex flex-col items-center justify-center" }, [
                            createVNode("span", { class: "text-gray-600" }, toDisplayString(_ctx.$page.props.words.no_tasks_yet), 1),
                            createVNode("button", {
                              class: "mt-1 text-sm text-orange-600 hover:underline",
                              onClick: ($event) => openAddTaskForm(element.id)
                            }, toDisplayString(_ctx.$page.props.words.add_task), 9, ["onClick"])
                          ], 512), [
                            [vShow, !element.tasks && newTaskForStatus.value !== element.id]
                          ])
                        ])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("form", {
                onSubmit: withModifiers(createStatus, ["prevent"]),
                class: "bg-gray-900 px-4 py-2 rounded-lg"
              }, [
                createVNode("section", { class: "flex justify-between px-2" }, [
                  withDirectives(createVNode("input", {
                    ref_key: "nameInput",
                    ref: nameInput,
                    "onUpdate:modelValue": ($event) => unref(statusForm).name = $event,
                    type: "text",
                    class: "text-black rounded-lg",
                    placeholder: _ctx.$page.props.words.type_status_name_here
                  }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                    [vModelText, unref(statusForm).name]
                  ]),
                  createVNode("button", {
                    type: "submit",
                    class: "btn btn-primary",
                    disabled: unref(statusForm).processing
                  }, toDisplayString(_ctx.$page.props.words.create_status), 9, ["disabled"])
                ]),
                unref(statusForm).errors.name ? (openBlock(), createBlock("p", {
                  key: 0,
                  class: "error"
                }, toDisplayString(unref(statusForm).errors.name), 1)) : createCommentVNode("", true),
                createVNode(Transition, {
                  "enter-from-class": "opacity-0",
                  "leave-to-class": "opacity-0",
                  class: "transition ease-in-out"
                }, {
                  default: withCtx(() => [
                    unref(statusForm).recentlySuccessful ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "p-4 text-gray-100"
                    }, toDisplayString(_ctx.$page.props.words.created), 1)) : createCommentVNode("", true)
                  ]),
                  _: 1
                })
              ], 40, ["onSubmit"]),
              createVNode("div", { class: "relative p-2 flex overflow-x-auto h-full" }, [
                __props.statuses ? (openBlock(), createBlock(unref(Draggable), {
                  key: 0,
                  list: __props.statuses,
                  group: "statuses",
                  itemKey: "id",
                  class: "flex flex-1 flex-shrink-0",
                  onChange: statusMoved
                }, {
                  item: withCtx(({ element, index }) => [
                    createVNode("div", { class: "flex-1 mx-2 rounded-md shadow-md overflow-hidden" }, [
                      createVNode("div", { class: "p-3 flex justify-between items-baseline bg-blue-800" }, [
                        createVNode("h4", { class: "font-medium text-white" }, toDisplayString(element.name), 1),
                        createVNode("button", {
                          class: "py-1 px-2 text-sm text-orange-500 hover:underline",
                          onClick: ($event) => openAddTaskForm(element.id)
                        }, toDisplayString(_ctx.$page.props.words.add_task), 9, ["onClick"])
                      ]),
                      createVNode("div", { class: "p-2 flex-1 flex flex-col h-full overflow-x-hidden overflow-y-auto bg-blue-100" }, [
                        newTaskForStatus.value === element.id ? (openBlock(), createBlock(_sfc_main$1, {
                          key: 0,
                          statusId: element.id,
                          onHandleTaskAdded: handleTaskAdded,
                          onCloseAddTaskForm: closeAddTaskForm
                        }, null, 8, ["statusId"])) : createCommentVNode("", true),
                        createVNode(unref(Draggable), {
                          list: element.tasks,
                          group: "tasks",
                          itemKey: "id",
                          onChange: taskMoved
                        }, {
                          item: withCtx(({ element: element2, index: index2 }) => [
                            createVNode("div", { class: "bg-slate-300 p-2 my-2 cursor-pointer" }, [
                              createVNode("p", { class: "block mb-2 text-xl text-gray-900" }, toDisplayString(element2.title), 1),
                              createVNode("span", { class: "text-gray-700 truncate" }, toDisplayString(element2.description), 1)
                            ])
                          ]),
                          _: 2
                        }, 1032, ["list"]),
                        withDirectives(createVNode("div", { class: "flex-1 p-4 flex flex-col items-center justify-center" }, [
                          createVNode("span", { class: "text-gray-600" }, toDisplayString(_ctx.$page.props.words.no_tasks_yet), 1),
                          createVNode("button", {
                            class: "mt-1 text-sm text-orange-600 hover:underline",
                            onClick: ($event) => openAddTaskForm(element.id)
                          }, toDisplayString(_ctx.$page.props.words.add_task), 9, ["onClick"])
                        ], 512), [
                          [vShow, !element.tasks && newTaskForStatus.value !== element.id]
                        ])
                      ])
                    ])
                  ]),
                  _: 1
                }, 8, ["list"])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Project/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
