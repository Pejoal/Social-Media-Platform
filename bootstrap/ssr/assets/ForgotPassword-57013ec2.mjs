import { withCtx, unref, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./GuestLayout-78bf0cd4.mjs";
import { _ as _sfc_main$3, a as _sfc_main$4 } from "./TextInput-66ab7a8d.mjs";
import { _ as _sfc_main$2 } from "./InputLabel-bc2d8356.mjs";
import { useForm, Head } from "@inertiajs/vue3";
import "./ApplicationLogo-8b847249.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
const _sfc_main = {
  __name: "ForgotPassword",
  __ssrInlineRender: true,
  props: {
    status: String
  },
  setup(__props) {
    const form = useForm({
      input_type: ""
    });
    const submit = () => {
      form.post(route("password.email"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Forgot Password" }, null, _parent2, _scopeId));
            _push2(`<div class="mb-4 text-sm text-gray-600"${_scopeId}> Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one. </div>`);
            if (__props.status) {
              _push2(`<div class="mb-4 font-medium text-sm text-green-600"${_scopeId}>${ssrInterpolate(__props.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              for: "input_type",
              value: "Email / Username"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "input_type",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).input_type,
              "onUpdate:modelValue": ($event) => unref(form).input_type = $event,
              required: "",
              autofocus: "",
              autocomplete: "username"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.username
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "mt-2",
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center justify-end mt-4"${_scopeId}><button class="${ssrRenderClass([{ "opacity-25": unref(form).processing }, "btn btn-success"])}"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}> Email Password Reset Link </button></div></form>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Forgot Password" }),
              createVNode("div", { class: "mb-4 text-sm text-gray-600" }, " Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one. "),
              __props.status ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-4 font-medium text-sm text-green-600"
              }, toDisplayString(__props.status), 1)) : createCommentVNode("", true),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", null, [
                  createVNode(_sfc_main$2, {
                    for: "input_type",
                    value: "Email / Username"
                  }),
                  createVNode(_sfc_main$3, {
                    id: "input_type",
                    type: "text",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).input_type,
                    "onUpdate:modelValue": ($event) => unref(form).input_type = $event,
                    required: "",
                    autofocus: "",
                    autocomplete: "username"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$4, {
                    class: "mt-2",
                    message: unref(form).errors.username
                  }, null, 8, ["message"]),
                  createVNode(_sfc_main$4, {
                    class: "mt-2",
                    message: unref(form).errors.email
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "flex items-center justify-end mt-4" }, [
                  createVNode("button", {
                    class: ["btn btn-success", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing
                  }, " Email Password Reset Link ", 10, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ForgotPassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
