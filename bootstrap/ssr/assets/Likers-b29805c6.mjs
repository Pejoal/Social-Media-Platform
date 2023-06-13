import { ref, unref, withCtx, openBlock, createBlock, Fragment, renderList, createVNode, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { A as AuthLayout } from "./AuthLayout-a31bd95f.mjs";
import { Head } from "@inertiajs/vue3";
import { u as useFetch } from "./utils-a971894e.mjs";
import { L as Loading } from "./Loading-c0e5699a.mjs";
import "./Hamburger-c1553109.mjs";
import "./Dropdown-d2a4ee41.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./TextInput-66ab7a8d.mjs";
const _sfc_main = {
  __name: "Likers",
  __ssrInlineRender: true,
  props: {
    likers: {
      type: Array,
      default: []
    },
    object: {
      type: String,
      default: ""
    },
    objectId: {
      type: Number,
      default: 0
    },
    object2Id: {
      type: Number,
      default: 0
    }
  },
  setup(__props) {
    const props = __props;
    let allLikers = ref([]);
    let page = ref(2);
    let loading = ref(false);
    if (props.object === "post") {
      ({ data: allLikers = props.likers, loading } = useFetch(
        route("posts.likes", props.objectId),
        page,
        props.likers
      ));
    } else if (props.object === "comment") {
      ({ data: allLikers = props.likers, loading } = useFetch(
        route("comments.likes", props.objectId),
        page,
        props.likers
      ));
    } else if (props.object === "reply") {
      ({ data: allLikers = props.likers, loading } = useFetch(
        route("comments.replies.likes", [props.objectId, props.object2Id]),
        page,
        props.likers
      ));
    }
    const back = () => {
      window.history.back();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Likers" }, null, _parent));
      _push(ssrRenderComponent(AuthLayout, null, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.likers.length) {
              _push2(`<div class="bg-zinc-800 px-2 py-4 rounded-lg"${_scopeId}><!--[-->`);
              ssrRenderList(unref(allLikers), (liker) => {
                _push2(`<section class="flex flex-col gap-2 my-2 py-6 px-4 bg-zinc-700 rounded-md"${_scopeId}><p${_scopeId}><span class="font-bold"${_scopeId}>${ssrInterpolate(liker.name)}</span></p></section>`);
              });
              _push2(`<!--]--><button class="ml-6 btn btn-warning"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.back)}</button></div>`);
            } else {
              _push2(`<div${_scopeId}>No Likers Yet...</div>`);
            }
            if (unref(loading)) {
              _push2(ssrRenderComponent(Loading, null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              __props.likers.length ? (openBlock(), createBlock("div", {
                key: 0,
                class: "bg-zinc-800 px-2 py-4 rounded-lg"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(allLikers), (liker) => {
                  return openBlock(), createBlock("section", {
                    key: liker.id,
                    class: "flex flex-col gap-2 my-2 py-6 px-4 bg-zinc-700 rounded-md"
                  }, [
                    createVNode("p", null, [
                      createVNode("span", { class: "font-bold" }, toDisplayString(liker.name), 1)
                    ])
                  ]);
                }), 128)),
                createVNode("button", {
                  class: "ml-6 btn btn-warning",
                  onClick: back
                }, toDisplayString(_ctx.$page.props.words.back), 1)
              ])) : (openBlock(), createBlock("div", { key: 1 }, "No Likers Yet...")),
              unref(loading) ? (openBlock(), createBlock(Loading, { key: 2 })) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Shared/Likers.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
