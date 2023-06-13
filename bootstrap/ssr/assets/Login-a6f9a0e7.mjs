import { computed, mergeProps, unref, useSSRContext, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, withModifiers } from "vue";
import { ssrRenderAttrs, ssrLooseContain, ssrGetDynamicModelProps, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./GuestLayout-78bf0cd4.mjs";
import { _ as _sfc_main$4, a as _sfc_main$5 } from "./TextInput-66ab7a8d.mjs";
import { _ as _sfc_main$3 } from "./InputLabel-bc2d8356.mjs";
import { useForm, Head, Link } from "@inertiajs/vue3";
import "./ApplicationLogo-8b847249.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
const _sfc_main$1 = {
  __name: "Checkbox",
  __ssrInlineRender: true,
  props: {
    checked: {
      type: [Array, Boolean],
      default: false
    },
    value: {
      default: null
    }
  },
  emits: ["update:checked"],
  setup(__props, { emit }) {
    const props = __props;
    const proxyChecked = computed({
      get() {
        return props.checked;
      },
      set(val) {
        emit("update:checked", val);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
        type: "checkbox",
        value: __props.value,
        checked: Array.isArray(unref(proxyChecked)) ? ssrLooseContain(unref(proxyChecked), __props.value) : unref(proxyChecked),
        class: "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
      }, _attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, unref(proxyChecked)))))}>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Checkbox.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Login",
  __ssrInlineRender: true,
  props: {
    canResetPassword: Boolean,
    status: String,
    canProviderLogin: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const form = useForm({
      input_type: "",
      password: "",
      remember: false
    });
    const submit = () => {
      form.post(route("login"), {
        onFinish: () => form.reset("password")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: _ctx.$page.props.words.login
            }, null, _parent2, _scopeId));
            _push2(`<section class="p-8 my-4 bg-zinc-800 w-full rounded-lg md:container"${_scopeId}>`);
            if (__props.status) {
              _push2(`<div class="mb-4 font-medium text-sm text-green-600"${_scopeId}>${ssrInterpolate(__props.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.canProviderLogin) {
              _push2(`<section class="flex justify-between border-b py-2 my-2"${_scopeId}><a href="/auth/github/redirect" class="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2"${_scopeId}><svg class="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"${_scopeId}><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"${_scopeId}></path></svg> ${ssrInterpolate(_ctx.$page.props.words.sign_in_with_github)}</a><a href="/auth/google/redirect" class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"${_scopeId}><svg class="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"${_scopeId}><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"${_scopeId}></path></svg> ${ssrInterpolate(_ctx.$page.props.words.sign_in_with_google)}</a></section>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("register"),
              class: "underline float-right text-sm text-gray-200 hover:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$page.props.words.sign_up)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$page.props.words.sign_up), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<form${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "input_type",
              value: "Email Or Username"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "input_type",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).input_type,
              "onUpdate:modelValue": ($event) => unref(form).input_type = $event,
              autofocus: "",
              autocomplete: "username",
              required: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.username
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "password",
              value: "Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "password",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              required: "",
              autocomplete: "current-password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="block mt-4"${_scopeId}><label class="flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "remember",
              checked: unref(form).remember,
              "onUpdate:checked": ($event) => unref(form).remember = $event
            }, null, _parent2, _scopeId));
            _push2(`<span class="ml-2 text-sm text-gray-200"${_scopeId}>Remember me</span></label></div><div class="flex items-center justify-end mt-4"${_scopeId}>`);
            if (__props.canResetPassword) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("password.request"),
                class: "underline text-sm text-gray-200 hover:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Forgot your password? `);
                  } else {
                    return [
                      createTextVNode(" Forgot your password? ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button class="${ssrRenderClass([{ "opacity-25": unref(form).processing }, "ml-4 btn btn-primary"])}"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.login)}</button></div></form></section>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: _ctx.$page.props.words.login
              }, null, 8, ["title"]),
              createVNode("section", { class: "p-8 my-4 bg-zinc-800 w-full rounded-lg md:container" }, [
                __props.status ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mb-4 font-medium text-sm text-green-600"
                }, toDisplayString(__props.status), 1)) : createCommentVNode("", true),
                __props.canProviderLogin ? (openBlock(), createBlock("section", {
                  key: 1,
                  class: "flex justify-between border-b py-2 my-2"
                }, [
                  createVNode("a", {
                    href: "/auth/github/redirect",
                    class: "text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2"
                  }, [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4 mr-2 -ml-1",
                      "aria-hidden": "true",
                      focusable: "false",
                      "data-prefix": "fab",
                      "data-icon": "github",
                      role: "img",
                      xmlns: "http://www.w3.org/2000/svg",
                      viewBox: "0 0 496 512"
                    }, [
                      createVNode("path", {
                        fill: "currentColor",
                        d: "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                      })
                    ])),
                    createTextVNode(" " + toDisplayString(_ctx.$page.props.words.sign_in_with_github), 1)
                  ]),
                  createVNode("a", {
                    href: "/auth/google/redirect",
                    class: "text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                  }, [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4 mr-2 -ml-1",
                      "aria-hidden": "true",
                      focusable: "false",
                      "data-prefix": "fab",
                      "data-icon": "google",
                      role: "img",
                      xmlns: "http://www.w3.org/2000/svg",
                      viewBox: "0 0 488 512"
                    }, [
                      createVNode("path", {
                        fill: "currentColor",
                        d: "M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                      })
                    ])),
                    createTextVNode(" " + toDisplayString(_ctx.$page.props.words.sign_in_with_google), 1)
                  ])
                ])) : createCommentVNode("", true),
                createVNode(unref(Link), {
                  href: _ctx.route("register"),
                  class: "underline float-right text-sm text-gray-200 hover:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$page.props.words.sign_up), 1)
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode("form", {
                  onSubmit: withModifiers(submit, ["prevent"])
                }, [
                  createVNode("div", null, [
                    createVNode(_sfc_main$3, {
                      for: "input_type",
                      value: "Email Or Username"
                    }),
                    createVNode(_sfc_main$4, {
                      id: "input_type",
                      type: "text",
                      class: "mt-1 block w-full",
                      modelValue: unref(form).input_type,
                      "onUpdate:modelValue": ($event) => unref(form).input_type = $event,
                      autofocus: "",
                      autocomplete: "username",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$5, {
                      class: "mt-2",
                      message: unref(form).errors.username
                    }, null, 8, ["message"]),
                    createVNode(_sfc_main$5, {
                      class: "mt-2",
                      message: unref(form).errors.email
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", { class: "mt-4" }, [
                    createVNode(_sfc_main$3, {
                      for: "password",
                      value: "Password"
                    }),
                    createVNode(_sfc_main$4, {
                      id: "password",
                      type: "password",
                      class: "mt-1 block w-full",
                      modelValue: unref(form).password,
                      "onUpdate:modelValue": ($event) => unref(form).password = $event,
                      required: "",
                      autocomplete: "current-password"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_sfc_main$5, {
                      class: "mt-2",
                      message: unref(form).errors.password
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", { class: "block mt-4" }, [
                    createVNode("label", { class: "flex items-center" }, [
                      createVNode(_sfc_main$1, {
                        name: "remember",
                        checked: unref(form).remember,
                        "onUpdate:checked": ($event) => unref(form).remember = $event
                      }, null, 8, ["checked", "onUpdate:checked"]),
                      createVNode("span", { class: "ml-2 text-sm text-gray-200" }, "Remember me")
                    ])
                  ]),
                  createVNode("div", { class: "flex items-center justify-end mt-4" }, [
                    __props.canResetPassword ? (openBlock(), createBlock(unref(Link), {
                      key: 0,
                      href: _ctx.route("password.request"),
                      class: "underline text-sm text-gray-200 hover:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Forgot your password? ")
                      ]),
                      _: 1
                    }, 8, ["href"])) : createCommentVNode("", true),
                    createVNode("button", {
                      class: ["ml-4 btn btn-primary", { "opacity-25": unref(form).processing }],
                      disabled: unref(form).processing
                    }, toDisplayString(_ctx.$page.props.words.login), 11, ["disabled"])
                  ])
                ], 40, ["onSubmit"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
