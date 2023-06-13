import { computed, withCtx, unref, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./GuestLayout-78bf0cd4.mjs";
import { useForm, Head, Link } from "@inertiajs/vue3";
import "./ApplicationLogo-8b847249.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
const _sfc_main = {
  __name: "VerifyEmail",
  __ssrInlineRender: true,
  props: {
    status: String
  },
  setup(__props) {
    const props = __props;
    const form = useForm({});
    const submit = () => {
      form.post(route("verification.send"));
    };
    const verificationLinkSent = computed(
      () => props.status === "verification-link-sent"
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Email Verification" }, null, _parent2, _scopeId));
            _push2(`<div class="my-2 text-gray-200"${_scopeId}> Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn&#39;t receive the email, we will gladly send you another. </div>`);
            if (unref(verificationLinkSent)) {
              _push2(`<div class="my-2 font-medium text-sm text-green-700"${_scopeId}> A new verification link has been sent to the email address you provided during registration. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form${_scopeId}><div class="mt-4 flex items-center justify-between"${_scopeId}><button class="${ssrRenderClass([{ "opacity-25": unref(form).processing }, "btn btn-primary"])}"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}> Resend Verification Email </button>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              class: "underline ml-3 text-gray-200 hover:text-white bg-red-600 px-2 py-1 rounded-md"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Log Out`);
                } else {
                  return [
                    createTextVNode("Log Out")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Email Verification" }),
              createVNode("div", { class: "my-2 text-gray-200" }, " Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another. "),
              unref(verificationLinkSent) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "my-2 font-medium text-sm text-green-700"
              }, " A new verification link has been sent to the email address you provided during registration. ")) : createCommentVNode("", true),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", { class: "mt-4 flex items-center justify-between" }, [
                  createVNode("button", {
                    class: ["btn btn-primary", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing
                  }, " Resend Verification Email ", 10, ["disabled"]),
                  createVNode(unref(Link), {
                    href: _ctx.route("logout"),
                    method: "post",
                    as: "button",
                    class: "underline ml-3 text-gray-200 hover:text-white bg-red-600 px-2 py-1 rounded-md"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Log Out")
                    ]),
                    _: 1
                  }, 8, ["href"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/VerifyEmail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
