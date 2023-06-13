import { ref, unref, withCtx, createTextVNode, toDisplayString, createVNode, withDirectives, isRef, openBlock, createBlock, Fragment, renderList, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { A as AuthLayout } from "./AuthLayout-a31bd95f.mjs";
import { Head, Link } from "@inertiajs/vue3";
import "./Hamburger-c1553109.mjs";
import "./Dropdown-d2a4ee41.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./TextInput-66ab7a8d.mjs";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    projects: {
      type: Array,
      default: []
    }
  },
  setup(__props) {
    const props = __props;
    let selectedProject = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$page.props.words.projects
      }, null, _parent));
      _push(ssrRenderComponent(AuthLayout, null, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-zinc-800 rounded-lg text-white"${_scopeId}><div class="overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="container mx-auto"${_scopeId}><section class="flex flex-col py-2 px-4 my-2 mx-4"${_scopeId}><label for="project" class="block font-medium"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.projects)}:</label><select id="project" class="block w-full text-black mt-1 rounded-md shadow-sm border-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"${_scopeId}><option value="" disabled${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.please_select)}</option><!--[-->`);
            ssrRenderList(unref(props).projects, (project) => {
              _push2(`<option${ssrRenderAttr("id", project.id)}${ssrRenderAttr("value", project.slug)} class="bg-zinc-800 hover:bg-zinc-800 text-gray-100 hover:text-white"${_scopeId}>${ssrInterpolate(project.code)} - ${ssrInterpolate(project.name)}</option>`);
            });
            _push2(`<!--]--></select>`);
            _push2(ssrRenderComponent(unref(Link), {
              class: "btn btn-primary w-36 h-10 mx-auto my-2",
              href: _ctx.route("project.show", unref(selectedProject))
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$page.props.words.show_project)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$page.props.words.show_project), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</section></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "bg-zinc-800 rounded-lg text-white" }, [
                createVNode("div", { class: "overflow-hidden shadow-sm sm:rounded-lg" }, [
                  createVNode("div", { class: "container mx-auto" }, [
                    createVNode("section", { class: "flex flex-col py-2 px-4 my-2 mx-4" }, [
                      createVNode("label", {
                        for: "project",
                        class: "block font-medium"
                      }, toDisplayString(_ctx.$page.props.words.projects) + ":", 1),
                      withDirectives(createVNode("select", {
                        id: "project",
                        "onUpdate:modelValue": ($event) => isRef(selectedProject) ? selectedProject.value = $event : selectedProject = $event,
                        class: "block w-full text-black mt-1 rounded-md shadow-sm border-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      }, [
                        createVNode("option", {
                          value: "",
                          disabled: ""
                        }, toDisplayString(_ctx.$page.props.words.please_select), 1),
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(props).projects, (project) => {
                          return openBlock(), createBlock("option", {
                            id: project.id,
                            value: project.slug,
                            class: "bg-zinc-800 hover:bg-zinc-800 text-gray-100 hover:text-white"
                          }, toDisplayString(project.code) + " - " + toDisplayString(project.name), 9, ["id", "value"]);
                        }), 256))
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, unref(selectedProject)]
                      ]),
                      createVNode(unref(Link), {
                        class: "btn btn-primary w-36 h-10 mx-auto my-2",
                        href: _ctx.route("project.show", unref(selectedProject))
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$page.props.words.show_project), 1)
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ])
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Project/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
