import { mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext, createVNode, openBlock, createBlock, Fragment, renderList } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$3 } from "./Dropdown-d2a4ee41.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.mjs";
const _sfc_main$2 = {
  __name: "Navigations",
  __ssrInlineRender: true,
  props: {
    horizontal: {
      tpye: Boolean,
      default: false
    },
    vertical: {
      tpye: Boolean,
      default: false
    },
    dark: {
      tpye: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const user = usePage().props.auth.user;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({
        class: {
          "hidden md:flex items-center justify-center gap-2": props.horizontal,
          "flex flex-col space-y-2 px-4": props.vertical
        }
      }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("home"),
        class: ["text-gray-100 hover:text-white hover:font-bold", {
          "text-zinc-700 hover:text-zinc-800": props.dark,
          "underline text-white font-bold": _ctx.route().current("home") || _ctx.route().current("home")
        }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$page.props.words.home)}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$page.props.words.home), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("public.chat.index"),
        class: ["text-gray-100 hover:text-white hover:font-bold", {
          "text-zinc-700 hover:text-zinc-800": props.dark,
          "underline text-white font-bold": _ctx.route().current("public.chat.index")
        }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$page.props.words.public_chat)}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$page.props.words.public_chat), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("rooms.index"),
        class: ["text-gray-100 hover:text-white hover:font-bold", {
          "text-zinc-700 hover:text-zinc-800": props.dark,
          "underline text-white font-bold": _ctx.route().current("rooms.*")
        }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$page.props.words.rooms)}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$page.props.words.rooms), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("project.index"),
        class: ["text-gray-100 hover:text-white hover:font-bold", {
          "text-zinc-700 hover:text-zinc-800": props.dark,
          "underline text-white font-bold": _ctx.route().current("project.*")
        }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$page.props.words.projects)}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$page.props.words.projects), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(user).type == "super admin") {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("dashboard.index"),
          class: ["text-gray-100 hover:text-white hover:font-bold", {
            "text-zinc-700 hover:text-zinc-800": props.dark,
            "underline text-white font-bold": _ctx.route().current("dashboard.index")
          }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$page.props.words.dashboard)}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$page.props.words.dashboard), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("profile.edit"),
        class: ["text-gray-100 hover:text-white hover:font-bold", {
          "text-zinc-700 hover:text-zinc-800": props.dark,
          "underline text-white font-bold": _ctx.route().current("profile.edit")
        }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$page.props.words.settings)}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$page.props.words.settings), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("user.profile.me"),
        class: ["text-gray-100 hover:text-white hover:font-bold", {
          "text-zinc-700 hover:text-zinc-800": props.dark,
          "underline text-white font-bold": _ctx.route().current("user.profile.me")
        }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$page.props.words.my_profile)}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$page.props.words.my_profile), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("chat.groups.index"),
        class: ["md:hidden text-gray-100 hover:text-white hover:font-bold", {
          "text-zinc-700 hover:text-zinc-800": props.dark,
          "underline text-white font-bold": _ctx.route().current("chat.groups.index")
        }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$page.props.words.chat_groups)}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$page.props.words.chat_groups), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Navigations.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "Locales",
  __ssrInlineRender: true,
  props: {
    horizontal: {
      tpye: Boolean,
      default: false
    },
    vertical: {
      tpye: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: {
          "hidden md:flex items-center space-x-2 relative": props.horizontal,
          "py-2 my-2 border-b flex justify-between items-center": props.vertical
        }
      }, _attrs))}><p>${ssrInterpolate(_ctx.$page.props.words.choose_locale)}</p>`);
      _push(ssrRenderComponent(_sfc_main$3, { width: "48" }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="inline-flex rounded-md"${_scopeId}><button type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"${_scopeId}><svg class="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"${_scopeId}></path></svg></button></span>`);
          } else {
            return [
              createVNode("span", { class: "inline-flex rounded-md" }, [
                createVNode("button", {
                  type: "button",
                  class: "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                }, [
                  (openBlock(), createBlock("svg", {
                    class: "ml-2 -mr-0.5 h-4 w-4",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 20 20",
                    fill: "currentColor"
                  }, [
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                      "clip-rule": "evenodd"
                    })
                  ]))
                ])
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(_ctx.$page.props.locales, (locale) => {
              _push2(`<a class="flex justify-between p-2 text-gray-900 hover:text-white bg-white hover:bg-zinc-900"${ssrRenderAttr("href", locale.url)}${ssrRenderAttr("lang", locale.code)}${_scopeId}><span${_scopeId}>${ssrInterpolate(locale.native)}</span><span${_scopeId}>${ssrInterpolate(locale.emoji)}</span></a>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(_ctx.$page.props.locales, (locale) => {
                return openBlock(), createBlock("a", {
                  class: "flex justify-between p-2 text-gray-900 hover:text-white bg-white hover:bg-zinc-900",
                  key: locale.code,
                  href: locale.url,
                  lang: locale.code
                }, [
                  createVNode("span", null, toDisplayString(locale.native), 1),
                  createVNode("span", null, toDisplayString(locale.emoji), 1)
                ], 8, ["href", "lang"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Locales.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Hamburger_vue_vue_type_style_index_0_scoped_a78159de_lang = "";
const _sfc_main = {
  __name: "Hamburger",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    dark: {
      tpye: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: ["hamburger-icon", { active: __props.show }]
      }, _attrs))} data-v-a78159de><span class="${ssrRenderClass([{ "bg-black": props.dark }, "bar bg-white"])}" data-v-a78159de></span><span class="${ssrRenderClass([{ "bg-black": props.dark }, "bar bg-white"])}" data-v-a78159de></span><span class="${ssrRenderClass([{ "bg-black": props.dark }, "bar bg-white"])}" data-v-a78159de></span></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Hamburger.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Hamburger = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a78159de"]]);
export {
  Hamburger as H,
  _sfc_main$1 as _,
  _sfc_main$2 as a
};
