import { unref, withCtx, createVNode, openBlock, createBlock, toDisplayString, withModifiers, withDirectives, vModelText, Transition, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { A as AuthLayout } from "./AuthLayout-a31bd95f.mjs";
import { usePage, useForm, Head } from "@inertiajs/vue3";
import "./TextInput-66ab7a8d.mjs";
import "./Hamburger-c1553109.mjs";
import "./Dropdown-d2a4ee41.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    reply: Object
  },
  setup(__props) {
    const props = __props;
    const { props: properities } = usePage();
    const form = useForm({
      content: props.reply.content
    });
    const updateReply = () => {
      form.patch(
        route("comments.replies.update", [props.reply.comment_id, props.reply.id]),
        {
          preserveScroll: true,
          onSuccess: () => form.reset(),
          onError: () => {
            if (form.errors.content) {
              form.reset("content");
              contentInput.value.focus();
            }
          }
        }
      );
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: unref(properities).words.edit_reply
      }, null, _parent));
      _push(ssrRenderComponent(AuthLayout, null, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}>`);
            if (__props.reply) {
              _push2(`<section class="bg-zinc-800 text-white rounded-lg p-3"${_scopeId}><h2 class="font-semibold text-white mb-3 leading-tight"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.the_reply)}</h2><form class="space-y-6 p-2"${_scopeId}><div${_scopeId}><textarea id="content" type="text" class="block w-full rounded-md h-32 mt-1 text-black"${_scopeId}>${ssrInterpolate(unref(form).content)}</textarea></div><div class="flex items-center gap-4"${_scopeId}><button class="btn btn-success"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.update)}</button>`);
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
              createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                __props.reply ? (openBlock(), createBlock("section", {
                  key: 0,
                  class: "bg-zinc-800 text-white rounded-lg p-3"
                }, [
                  createVNode("h2", { class: "font-semibold text-white mb-3 leading-tight" }, toDisplayString(_ctx.$page.props.words.the_reply), 1),
                  createVNode("form", {
                    onSubmit: withModifiers(updateReply, ["prevent"]),
                    class: "space-y-6 p-2"
                  }, [
                    createVNode("div", null, [
                      withDirectives(createVNode("textarea", {
                        id: "content",
                        type: "text",
                        class: "block w-full rounded-md h-32 mt-1 text-black",
                        "onUpdate:modelValue": ($event) => unref(form).content = $event
                      }, "\n              ", 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).content]
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center gap-4" }, [
                      createVNode("button", {
                        class: "btn btn-success",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Replies/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
