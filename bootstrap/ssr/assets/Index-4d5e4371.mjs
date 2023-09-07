import { ref, unref, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderVNode } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-9e25e56d.mjs";
import { Head } from "@inertiajs/vue3";
import Home from "./Home-9cb577a9.mjs";
import Posts from "./Posts-a22bfe22.mjs";
import Archive from "./Archive-74f7d056.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./ApplicationLogo-8b847249.mjs";
import "./Dropdown-d2a4ee41.mjs";
const Index_vue_vue_type_style_index_0_scoped_65bae740_lang = "";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  setup(__props) {
    const currentTab = ref("Home");
    const tabs = {
      Home,
      Posts,
      Archive
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Dynamic Components" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight" data-v-65bae740${_scopeId}> Dynamic Components </h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " Dynamic Components ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="demo" data-v-65bae740${_scopeId}><!--[-->`);
            ssrRenderList(tabs, (_2, tab) => {
              _push2(`<button class="${ssrRenderClass(["tab-button", { active: currentTab.value === tab }])}" data-v-65bae740${_scopeId}>${ssrInterpolate(tab)}</button>`);
            });
            _push2(`<!--]-->`);
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(tabs[currentTab.value]), { class: "tab" }, null), _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "demo" }, [
                (openBlock(), createBlock(Fragment, null, renderList(tabs, (_2, tab) => {
                  return createVNode("button", {
                    key: tab,
                    class: ["tab-button", { active: currentTab.value === tab }],
                    onClick: ($event) => currentTab.value = tab
                  }, toDisplayString(tab), 11, ["onClick"]);
                }), 64)),
                (openBlock(), createBlock(resolveDynamicComponent(tabs[currentTab.value]), { class: "tab" }))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dynamic/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-65bae740"]]);
export {
  Index as default
};
