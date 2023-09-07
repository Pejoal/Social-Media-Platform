import { unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { A as AuthLayout } from "./AuthLayout-18ded6d5.mjs";
import { P as Post } from "./Post-53712adf.mjs";
import { Head } from "@inertiajs/vue3";
import "./Hamburger-c1553109.mjs";
import "./Dropdown-d2a4ee41.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./TextInput-66ab7a8d.mjs";
import "sweetalert";
import "./Loading-c0e5699a.mjs";
import "./utils-a971894e.mjs";
const _sfc_main = {
  __name: "Post",
  __ssrInlineRender: true,
  props: {
    post: Object
  },
  setup(__props) {
    const props = __props;
    const back = () => {
      window.history.back();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.post_details)}</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(_ctx.$page.props.words.post_details), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AuthLayout, null, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (props.post) {
              _push2(`<section class="pt-2 pb-4 text-white bg-zinc-800 rounded-lg"${_scopeId}>`);
              _push2(ssrRenderComponent(Post, {
                post: props.post
              }, null, _parent2, _scopeId));
              _push2(`<button class="ml-6 btn btn-warning"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.back)}</button></section>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              props.post ? (openBlock(), createBlock("section", {
                key: 0,
                class: "pt-2 pb-4 text-white bg-zinc-800 rounded-lg"
              }, [
                createVNode(Post, {
                  post: props.post
                }, null, 8, ["post"]),
                createVNode("button", {
                  class: "ml-6 btn btn-warning",
                  onClick: back
                }, toDisplayString(_ctx.$page.props.words.back), 1)
              ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Post.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
