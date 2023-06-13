import { ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext, createVNode, resolveDynamicComponent, openBlock, createBlock, Fragment, renderList, createCommentVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderSlot, ssrRenderList, ssrRenderClass, ssrRenderVNode } from "vue/server-renderer";
import { Link, usePage, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$2, a as _sfc_main$3, H as Hamburger } from "./Hamburger-c1553109.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.mjs";
import _sfc_main$4 from "./UsersDatatable-e83f2312.mjs";
import _sfc_main$5 from "./PostsDatatable-e1013218.mjs";
import _sfc_main$6 from "./CommentsDatatable-573b5ad1.mjs";
import _sfc_main$7 from "./RepliesDatatable-3919e491.mjs";
import _sfc_main$8 from "./PublicMessagesDatatable-4b1b5899.mjs";
import "./Dropdown-d2a4ee41.mjs";
import "sweetalert";
import "datatables.net-vue3";
import "datatables.net";
import "datatables.net-select";
import "datatables.net-responsive";
const DashboardLayout_vue_vue_type_style_index_0_scoped_888d66c5_lang = "";
const _sfc_main$1 = {
  __name: "DashboardLayout",
  __ssrInlineRender: true,
  props: {
    joined_chat_groups: {
      type: Array,
      default: []
    }
  },
  setup(__props) {
    const showNav = ref(false);
    const toggleNav = () => {
      showNav.value = !showNav.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-white text-black" }, _attrs))} data-v-888d66c5><header class="flex items-center justify-between h-20 bg-zinc-100 py-2 px-4 sm:px-6 lg:px-8" data-v-888d66c5>`);
      _push(ssrRenderComponent(unref(Link), {
        class: "text-zinc-900 font-bold text-xl",
        href: _ctx.route("home")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$page.props.appName)}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$page.props.appName), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$2, { horizontal: true }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        horizontal: true,
        dark: true
      }, null, _parent));
      if (_ctx.$page.props.auth.user.profile_photo_url) {
        _push(`<img class="rounded-full w-14 h-14 md:w-16 md:h-16"${ssrRenderAttr("src", _ctx.$page.props.auth.user.profile_photo_url)}${ssrRenderAttr("alt", _ctx.$page.props.words.profile_photo)} data-v-888d66c5>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(Hamburger, {
        class: "md:hidden",
        onClose: toggleNav,
        show: showNav.value,
        dark: true
      }, null, _parent));
      if (showNav.value) {
        _push(`<div class="md:hidden fixed inset-y-0 left-0 z-40 w-full h-screen bg-zinc-200 shadow-lg px-8 py-4 overflow-y-auto" data-v-888d66c5><h2 class="text-xl font-bold mb-2" data-v-888d66c5>${ssrInterpolate(_ctx.$page.props.words.navigation_bar)}</h2>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          class: "pb-4",
          vertical: true,
          dark: true
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$2, {
          class: "border-t",
          vertical: true
        }, null, _parent));
        _push(`<div class="py-2 border-b" data-v-888d66c5>`);
        _push(ssrRenderComponent(unref(Link), {
          class: "bg-red-600 text-gray-200 hover:font-bold hover:text-white py-1 px-3 rounded-lg",
          href: _ctx.route("logout"),
          method: "post",
          as: "button"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$page.props.words.log_out)}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$page.props.words.log_out), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><button class="mt-4 px-3 py-1 bg-zinc-900 text-white hover:font-bold rounded-md" data-v-888d66c5>${ssrInterpolate(_ctx.$page.props.words.close)}</button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showNav.value) {
        _push(`<div class="fixed inset-0 bg-black opacity-25 z-30" data-v-888d66c5></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header><main class="lg:container lg:mx-auto" data-v-888d66c5><div class="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 lg:gap-10" data-v-888d66c5><div class="hidden md:block" data-v-888d66c5>`);
      ssrRenderSlot(_ctx.$slots, "left-sidebar", {}, () => {
        _push(`<div class="py-2 border-t" data-v-888d66c5>`);
        _push(ssrRenderComponent(unref(Link), {
          class: "bg-red-600 text-gray-100 hover:text-white hover:font-bold py-1 px-3 rounded-lg",
          href: _ctx.route("logout"),
          method: "post",
          as: "button"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$page.props.words.log_out)}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$page.props.words.log_out), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }, _push, _parent);
      _push(`</div><section class="md:col-span-2" data-v-888d66c5>`);
      ssrRenderSlot(_ctx.$slots, "content", {}, null, _push, _parent);
      _push(`</section><div class="hidden" data-v-888d66c5>`);
      ssrRenderSlot(_ctx.$slots, "right-sidebar", {}, null, _push, _parent);
      _push(`</div></div></main></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/DashboardLayout.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const DashboardLayout = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-888d66c5"]]);
const Index_vue_vue_type_style_index_0_scoped_4d16696c_lang = "";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  setup(__props) {
    const props = __props;
    const currentTab = ref("Users");
    const tabs = {
      Users: _sfc_main$4,
      Posts: _sfc_main$5,
      Comments: _sfc_main$6,
      Replies: _sfc_main$7,
      "Public Messages": _sfc_main$8
    };
    const { props: properities } = usePage();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-4d16696c${_scopeId}>${ssrInterpolate(unref(properities).words.dashboard)}</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(unref(properities).words.dashboard), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(DashboardLayout, null, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<main data-v-4d16696c${_scopeId}>`);
            if (props.data != null) {
              _push2(`<section class="bg-zinc-900 py-4 rounded-md text-white" data-v-4d16696c${_scopeId}><h2 class="text-lg px-2" data-v-4d16696c${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.data)}</h2><section class="bg-zinc-700 p-2 rounded-lg" data-v-4d16696c${_scopeId}><!--[-->`);
              ssrRenderList(props.data, (value, key) => {
                _push2(`<div class="bg-slate-800 px-2 py-1 rounded-md my-2" data-v-4d16696c${_scopeId}>${ssrInterpolate(key)}: ${ssrInterpolate(value)}</div>`);
              });
              _push2(`<!--]--></section></section>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<section class="py-2 my-4 mx-auto w-full md:w-[80vw] overflow-x-auto pl-32 sm:pl-0" data-v-4d16696c${_scopeId}><div class="flex items-center justify-center gap-2" data-v-4d16696c${_scopeId}><!--[-->`);
            ssrRenderList(tabs, (_2, tab) => {
              _push2(`<button class="${ssrRenderClass([["tab-button", { active: currentTab.value === tab }], "bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-l-lg"])}" data-v-4d16696c${_scopeId}>${ssrInterpolate(tab)}</button>`);
            });
            _push2(`<!--]--></div></section>`);
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(tabs[currentTab.value]), null, null), _parent2, _scopeId);
            _push2(`</main>`);
          } else {
            return [
              createVNode("main", null, [
                props.data != null ? (openBlock(), createBlock("section", {
                  key: 0,
                  class: "bg-zinc-900 py-4 rounded-md text-white"
                }, [
                  createVNode("h2", { class: "text-lg px-2" }, toDisplayString(_ctx.$page.props.words.data), 1),
                  createVNode("section", { class: "bg-zinc-700 p-2 rounded-lg" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(props.data, (value, key) => {
                      return openBlock(), createBlock("div", { class: "bg-slate-800 px-2 py-1 rounded-md my-2" }, toDisplayString(key) + ": " + toDisplayString(value), 1);
                    }), 256))
                  ])
                ])) : createCommentVNode("", true),
                createVNode("section", { class: "py-2 my-4 mx-auto w-full md:w-[80vw] overflow-x-auto pl-32 sm:pl-0" }, [
                  createVNode("div", { class: "flex items-center justify-center gap-2" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(tabs, (_2, tab) => {
                      return createVNode("button", {
                        class: ["bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-l-lg", ["tab-button", { active: currentTab.value === tab }]],
                        key: tab,
                        onClick: ($event) => currentTab.value = tab
                      }, toDisplayString(tab), 11, ["onClick"]);
                    }), 64))
                  ])
                ]),
                (openBlock(), createBlock(resolveDynamicComponent(tabs[currentTab.value])))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4d16696c"]]);
export {
  Index as default
};
