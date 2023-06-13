import { withCtx, unref, createTextVNode, toDisplayString, createVNode, withModifiers, withDirectives, vModelRadio, openBlock, createBlock, createCommentVNode, Transition, useSSRContext } from "vue";
import { ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseEqual, ssrInterpolate, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./GuestLayout-78bf0cd4.mjs";
import { _ as _sfc_main$3, a as _sfc_main$4 } from "./TextInput-66ab7a8d.mjs";
import { _ as _sfc_main$2 } from "./InputLabel-bc2d8356.mjs";
import { useForm, Head, Link } from "@inertiajs/vue3";
import "./ApplicationLogo-8b847249.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
const _sfc_main = {
  __name: "Register",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      firstname: "",
      lastname: "",
      username: "",
      gender: "",
      email: "",
      password: "",
      password_confirmation: "",
      profile_photo: null
      // terms: false,
    });
    const submit = () => {
      form.post(route("register"), {
        preserveScroll: true,
        onFinish: () => form.reset("password", "password_confirmation")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Register" }, null, _parent2, _scopeId));
            _push2(`<form class="bg-zinc-800 w-full mt-2 mb-4 rounded-lg md:container px-8 py-4 flex flex-col gap-2"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "firstname",
              value: _ctx.$page.props.words.firstname
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "firstname",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).firstname,
              "onUpdate:modelValue": ($event) => unref(form).firstname = $event,
              placeholder: _ctx.$page.props.words.firstname,
              required: "",
              autofocus: "",
              autocomplete: "firstname"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.firstname
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "lastname",
              value: _ctx.$page.props.words.lastname
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "lastname",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).lastname,
              "onUpdate:modelValue": ($event) => unref(form).lastname = $event,
              placeholder: _ctx.$page.props.words.lastname,
              required: "",
              autofocus: "",
              autocomplete: "lastname"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.lastname
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "username",
              value: _ctx.$page.props.words.user_name
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "username",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).username,
              "onUpdate:modelValue": ($event) => unref(form).username = $event,
              placeholder: _ctx.$page.props.words.user_name,
              required: "",
              autofocus: "",
              autocomplete: "username"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.username
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, { value: "Gender" }, null, _parent2, _scopeId));
            _push2(`<div class="flex justify-center gap-12"${_scopeId}><section${_scopeId}><input type="radio" id="male" value="male"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).gender, "male")) ? " checked" : ""}${_scopeId}><label class="ml-2" for="male"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.male)}</label></section><section${_scopeId}><input type="radio" id="female" value="female"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).gender, "female")) ? " checked" : ""}${_scopeId}><label class="ml-2" for="female"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.female)}</label></section></div>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.gender
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "email",
              value: _ctx.$page.props.words.email
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "email",
              type: "email",
              class: "mt-1 block w-full",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              placeholder: _ctx.$page.props.words.email,
              required: "",
              autocomplete: "username"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "password",
              value: _ctx.$page.props.words.password
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "password",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              placeholder: _ctx.$page.props.words.password,
              required: "",
              autocomplete: "new-password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "password_confirmation",
              value: _ctx.$page.props.words.confirm_password
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "password_confirmation",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: unref(form).password_confirmation,
              "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
              placeholder: _ctx.$page.props.words.confirm_password,
              required: "",
              autocomplete: "new-password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.password_confirmation
            }, null, _parent2, _scopeId));
            _push2(`</div><section class="flex justify-between flex-col sm:flex-row"${_scopeId}><div class="my-2"${_scopeId}><label class="pr-2" for="profile_photo"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.profile_photo)}</label><input id="profile_photo" type="file"${_scopeId}></div></section>`);
            if (unref(form).errors.profile_photo) {
              _push2(`<p class="text-sm bg-red-600 text-white rounded-md my-1 px-2 py-1"${_scopeId}>${ssrInterpolate(unref(form).errors.profile_photo)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).progress) {
              _push2(`<progress${ssrRenderAttr("value", unref(form).progress.percentage)} max="100"${_scopeId}>${ssrInterpolate(unref(form).progress.percentage)}% </progress>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).recentlySuccessful) {
              _push2(`<p class="text-sm text-gray-100"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.uploaded)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex items-center justify-end mt-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("login"),
              class: "underline text-sm text-gray-200 hover:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$page.props.words.already_registered)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$page.props.words.already_registered), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button class="${ssrRenderClass([{ "opacity-25": unref(form).processing }, "ml-4 btn btn-primary"])}"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.register)}</button></div></form>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Register" }),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"]),
                class: "bg-zinc-800 w-full mt-2 mb-4 rounded-lg md:container px-8 py-4 flex flex-col gap-2"
              }, [
                createVNode("div", null, [
                  createVNode(_sfc_main$2, {
                    for: "firstname",
                    value: _ctx.$page.props.words.firstname
                  }, null, 8, ["value"]),
                  createVNode(_sfc_main$3, {
                    id: "firstname",
                    type: "text",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).firstname,
                    "onUpdate:modelValue": ($event) => unref(form).firstname = $event,
                    placeholder: _ctx.$page.props.words.firstname,
                    required: "",
                    autofocus: "",
                    autocomplete: "firstname"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                  createVNode(_sfc_main$4, {
                    class: "mt-2",
                    message: unref(form).errors.firstname
                  }, null, 8, ["message"])
                ]),
                createVNode("div", null, [
                  createVNode(_sfc_main$2, {
                    for: "lastname",
                    value: _ctx.$page.props.words.lastname
                  }, null, 8, ["value"]),
                  createVNode(_sfc_main$3, {
                    id: "lastname",
                    type: "text",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).lastname,
                    "onUpdate:modelValue": ($event) => unref(form).lastname = $event,
                    placeholder: _ctx.$page.props.words.lastname,
                    required: "",
                    autofocus: "",
                    autocomplete: "lastname"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                  createVNode(_sfc_main$4, {
                    class: "mt-2",
                    message: unref(form).errors.lastname
                  }, null, 8, ["message"])
                ]),
                createVNode("div", null, [
                  createVNode(_sfc_main$2, {
                    for: "username",
                    value: _ctx.$page.props.words.user_name
                  }, null, 8, ["value"]),
                  createVNode(_sfc_main$3, {
                    id: "username",
                    type: "text",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).username,
                    "onUpdate:modelValue": ($event) => unref(form).username = $event,
                    placeholder: _ctx.$page.props.words.user_name,
                    required: "",
                    autofocus: "",
                    autocomplete: "username"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                  createVNode(_sfc_main$4, {
                    class: "mt-2",
                    message: unref(form).errors.username
                  }, null, 8, ["message"])
                ]),
                createVNode("div", null, [
                  createVNode(_sfc_main$2, { value: "Gender" }),
                  createVNode("div", { class: "flex justify-center gap-12" }, [
                    createVNode("section", null, [
                      withDirectives(createVNode("input", {
                        type: "radio",
                        id: "male",
                        value: "male",
                        "onUpdate:modelValue": ($event) => unref(form).gender = $event
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelRadio, unref(form).gender]
                      ]),
                      createVNode("label", {
                        class: "ml-2",
                        for: "male"
                      }, toDisplayString(_ctx.$page.props.words.male), 1)
                    ]),
                    createVNode("section", null, [
                      withDirectives(createVNode("input", {
                        type: "radio",
                        id: "female",
                        value: "female",
                        "onUpdate:modelValue": ($event) => unref(form).gender = $event
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelRadio, unref(form).gender]
                      ]),
                      createVNode("label", {
                        class: "ml-2",
                        for: "female"
                      }, toDisplayString(_ctx.$page.props.words.female), 1)
                    ])
                  ]),
                  createVNode(_sfc_main$4, {
                    class: "mt-2",
                    message: unref(form).errors.gender
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$2, {
                    for: "email",
                    value: _ctx.$page.props.words.email
                  }, null, 8, ["value"]),
                  createVNode(_sfc_main$3, {
                    id: "email",
                    type: "email",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    placeholder: _ctx.$page.props.words.email,
                    required: "",
                    autocomplete: "username"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                  createVNode(_sfc_main$4, {
                    class: "mt-2",
                    message: unref(form).errors.email
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$2, {
                    for: "password",
                    value: _ctx.$page.props.words.password
                  }, null, 8, ["value"]),
                  createVNode(_sfc_main$3, {
                    id: "password",
                    type: "password",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    placeholder: _ctx.$page.props.words.password,
                    required: "",
                    autocomplete: "new-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                  createVNode(_sfc_main$4, {
                    class: "mt-2",
                    message: unref(form).errors.password
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$2, {
                    for: "password_confirmation",
                    value: _ctx.$page.props.words.confirm_password
                  }, null, 8, ["value"]),
                  createVNode(_sfc_main$3, {
                    id: "password_confirmation",
                    type: "password",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).password_confirmation,
                    "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                    placeholder: _ctx.$page.props.words.confirm_password,
                    required: "",
                    autocomplete: "new-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                  createVNode(_sfc_main$4, {
                    class: "mt-2",
                    message: unref(form).errors.password_confirmation
                  }, null, 8, ["message"])
                ]),
                createVNode("section", { class: "flex justify-between flex-col sm:flex-row" }, [
                  createVNode("div", { class: "my-2" }, [
                    createVNode("label", {
                      class: "pr-2",
                      for: "profile_photo"
                    }, toDisplayString(_ctx.$page.props.words.profile_photo), 1),
                    createVNode("input", {
                      id: "profile_photo",
                      type: "file",
                      onInput: ($event) => unref(form).profile_photo = $event.target.files[0]
                    }, null, 40, ["onInput"])
                  ])
                ]),
                unref(form).errors.profile_photo ? (openBlock(), createBlock("p", {
                  key: 0,
                  class: "text-sm bg-red-600 text-white rounded-md my-1 px-2 py-1"
                }, toDisplayString(unref(form).errors.profile_photo), 1)) : createCommentVNode("", true),
                unref(form).progress ? (openBlock(), createBlock("progress", {
                  key: 1,
                  value: unref(form).progress.percentage,
                  max: "100"
                }, toDisplayString(unref(form).progress.percentage) + "% ", 9, ["value"])) : createCommentVNode("", true),
                createVNode(Transition, {
                  "enter-from-class": "opacity-0",
                  "leave-to-class": "opacity-0",
                  class: "transition ease-in-out"
                }, {
                  default: withCtx(() => [
                    unref(form).recentlySuccessful ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-sm text-gray-100"
                    }, toDisplayString(_ctx.$page.props.words.uploaded), 1)) : createCommentVNode("", true)
                  ]),
                  _: 1
                }),
                createVNode("div", { class: "flex items-center justify-end mt-2" }, [
                  createVNode(unref(Link), {
                    href: _ctx.route("login"),
                    class: "underline text-sm text-gray-200 hover:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.$page.props.words.already_registered), 1)
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  createVNode("button", {
                    class: ["ml-4 btn btn-primary", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing
                  }, toDisplayString(_ctx.$page.props.words.register), 11, ["disabled"])
                ])
              ], 40, ["onSubmit"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
