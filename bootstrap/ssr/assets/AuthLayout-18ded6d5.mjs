import {
  mergeProps,
  useSSRContext,
  ref,
  unref,
  isRef,
  withCtx,
  createVNode,
  withModifiers,
  withDirectives,
  vModelText,
  toDisplayString,
  Transition,
  openBlock,
  createBlock,
  createCommentVNode,
  createTextVNode,
} from "vue";
import {
  ssrRenderAttrs,
  ssrRenderSlot,
  ssrInterpolate,
  ssrRenderTeleport,
  ssrRenderComponent,
  ssrRenderAttr,
  ssrIncludeBooleanAttr,
  ssrRenderClass,
  ssrRenderList,
} from "vue/server-renderer";
import { usePage, useForm, Link } from "@inertiajs/vue3";
import {
  _ as _sfc_main$a,
  a as _sfc_main$b,
  H as Hamburger,
} from "./Hamburger-c1553109.mjs";
import { a as _sfc_main$8, _ as _sfc_main$9 } from "./TextInput-66ab7a8d.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.mjs";
const ReuseableModal_vue_vue_type_style_index_0_lang = "";
const _sfc_main$7 = {
  __name: "ReuseableModal",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      if (props.show) {
        _push(
          `<div${ssrRenderAttrs(
            mergeProps({ class: "modal-mask" }, _attrs)
          )}><div class="modal-container grid place-items-center w-3/4 text-white rounded-lg">`
        );
        ssrRenderSlot(
          _ctx.$slots,
          "content",
          {},
          () => {
            _push(`default body`);
          },
          _push,
          _parent
        );
        _push(`<div>`);
        ssrRenderSlot(
          _ctx.$slots,
          "footer",
          {},
          () => {
            _push(`<button class="text-4xl"> × </button>`);
          },
          _push,
          _parent
        );
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  },
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "resources/js/Components/ReuseableModal.vue"
  );
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = {
  __name: "CreatePostForm",
  __ssrInlineRender: true,
  emits: ["setPosts"],
  setup(__props, { emit }) {
    const contentInput = ref(null);
    const { props: properities } = usePage();
    const form = useForm({
      content: "",
    });
    const storePost = () => {
      form.post(route("posts.store"), {
        preserveScroll: true,
        onSuccess: () => {
          showModal.value = false;
          emit("setPosts");
          form.reset();
        },
        onError: () => {
          if (form.errors.content) {
            contentInput.value.focus();
          }
        },
      });
    };
    let showModal = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(
        `<!--[--><button class="px-2 py-1 text-white hover:font-bold hover:underline">${ssrInterpolate(
          _ctx.$page.props.words.create_post
        )}</button>`
      );
      ssrRenderTeleport(
        _push,
        (_push2) => {
          _push2(
            ssrRenderComponent(
              _sfc_main$7,
              {
                show: unref(showModal),
                onClose: ($event) =>
                  isRef(showModal)
                    ? (showModal.value = false)
                    : (showModal = false),
              },
              {
                content: withCtx((_, _push3, _parent2, _scopeId) => {
                  if (_push3) {
                    _push3(
                      `<form class="block w-full bg-gray-900 px-4 py-2 rounded-lg"${_scopeId}><textarea id="content" type="text" class="my-2 block w-full min-h-[35vh] text-black rounded-lg"${ssrRenderAttr(
                        "placeholder",
                        unref(properities).words.type_your_post_here
                      )}${_scopeId}>${ssrInterpolate(
                        unref(form).content
                      )}</textarea>`
                    );
                    _push3(
                      ssrRenderComponent(
                        _sfc_main$8,
                        {
                          message: unref(form).errors.content,
                          class: "my-2 bg-white rounded-md px-2 py-1",
                        },
                        null,
                        _parent2,
                        _scopeId
                      )
                    );
                    _push3(
                      `<button class="btn btn-primary"${
                        ssrIncludeBooleanAttr(unref(form).processing)
                          ? " disabled"
                          : ""
                      }${_scopeId}>${ssrInterpolate(
                        unref(properities).words.post
                      )}</button>`
                    );
                    if (unref(form).recentlySuccessful) {
                      _push3(
                        `<p class="text-sm text-gray-600"${_scopeId}>${ssrInterpolate(
                          _ctx.$page.props.words.created
                        )}</p>`
                      );
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</form>`);
                  } else {
                    return [
                      createVNode(
                        "form",
                        {
                          onSubmit: withModifiers(storePost, ["prevent"]),
                          class:
                            "block w-full bg-gray-900 px-4 py-2 rounded-lg",
                        },
                        [
                          withDirectives(
                            createVNode(
                              "textarea",
                              {
                                id: "content",
                                ref_key: "contentInput",
                                ref: contentInput,
                                "onUpdate:modelValue": ($event) =>
                                  (unref(form).content = $event),
                                type: "text",
                                class:
                                  "my-2 block w-full min-h-[35vh] text-black rounded-lg",
                                placeholder:
                                  unref(properities).words.type_your_post_here,
                              },
                              "\n          ",
                              8,
                              ["onUpdate:modelValue", "placeholder"]
                            ),
                            [[vModelText, unref(form).content]]
                          ),
                          createVNode(
                            _sfc_main$8,
                            {
                              message: unref(form).errors.content,
                              class: "my-2 bg-white rounded-md px-2 py-1",
                            },
                            null,
                            8,
                            ["message"]
                          ),
                          createVNode(
                            "button",
                            {
                              class: "btn btn-primary",
                              disabled: unref(form).processing,
                            },
                            toDisplayString(unref(properities).words.post),
                            9,
                            ["disabled"]
                          ),
                          createVNode(
                            Transition,
                            {
                              "enter-from-class": "opacity-0",
                              "leave-to-class": "opacity-0",
                              class: "transition ease-in-out",
                            },
                            {
                              default: withCtx(() => [
                                unref(form).recentlySuccessful
                                  ? (openBlock(),
                                    createBlock(
                                      "p",
                                      {
                                        key: 0,
                                        class: "text-sm text-gray-600",
                                      },
                                      toDisplayString(
                                        _ctx.$page.props.words.created
                                      ),
                                      1
                                    ))
                                  : createCommentVNode("", true),
                              ]),
                              _: 1,
                            }
                          ),
                        ],
                        40,
                        ["onSubmit"]
                      ),
                    ];
                  }
                }),
                _: 1,
              },
              _parent
            )
          );
        },
        "body",
        false,
        _parent
      );
      _push(`<!--]-->`);
    };
  },
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "resources/js/Components/CreatePostForm.vue"
  );
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
  __name: "CreateChatGroup",
  __ssrInlineRender: true,
  setup(__props) {
    const nameInput = ref(null);
    const { props: properities } = usePage();
    const form = useForm({
      name: "",
    });
    const storeGroup = () => {
      form.post(route("chat.groups.store"), {
        preserveScroll: true,
        onSuccess: () => {
          showModal.value = false;
          form.reset();
        },
        onError: () => {
          if (form.errors.name) {
            nameInput.value.focus();
          }
        },
      });
    };
    let showModal = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(
        `<!--[--><button class="px-2 py-1 text-white hover:font-bold hover:underline">${ssrInterpolate(
          _ctx.$page.props.words.create_chat_group
        )}</button>`
      );
      ssrRenderTeleport(
        _push,
        (_push2) => {
          _push2(
            ssrRenderComponent(
              _sfc_main$7,
              {
                show: unref(showModal),
                onClose: ($event) =>
                  isRef(showModal)
                    ? (showModal.value = false)
                    : (showModal = false),
              },
              {
                content: withCtx((_, _push3, _parent2, _scopeId) => {
                  if (_push3) {
                    _push3(
                      `<form class="grid place-items-center w-full h-[20vh] bg-gray-900 px-4 py-2 rounded-lg"${_scopeId}>`
                    );
                    _push3(
                      ssrRenderComponent(
                        _sfc_main$9,
                        {
                          id: "name",
                          ref_key: "nameInput",
                          ref: nameInput,
                          modelValue: unref(form).name,
                          "onUpdate:modelValue": ($event) =>
                            (unref(form).name = $event),
                          type: "text",
                          class: "my-2 block w-3/4 text-black rounded-lg",
                          placeholder:
                            unref(properities).words.type_your_group_name_here,
                        },
                        null,
                        _parent2,
                        _scopeId
                      )
                    );
                    _push3(
                      ssrRenderComponent(
                        _sfc_main$8,
                        {
                          message: unref(form).errors.name,
                          class: "my-2 bg-white rounded-md px-2 py-1",
                        },
                        null,
                        _parent2,
                        _scopeId
                      )
                    );
                    _push3(
                      `<button class="btn btn-primary"${
                        ssrIncludeBooleanAttr(unref(form).processing)
                          ? " disabled"
                          : ""
                      }${_scopeId}>${ssrInterpolate(
                        unref(properities).words.create_chat_group
                      )}</button>`
                    );
                    if (unref(form).recentlySuccessful) {
                      _push3(
                        `<p class="text-sm text-gray-600"${_scopeId}>${ssrInterpolate(
                          _ctx.$page.props.words.created
                        )}</p>`
                      );
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</form>`);
                  } else {
                    return [
                      createVNode(
                        "form",
                        {
                          onSubmit: withModifiers(storeGroup, ["prevent"]),
                          class:
                            "grid place-items-center w-full h-[20vh] bg-gray-900 px-4 py-2 rounded-lg",
                        },
                        [
                          createVNode(
                            _sfc_main$9,
                            {
                              id: "name",
                              ref_key: "nameInput",
                              ref: nameInput,
                              modelValue: unref(form).name,
                              "onUpdate:modelValue": ($event) =>
                                (unref(form).name = $event),
                              type: "text",
                              class: "my-2 block w-3/4 text-black rounded-lg",
                              placeholder:
                                unref(properities).words
                                  .type_your_group_name_here,
                            },
                            null,
                            8,
                            ["modelValue", "onUpdate:modelValue", "placeholder"]
                          ),
                          createVNode(
                            _sfc_main$8,
                            {
                              message: unref(form).errors.name,
                              class: "my-2 bg-white rounded-md px-2 py-1",
                            },
                            null,
                            8,
                            ["message"]
                          ),
                          createVNode(
                            "button",
                            {
                              class: "btn btn-primary",
                              disabled: unref(form).processing,
                            },
                            toDisplayString(
                              unref(properities).words.create_chat_group
                            ),
                            9,
                            ["disabled"]
                          ),
                          createVNode(
                            Transition,
                            {
                              "enter-from-class": "opacity-0",
                              "leave-to-class": "opacity-0",
                              class: "transition ease-in-out",
                            },
                            {
                              default: withCtx(() => [
                                unref(form).recentlySuccessful
                                  ? (openBlock(),
                                    createBlock(
                                      "p",
                                      {
                                        key: 0,
                                        class: "text-sm text-gray-600",
                                      },
                                      toDisplayString(
                                        _ctx.$page.props.words.created
                                      ),
                                      1
                                    ))
                                  : createCommentVNode("", true),
                              ]),
                              _: 1,
                            }
                          ),
                        ],
                        40,
                        ["onSubmit"]
                      ),
                    ];
                  }
                }),
                _: 1,
              },
              _parent
            )
          );
        },
        "body",
        false,
        _parent
      );
      _push(`<!--]-->`);
    };
  },
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "resources/js/Components/CreateChatGroup.vue"
  );
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {
  __name: "CreateProject",
  __ssrInlineRender: true,
  setup(__props) {
    const nameInput = ref(null);
    const codeInput = ref(null);
    const { props: properities } = usePage();
    const form = useForm({
      name: "",
      code: "",
    });
    const storeProject = () => {
      form.post(route("project.store"), {
        preserveScroll: true,
        onSuccess: () => {
          showModal.value = false;
          form.reset();
        },
        onError: () => {
          if (form.errors.name) {
            nameInput.value.focus();
          } else if (form.errors.code) {
            codeInput.value.focus();
          }
        },
      });
    };
    let showModal = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(
        `<!--[--><button class="px-2 py-1 text-white hover:font-bold hover:underline">${ssrInterpolate(
          _ctx.$page.props.words.create_project
        )}</button>`
      );
      ssrRenderTeleport(
        _push,
        (_push2) => {
          _push2(
            ssrRenderComponent(
              _sfc_main$7,
              {
                show: unref(showModal),
                onClose: ($event) =>
                  isRef(showModal)
                    ? (showModal.value = false)
                    : (showModal = false),
              },
              {
                content: withCtx((_, _push3, _parent2, _scopeId) => {
                  if (_push3) {
                    _push3(
                      `<form class="grid place-items-center w-full h-[35vh] bg-gray-900 px-4 py-2 rounded-lg"${_scopeId}>`
                    );
                    _push3(
                      ssrRenderComponent(
                        _sfc_main$9,
                        {
                          ref_key: "nameInput",
                          ref: nameInput,
                          modelValue: unref(form).name,
                          "onUpdate:modelValue": ($event) =>
                            (unref(form).name = $event),
                          type: "text",
                          class: "my-2 block w-3/4 text-black rounded-lg",
                          placeholder:
                            unref(properities).words
                              .type_your_project_name_here,
                        },
                        null,
                        _parent2,
                        _scopeId
                      )
                    );
                    if (unref(form).errors.name) {
                      _push3(
                        `<p class="error"${_scopeId}>${ssrInterpolate(
                          unref(form).errors.name
                        )}</p>`
                      );
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(
                      ssrRenderComponent(
                        _sfc_main$9,
                        {
                          ref_key: "codeInput",
                          ref: codeInput,
                          modelValue: unref(form).code,
                          "onUpdate:modelValue": ($event) =>
                            (unref(form).code = $event),
                          type: "text",
                          class: "my-2 block w-3/4 text-black rounded-lg",
                          placeholder:
                            unref(properities).words
                              .type_your_project_code_here,
                        },
                        null,
                        _parent2,
                        _scopeId
                      )
                    );
                    if (unref(form).errors.code) {
                      _push3(
                        `<p class="error"${_scopeId}>${ssrInterpolate(
                          unref(form).errors.code
                        )}</p>`
                      );
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(
                      `<button class="btn btn-primary"${
                        ssrIncludeBooleanAttr(unref(form).processing)
                          ? " disabled"
                          : ""
                      }${_scopeId}>${ssrInterpolate(
                        unref(properities).words.create_project
                      )}</button>`
                    );
                    if (unref(form).recentlySuccessful) {
                      _push3(
                        `<p class="text-sm text-gray-600"${_scopeId}>${ssrInterpolate(
                          _ctx.$page.props.words.created
                        )}</p>`
                      );
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</form>`);
                  } else {
                    return [
                      createVNode(
                        "form",
                        {
                          onSubmit: withModifiers(storeProject, ["prevent"]),
                          class:
                            "grid place-items-center w-full h-[35vh] bg-gray-900 px-4 py-2 rounded-lg",
                        },
                        [
                          createVNode(
                            _sfc_main$9,
                            {
                              ref_key: "nameInput",
                              ref: nameInput,
                              modelValue: unref(form).name,
                              "onUpdate:modelValue": ($event) =>
                                (unref(form).name = $event),
                              type: "text",
                              class: "my-2 block w-3/4 text-black rounded-lg",
                              placeholder:
                                unref(properities).words
                                  .type_your_project_name_here,
                            },
                            null,
                            8,
                            ["modelValue", "onUpdate:modelValue", "placeholder"]
                          ),
                          unref(form).errors.name
                            ? (openBlock(),
                              createBlock(
                                "p",
                                {
                                  key: 0,
                                  class: "error",
                                },
                                toDisplayString(unref(form).errors.name),
                                1
                              ))
                            : createCommentVNode("", true),
                          createVNode(
                            _sfc_main$9,
                            {
                              ref_key: "codeInput",
                              ref: codeInput,
                              modelValue: unref(form).code,
                              "onUpdate:modelValue": ($event) =>
                                (unref(form).code = $event),
                              type: "text",
                              class: "my-2 block w-3/4 text-black rounded-lg",
                              placeholder:
                                unref(properities).words
                                  .type_your_project_code_here,
                            },
                            null,
                            8,
                            ["modelValue", "onUpdate:modelValue", "placeholder"]
                          ),
                          unref(form).errors.code
                            ? (openBlock(),
                              createBlock(
                                "p",
                                {
                                  key: 1,
                                  class: "error",
                                },
                                toDisplayString(unref(form).errors.code),
                                1
                              ))
                            : createCommentVNode("", true),
                          createVNode(
                            "button",
                            {
                              class: "btn btn-primary",
                              disabled: unref(form).processing,
                            },
                            toDisplayString(
                              unref(properities).words.create_project
                            ),
                            9,
                            ["disabled"]
                          ),
                          createVNode(
                            Transition,
                            {
                              "enter-from-class": "opacity-0",
                              "leave-to-class": "opacity-0",
                              class: "transition ease-in-out",
                            },
                            {
                              default: withCtx(() => [
                                unref(form).recentlySuccessful
                                  ? (openBlock(),
                                    createBlock(
                                      "p",
                                      {
                                        key: 0,
                                        class: "text-sm text-gray-600",
                                      },
                                      toDisplayString(
                                        _ctx.$page.props.words.created
                                      ),
                                      1
                                    ))
                                  : createCommentVNode("", true),
                              ]),
                              _: 1,
                            }
                          ),
                        ],
                        40,
                        ["onSubmit"]
                      ),
                    ];
                  }
                }),
                _: 1,
              },
              _parent
            )
          );
        },
        "body",
        false,
        _parent
      );
      _push(`<!--]-->`);
    };
  },
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "resources/js/Components/CreateProject.vue"
  );
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "Actions",
  __ssrInlineRender: true,
  props: {
    horizontal: {
      tpye: Boolean,
      default: false,
    },
    vertical: {
      tpye: Boolean,
      default: false,
    },
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(
        `<section${ssrRenderAttrs(
          _attrs
        )}><h2 class="text-lg my-2 font-bold">${ssrInterpolate(
          _ctx.$page.props.words.actions
        )}</h2><section class="${ssrRenderClass([
          {
            "": props.horizontal,
            "flex-col": props.vertical,
          },
          "flex",
        ])}">`
      );
      _push(
        ssrRenderComponent(
          _sfc_main$6,
          {
            onSetPosts: ($event) => _ctx.$emit("setPosts"),
          },
          null,
          _parent
        )
      );
      _push(ssrRenderComponent(_sfc_main$5, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, null, null, _parent));
      _push(`</section></section>`);
    };
  },
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "resources/js/Components/Actions.vue"
  );
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "ChatGroups",
  __ssrInlineRender: true,
  props: {
    joined_chat_groups: {
      type: Array,
      default: [],
    },
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(
        `<section${ssrRenderAttrs(
          _attrs
        )}><h2 class="text-lg font-bold px-4 py-2">${ssrInterpolate(
          _ctx.$page.props.words.chat_groups
        )}</h2>`
      );
      if (props.joined_chat_groups) {
        _push(
          `<section class="flex flex-col gap-2 p-2 bg-zinc-800 rounded-lg"><h3 class="text-md">${ssrInterpolate(
            _ctx.$page.props.words.joined_chat_groups
          )}</h3><!--[-->`
        );
        ssrRenderList(props.joined_chat_groups, (chat_group) => {
          _push(
            `<div class="flex flex-col bg-slate-700 px-4 py-2 rounded-lg">`
          );
          _push(
            ssrRenderComponent(
              unref(Link),
              {
                class: "text-lg hover:underline hover:font-bold",
                href: _ctx.route("chat.groups.view", chat_group.id),
              },
              {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(chat_group.name)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(chat_group.name), 1),
                    ];
                  }
                }),
                _: 2,
              },
              _parent
            )
          );
          if (chat_group.description) {
            _push(
              `<p class="text-gray-200 text-md">${ssrInterpolate(
                chat_group.description
              )}</p>`
            );
          } else {
            _push(`<!---->`);
          }
          _push(
            `<span class="text-gray-300 text-md self-end">${ssrInterpolate(
              chat_group.created_at
            )}</span></div>`
          );
        });
        _push(`<!--]--></section>`);
      } else {
        _push(`<!---->`);
      }
      if (props.all_chat_groups) {
        _push(
          `<section class="flex flex-col gap-2 p-2 bg-zinc-800 rounded-lg"><h3 class="text-md">${ssrInterpolate(
            _ctx.$page.props.words.all_chat_groups
          )}</h3><!--[-->`
        );
        ssrRenderList(props.all_chat_groups, (chat_group) => {
          _push(
            `<div class="flex flex-col bg-slate-700 px-4 py-2 rounded-lg">`
          );
          _push(
            ssrRenderComponent(
              unref(Link),
              {
                class: "text-lg hover:underline hover:font-bold",
                href: _ctx.route("chat.groups.view", chat_group.id),
              },
              {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(chat_group.name)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(chat_group.name), 1),
                    ];
                  }
                }),
                _: 2,
              },
              _parent
            )
          );
          if (chat_group.description) {
            _push(
              `<p class="text-gray-200 text-md">${ssrInterpolate(
                chat_group.description
              )}</p>`
            );
          } else {
            _push(`<!---->`);
          }
          _push(
            `<span class="text-gray-300 text-md self-end">${ssrInterpolate(
              chat_group.created_at
            )}</span></div>`
          );
        });
        _push(`<!--]--></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
    };
  },
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "resources/js/Components/ChatGroups.vue"
  );
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "Projects",
  __ssrInlineRender: true,
  props: {
    projects: {
      type: Array,
      default: [],
    },
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(
        `<section${ssrRenderAttrs(
          _attrs
        )}><h2 class="text-lg font-bold px-4 py-2">${ssrInterpolate(
          _ctx.$page.props.words.projects
        )}</h2>`
      );
      if (props.projects) {
        _push(
          `<section class="flex flex-col gap-2 p-2 bg-zinc-800 rounded-lg"><!--[-->`
        );
        ssrRenderList(props.projects, (project) => {
          _push(
            `<div class="flex flex-col bg-slate-700 px-4 py-2 rounded-lg">`
          );
          _push(
            ssrRenderComponent(
              unref(Link),
              {
                class: "text-lg hover:underline hover:font-bold",
                href: _ctx.route("project.show", project.slug),
              },
              {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(project.name)}`);
                  } else {
                    return [createTextVNode(toDisplayString(project.name), 1)];
                  }
                }),
                _: 2,
              },
              _parent
            )
          );
          if (project.description) {
            _push(
              `<p class="text-gray-200 text-md">${ssrInterpolate(
                project.code
              )}</p>`
            );
          } else {
            _push(`<!---->`);
          }
          _push(
            `<span class="text-gray-300 text-md self-end">${ssrInterpolate(
              project.created_at
            )}</span></div>`
          );
        });
        _push(`<!--]--></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
    };
  },
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "resources/js/Components/Projects.vue"
  );
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AuthLayout_vue_vue_type_style_index_0_scoped_06dd4814_lang = "";
const _sfc_main = {
  __name: "AuthLayout",
  __ssrInlineRender: true,
  props: {
    joined_chat_groups: {
      type: Array,
      default: [],
    },
    projects: {
      type: Array,
      default: [],
    },
  },
  setup(__props) {
    const props = __props;
    const showNav = ref(false);
    const toggleNav = () => {
      showNav.value = !showNav.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(
        `<div${ssrRenderAttrs(
          mergeProps({ class: "min-h-screen bg-black text-white" }, _attrs)
        )} data-v-06dd4814><header class="flex items-center justify-between h-20 bg-zinc-900 py-2 px-4 sm:px-6 lg:px-8" data-v-06dd4814>`
      );
      _push(
        ssrRenderComponent(
          unref(Link),
          {
            class: "text-white font-bold text-xl",
            href: _ctx.route("home"),
          },
          {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(_ctx.$page.props.appName)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(_ctx.$page.props.appName), 1),
                ];
              }
            }),
            _: 1,
          },
          _parent
        )
      );
      _push(
        ssrRenderComponent(_sfc_main$a, { horizontal: true }, null, _parent)
      );
      _push(
        ssrRenderComponent(_sfc_main$b, { horizontal: true }, null, _parent)
      );
      if (_ctx.$page.props.auth.user.profile_photo_url) {
        _push(
          `<img class="rounded-full w-14 h-14 md:w-16 md:h-16"${ssrRenderAttr(
            "src",
            _ctx.$page.props.auth.user.profile_photo_url
          )}${ssrRenderAttr(
            "alt",
            _ctx.$page.props.words.profile_photo
          )} data-v-06dd4814>`
        );
      } else {
        _push(`<!---->`);
      }
      _push(
        ssrRenderComponent(
          Hamburger,
          {
            class: "md:hidden",
            onClose: toggleNav,
            show: showNav.value,
          },
          null,
          _parent
        )
      );
      if (showNav.value) {
        _push(
          `<div class="md:hidden fixed inset-y-0 left-0 z-40 w-full h-screen bg-zinc-800 text-white shadow-lg px-8 py-4 overflow-y-auto" data-v-06dd4814><h2 class="text-xl font-bold mb-2" data-v-06dd4814>${ssrInterpolate(
            _ctx.$page.props.words.navigation_bar
          )}</h2>`
        );
        _push(
          ssrRenderComponent(
            _sfc_main$b,
            {
              class: "pb-4",
              vertical: true,
            },
            null,
            _parent
          )
        );
        _push(
          ssrRenderComponent(
            _sfc_main$3,
            {
              onSetPosts: ($event) => _ctx.$emit("setPosts"),
              class: "border-t",
              vertical: true,
            },
            null,
            _parent
          )
        );
        _push(
          ssrRenderComponent(
            _sfc_main$a,
            {
              class: "border-t",
              vertical: true,
            },
            null,
            _parent
          )
        );
        _push(`<div class="py-2 border-b" data-v-06dd4814>`);
        _push(
          ssrRenderComponent(
            unref(Link),
            {
              class: "btn btn-danger",
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
            },
            {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(_ctx.$page.props.words.log_out)}`);
                } else {
                  return [
                    createTextVNode(
                      toDisplayString(_ctx.$page.props.words.log_out),
                      1
                    ),
                  ];
                }
              }),
              _: 1,
            },
            _parent
          )
        );
        _push(
          `</div><button class="mt-4 px-3 py-1 bg-zinc-900 text-white hover:font-bold rounded-md" data-v-06dd4814>${ssrInterpolate(
            _ctx.$page.props.words.close
          )}</button></div>`
        );
      } else {
        _push(`<!---->`);
      }
      if (showNav.value) {
        _push(
          `<div class="fixed inset-0 bg-black opacity-25 z-30" data-v-06dd4814></div>`
        );
      } else {
        _push(`<!---->`);
      }
      _push(
        `</header><main class="lg:container lg:mx-auto" data-v-06dd4814><div class="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 lg:gap-10" data-v-06dd4814><div class="hidden md:block" data-v-06dd4814>`
      );
      ssrRenderSlot(
        _ctx.$slots,
        "left-sidebar",
        {},
        () => {
          _push(
            ssrRenderComponent(
              _sfc_main$3,
              {
                onSetPosts: ($event) => _ctx.$emit("setPosts"),
                vertical: true,
                class: "p-2 bg-slate-800 rounded-lg mb-2",
              },
              null,
              _parent
            )
          );
          if (props.joined_chat_groups.length >= 1) {
            _push(
              ssrRenderComponent(
                _sfc_main$2,
                {
                  joined_chat_groups: props.joined_chat_groups,
                  class: "bg-slate-800 rounded-lg",
                },
                null,
                _parent
              )
            );
          } else {
            _push(`<!---->`);
          }
          if (props.projects.length >= 1) {
            _push(
              ssrRenderComponent(
                _sfc_main$1,
                {
                  projects: props.projects,
                  class: "bg-slate-800 rounded-lg my-2",
                },
                null,
                _parent
              )
            );
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="py-2 border-t" data-v-06dd4814>`);
          _push(
            ssrRenderComponent(
              unref(Link),
              {
                class: "btn btn-danger",
                href: _ctx.route("logout"),
                method: "post",
                as: "button",
              },
              {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(_ctx.$page.props.words.log_out)}`);
                  } else {
                    return [
                      createTextVNode(
                        toDisplayString(_ctx.$page.props.words.log_out),
                        1
                      ),
                    ];
                  }
                }),
                _: 1,
              },
              _parent
            )
          );
          _push(`</div>`);
        },
        _push,
        _parent
      );
      _push(`</div><section class="md:col-span-2" data-v-06dd4814>`);
      ssrRenderSlot(_ctx.$slots, "content", {}, null, _push, _parent);
      _push(`</section><div class="hidden" data-v-06dd4814>`);
      ssrRenderSlot(_ctx.$slots, "right-sidebar", {}, null, _push, _parent);
      _push(`</div></div></main></div>`);
    };
  },
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    "resources/js/Layouts/AuthLayout.vue"
  );
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AuthLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [
  ["__scopeId", "data-v-06dd4814"],
]);
export {
  AuthLayout as A,
  _sfc_main$2 as _,
  _sfc_main$7 as a,
  _sfc_main$3 as b,
};
