import { ref, unref, withCtx, createVNode, openBlock, createBlock, withModifiers, withDirectives, vModelText, toDisplayString, Transition, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { A as AuthLayout } from "./AuthLayout-18ded6d5.mjs";
import { usePage, useForm, Head } from "@inertiajs/vue3";
import { a as _sfc_main$2 } from "./TextInput-66ab7a8d.mjs";
import { _ as _sfc_main$1 } from "./InputLabel-bc2d8356.mjs";
import "./Hamburger-c1553109.mjs";
import "./Dropdown-d2a4ee41.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    comment: Object
  },
  setup(__props) {
    const props = __props;
    const { props: properities } = usePage();
    const form = useForm({
      content: props.comment.content
    });
    let contentInput = ref(null);
    const updateComment = () => {
      form.patch(route("comments.update", props.comment.id), {
        preserveScroll: true,
        onSuccess: () => form.reset(),
        onError: () => {
          if (form.errors.content) {
            form.reset("content");
            contentInput.value.focus();
          }
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: unref(properities).words.comments
      }, null, _parent));
      _push(ssrRenderComponent(AuthLayout, null, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>`);
            if (__props.comment) {
              _push2(`<section class="bg-zinc-800 text-white rounded-lg p-3 mb-2"${_scopeId}><form class="mt-6 space-y-6 p-2"${_scopeId}><div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                class: "text-white",
                for: "content",
                value: "Comment"
              }, null, _parent2, _scopeId));
              _push2(`<textarea id="content" type="text" class="block w-full rounded-md h-32 mt-1 text-black"${_scopeId}>${ssrInterpolate(unref(form).content)}</textarea><div class="text-lime-500"${_scopeId}>${ssrInterpolate(__props.comment.created_at)}</div>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                message: unref(form).errors.content,
                class: "mt-2"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="btn btn-success"${_scopeId}><button${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.update)}</button>`);
              if (unref(form).recentlySuccessful) {
                _push2(`<p class="text-sm text-gray-600"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.updated)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></form></section>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                __props.comment ? (openBlock(), createBlock("section", {
                  key: 0,
                  class: "bg-zinc-800 text-white rounded-lg p-3 mb-2"
                }, [
                  createVNode("form", {
                    onSubmit: withModifiers(updateComment, ["prevent"]),
                    class: "mt-6 space-y-6 p-2"
                  }, [
                    createVNode("div", null, [
                      createVNode(_sfc_main$1, {
                        class: "text-white",
                        for: "content",
                        value: "Comment"
                      }),
                      withDirectives(createVNode("textarea", {
                        id: "content",
                        type: "text",
                        class: "block w-full rounded-md h-32 mt-1 text-black",
                        "onUpdate:modelValue": ($event) => unref(form).content = $event,
                        ref: unref(contentInput)
                      }, "\n              ", 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).content]
                      ]),
                      createVNode("div", { class: "text-lime-500" }, toDisplayString(__props.comment.created_at), 1),
                      createVNode(_sfc_main$2, {
                        message: unref(form).errors.content,
                        class: "mt-2"
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "btn btn-success" }, [
                      createVNode("button", {
                        disabled: unref(form).processing
                      }, toDisplayString(_ctx.$page.props.words.update), 9, ["disabled"]),
                      createVNode(Transition, {
                        "enter-from-class": "opacity-0",
                        "leave-to-class": "opacity-0",
                        class: "transition ease-in-out"
                      }, {
                        default: withCtx(() => [
                          unref(form).recentlySuccessful ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-gray-600"
                          }, toDisplayString(_ctx.$page.props.words.updated), 1)) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ])
                  ], 40, ["onSubmit"])
                ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Comments/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
