import { unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseEqual, ssrRenderStyle } from "vue/server-renderer";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./TextInput-66ab7a8d.mjs";
import { _ as _sfc_main$1 } from "./InputLabel-bc2d8356.mjs";
import { usePage, useForm, Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "UpdateProfileInformationForm",
  __ssrInlineRender: true,
  props: {
    mustVerifyEmail: Boolean,
    status: String
  },
  setup(__props) {
    const props = __props;
    const user = usePage().props.auth.user;
    const form = useForm({
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      gender: user.gender,
      email: user.email
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(_attrs)}><header><h2 class="text-lg font-medium text-white">${ssrInterpolate(_ctx.$page.props.words.profile_information)}</h2><p class="mt-1 text-sm text-slate-200">${ssrInterpolate(_ctx.$page.props.words.update_your_account_profile_information_and_email_address)}</p></header><form class="mt-6 space-y-6"><div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "firstname",
        value: _ctx.$page.props.words.firstname
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "firstname",
        type: "text",
        class: "mt-1 block w-full",
        modelValue: unref(form).firstname,
        "onUpdate:modelValue": ($event) => unref(form).firstname = $event,
        required: "",
        autofocus: "",
        autocomplete: "firstname"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: unref(form).errors.firstname
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "lastname",
        value: _ctx.$page.props.words.lastname
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "lastname",
        type: "text",
        class: "mt-1 block w-full",
        modelValue: unref(form).lastname,
        "onUpdate:modelValue": ($event) => unref(form).lastname = $event,
        required: "",
        autofocus: "",
        autocomplete: "lastname"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: unref(form).errors.lastname
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "username",
        value: _ctx.$page.props.words.username
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "username",
        type: "text",
        class: "mt-1 block w-full",
        modelValue: unref(form).username,
        "onUpdate:modelValue": ($event) => unref(form).username = $event,
        required: "",
        autofocus: "",
        autocomplete: "username"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: unref(form).errors.username
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        value: _ctx.$page.props.words.gender
      }, null, _parent));
      _push(`<div class="flex justify-center gap-12"><section><input type="radio" id="male" value="male"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).gender, "male")) ? " checked" : ""}><label class="ml-2" for="male">${ssrInterpolate(_ctx.$page.props.words.male)}</label></section><section><input type="radio" id="female" value="female"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).gender, "female")) ? " checked" : ""}><label class="ml-2" for="female">${ssrInterpolate(_ctx.$page.props.words.female)}</label></section></div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: unref(form).errors.gender
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "email",
        value: _ctx.$page.props.words.email
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "email",
        type: "email",
        class: "mt-1 block w-full",
        modelValue: unref(form).email,
        "onUpdate:modelValue": ($event) => unref(form).email = $event,
        required: "",
        autocomplete: "email"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "mt-2",
        message: unref(form).errors.email
      }, null, _parent));
      _push(`</div>`);
      if (props.mustVerifyEmail && unref(user).email_verified_at === null) {
        _push(`<div><p class="text-sm mt-2 text-gray-50">${ssrInterpolate(_ctx.$page.props.words.your_email_address_is_unverified)} `);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("verification.send"),
          method: "post",
          as: "button",
          class: "underline text-sm text-gray-200 hover:text-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$page.props.words.click_here_to_re_send_the_verification_email)}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$page.props.words.click_here_to_re_send_the_verification_email), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</p><div style="${ssrRenderStyle(props.status === "verification-link-sent" ? null : { display: "none" })}" class="mt-2 font-medium text-sm text-green-600">${ssrInterpolate(_ctx.$page.props.words.a_new_verification_link_has_been_sent_to_your_email_address)}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center gap-4"><button class="btn btn-success"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}>${ssrInterpolate(_ctx.$page.props.words.save)}</button>`);
      if (unref(form).recentlySuccessful) {
        _push(`<p class="text-sm text-gray-100">${ssrInterpolate(_ctx.$page.props.words.saved)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></form></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/UpdateProfileInformationForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
