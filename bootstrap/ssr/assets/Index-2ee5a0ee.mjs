import { ref, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, useSSRContext, watch, withModifiers, withDirectives, vModelText, vModelCheckbox, Fragment, renderList } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderSlot, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderList } from "vue/server-renderer";
import { A as ApplicationLogo } from "./ApplicationLogo-8b847249.mjs";
import { _ as _sfc_main$3 } from "./Dropdown-d2a4ee41.mjs";
import { _ as _sfc_main$2, a as _sfc_main$4, b as _sfc_main$5 } from "./ResponsiveNavLink-e9956cf9.mjs";
import { Link, useForm, Head } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
const _sfc_main$1 = {
  __name: "CenteralLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const showingNavigationDropdown = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="min-h-screen bg-gray-100 dark:bg-gray-900"><nav class="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between h-16"><div class="flex"><div class="shrink-0 flex items-center">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("centeral.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(ApplicationLogo, { class: "block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(ApplicationLogo, { class: "block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        href: _ctx.route("centeral.index"),
        class: "text-white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Dashboard `);
          } else {
            return [
              createTextVNode(" Dashboard ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="hidden sm:flex sm:items-center sm:ml-6"><div class="ml-3 relative">`);
      _push(ssrRenderComponent(_sfc_main$3, {
        align: "right",
        width: "48"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="inline-flex rounded-md"${_scopeId}><button type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.user.firstname)} <svg class="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"${_scopeId}></path></svg></button></span>`);
          } else {
            return [
              createVNode("span", { class: "inline-flex rounded-md" }, [
                createVNode("button", {
                  type: "button",
                  class: "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                }, [
                  createTextVNode(toDisplayString(_ctx.$page.props.auth.user.firstname) + " ", 1),
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
            _push2(ssrRenderComponent(_sfc_main$4, {
              href: _ctx.route("profile.edit")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Profile `);
                } else {
                  return [
                    createTextVNode(" Profile ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              href: _ctx.route("logout"),
              method: "post",
              as: "button"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Log Out `);
                } else {
                  return [
                    createTextVNode(" Log Out ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$4, {
                href: _ctx.route("profile.edit")
              }, {
                default: withCtx(() => [
                  createTextVNode(" Profile ")
                ]),
                _: 1
              }, 8, ["href"]),
              createVNode(_sfc_main$4, {
                href: _ctx.route("logout"),
                method: "post",
                as: "button"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Log Out ")
                ]),
                _: 1
              }, 8, ["href"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="-mr-2 flex items-center sm:hidden"><button class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"><svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path class="${ssrRenderClass({
        hidden: showingNavigationDropdown.value,
        "inline-flex": !showingNavigationDropdown.value
      })}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path><path class="${ssrRenderClass({
        hidden: !showingNavigationDropdown.value,
        "inline-flex": showingNavigationDropdown.value
      })}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div></div><div class="${ssrRenderClass([{ block: showingNavigationDropdown.value, hidden: !showingNavigationDropdown.value }, "sm:hidden"])}"><div class="pt-2 pb-3 space-y-1">`);
      _push(ssrRenderComponent(_sfc_main$5, {
        href: _ctx.route("centeral.index"),
        class: "text-white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Dashboard `);
          } else {
            return [
              createTextVNode(" Dashboard ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600"><div class="px-4"><div class="font-medium text-base text-gray-800 dark:text-gray-200">${ssrInterpolate(_ctx.$page.props.auth.user.firstname)}</div><div class="font-medium text-sm text-gray-500">${ssrInterpolate(_ctx.$page.props.auth.user.email)}</div></div><div class="mt-3 space-y-1">`);
      _push(ssrRenderComponent(_sfc_main$5, {
        href: _ctx.route("profile.edit")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Profile `);
          } else {
            return [
              createTextVNode(" Profile ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$5, {
        href: _ctx.route("logout"),
        method: "post",
        as: "button"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Log Out `);
          } else {
            return [
              createTextVNode(" Log Out ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></nav>`);
      if (_ctx.$slots.header) {
        _push(`<header class="bg-white dark:bg-gray-800 shadow"><div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">`);
        ssrRenderSlot(_ctx.$slots, "header", {}, null, _push, _parent);
        _push(`</div></header>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/CenteralLayout.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    tenants: {
      type: Array,
      default: []
    }
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      id: "",
      domain: "",
      adminName: "",
      adminEmail: "",
      password: "",
      seed: false
    });
    watch(form, (newForm) => {
      form.domain = newForm.id + ".localhost";
    });
    function createTenant() {
      form.post(route("centeral.tenant.store"), {
        preserveScroll: true,
        onSuccess: () => {
          form.reset();
        }
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Dashboard" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="conatiner mx-auto"${_scopeId}><form class="block w-full px-4"${_scopeId}><div class="flex w-full my-2"${_scopeId}><label for="id" class="text-white w-36"${_scopeId}>ID:</label><input name="id"${ssrRenderAttr("value", unref(form).id)} id="id" placeholder="id" class="rounded-md px-4 py-2 w-96"${_scopeId}></div><div class="flex w-full my-2"${_scopeId}><label for="domain" class="text-white w-36"${_scopeId}>Domain:</label><input name="domain"${ssrRenderAttr("value", unref(form).domain)} id="domain" placeholder="domain" class="rounded-md px-4 py-2 w-96"${_scopeId}></div><div class="flex w-full my-2"${_scopeId}><label for="adminEmail" class="text-white w-36"${_scopeId}>Admin Name:</label><input name="adminName"${ssrRenderAttr("value", unref(form).adminName)} id="adminName" placeholder="adminName" class="rounded-md px-4 py-2 w-96"${_scopeId}></div><div class="flex w-full my-2"${_scopeId}><label for="adminEmail" class="text-white w-36"${_scopeId}>Admin Email:</label><input name="adminEmail"${ssrRenderAttr("value", unref(form).adminEmail)} id="adminEmail" placeholder="adminEmail" class="rounded-md px-4 py-2 w-96"${_scopeId}></div><div class="flex w-full my-2"${_scopeId}><label for="password" class="text-white w-36"${_scopeId}>password:</label><input name="password" type="password"${ssrRenderAttr("value", unref(form).password)} id="password" placeholder="password" class="rounded-md px-4 py-2 w-96"${_scopeId}></div><div class="flex w-full my-2"${_scopeId}><label for="seed" class="text-white w-36"${_scopeId}>Seed:</label><input name="seed" type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).seed) ? ssrLooseContain(unref(form).seed, null) : unref(form).seed) ? " checked" : ""} id="seed"${_scopeId}></div><button type="submit" class="bg-green-600 rounded-lg text-white px-4 py-2"${_scopeId}> Create </button></form></section><section class="flex flex-col items-center justify-center p-2 text-white"${_scopeId}><section class="flex gap-[40vw] border-b p-4"${_scopeId}><th${_scopeId}>ID</th><th${_scopeId}>Domain</th></section><!--[-->`);
            ssrRenderList(props.tenants, (tenant) => {
              _push2(`<section class="flex gap-[40vw] border-b p-2"${_scopeId}><td class="px-2"${_scopeId}>${ssrInterpolate(tenant.id)}</td><td class="px-2 text-blue-500"${_scopeId}><a${ssrRenderAttr("href", "http://" + tenant.domains[0]["domain"])}${_scopeId}>${ssrInterpolate(tenant.domains[0]["domain"])}</a></td></section>`);
            });
            _push2(`<!--]--></section>`);
          } else {
            return [
              createVNode("section", { class: "conatiner mx-auto" }, [
                createVNode("form", {
                  onSubmit: withModifiers(createTenant, ["prevent"]),
                  class: "block w-full px-4"
                }, [
                  createVNode("div", { class: "flex w-full my-2" }, [
                    createVNode("label", {
                      for: "id",
                      class: "text-white w-36"
                    }, "ID:"),
                    withDirectives(createVNode("input", {
                      name: "id",
                      "onUpdate:modelValue": ($event) => unref(form).id = $event,
                      id: "id",
                      placeholder: "id",
                      class: "rounded-md px-4 py-2 w-96"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).id]
                    ])
                  ]),
                  createVNode("div", { class: "flex w-full my-2" }, [
                    createVNode("label", {
                      for: "domain",
                      class: "text-white w-36"
                    }, "Domain:"),
                    withDirectives(createVNode("input", {
                      name: "domain",
                      "onUpdate:modelValue": ($event) => unref(form).domain = $event,
                      id: "domain",
                      placeholder: "domain",
                      class: "rounded-md px-4 py-2 w-96"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).domain]
                    ])
                  ]),
                  createVNode("div", { class: "flex w-full my-2" }, [
                    createVNode("label", {
                      for: "adminEmail",
                      class: "text-white w-36"
                    }, "Admin Name:"),
                    withDirectives(createVNode("input", {
                      name: "adminName",
                      "onUpdate:modelValue": ($event) => unref(form).adminName = $event,
                      id: "adminName",
                      placeholder: "adminName",
                      class: "rounded-md px-4 py-2 w-96"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).adminName]
                    ])
                  ]),
                  createVNode("div", { class: "flex w-full my-2" }, [
                    createVNode("label", {
                      for: "adminEmail",
                      class: "text-white w-36"
                    }, "Admin Email:"),
                    withDirectives(createVNode("input", {
                      name: "adminEmail",
                      "onUpdate:modelValue": ($event) => unref(form).adminEmail = $event,
                      id: "adminEmail",
                      placeholder: "adminEmail",
                      class: "rounded-md px-4 py-2 w-96"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).adminEmail]
                    ])
                  ]),
                  createVNode("div", { class: "flex w-full my-2" }, [
                    createVNode("label", {
                      for: "password",
                      class: "text-white w-36"
                    }, "password:"),
                    withDirectives(createVNode("input", {
                      name: "password",
                      type: "password",
                      "onUpdate:modelValue": ($event) => unref(form).password = $event,
                      id: "password",
                      placeholder: "password",
                      class: "rounded-md px-4 py-2 w-96"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).password]
                    ])
                  ]),
                  createVNode("div", { class: "flex w-full my-2" }, [
                    createVNode("label", {
                      for: "seed",
                      class: "text-white w-36"
                    }, "Seed:"),
                    withDirectives(createVNode("input", {
                      name: "seed",
                      type: "checkbox",
                      "onUpdate:modelValue": ($event) => unref(form).seed = $event,
                      id: "seed"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelCheckbox, unref(form).seed]
                    ])
                  ]),
                  createVNode("button", {
                    type: "submit",
                    class: "bg-green-600 rounded-lg text-white px-4 py-2"
                  }, " Create ")
                ], 40, ["onSubmit"])
              ]),
              createVNode("section", { class: "flex flex-col items-center justify-center p-2 text-white" }, [
                createVNode("section", { class: "flex gap-[40vw] border-b p-4" }, [
                  createVNode("th", null, "ID"),
                  createVNode("th", null, "Domain")
                ]),
                (openBlock(true), createBlock(Fragment, null, renderList(props.tenants, (tenant) => {
                  return openBlock(), createBlock("section", {
                    key: tenant.id,
                    class: "flex gap-[40vw] border-b p-2"
                  }, [
                    createVNode("td", { class: "px-2" }, toDisplayString(tenant.id), 1),
                    createVNode("td", { class: "px-2 text-blue-500" }, [
                      createVNode("a", {
                        href: "http://" + tenant.domains[0]["domain"]
                      }, toDisplayString(tenant.domains[0]["domain"]), 9, ["href"])
                    ])
                  ]);
                }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Centeral/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
