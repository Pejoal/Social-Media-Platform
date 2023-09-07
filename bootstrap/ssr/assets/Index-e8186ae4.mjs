import { onMounted, ref, mergeProps, unref, useSSRContext, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { A as AuthLayout } from "./AuthLayout-18ded6d5.mjs";
import { useForm, usePage, Head } from "@inertiajs/vue3";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./TextInput-66ab7a8d.mjs";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import "./Hamburger-c1553109.mjs";
import "./Dropdown-d2a4ee41.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
const _sfc_main$1 = {
  __name: "PrivateMessage",
  __ssrInlineRender: true,
  props: {
    recipient_username: {
      type: String,
      default: ""
    },
    friendship_id: {
      type: Number,
      default: 0
    }
  },
  emits: ["addMessage"],
  setup(__props, { emit }) {
    const props = __props;
    const env = { "VITE_PUSHER_APP_KEY": "", "VITE_PUSHER_HOST": "localhost", "VITE_PUSHER_PORT": "80", "VITE_PUSHER_SCHEME": "http", "VITE_PUSHER_APP_CLUSTER": "eu", "VITE_LARAVEL_VUE_I18N_HAS_PHP": "true", "BASE_URL": "/build/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true };
    onMounted(() => {
      const pusher = new Pusher(env.VITE_PUSHER_APP_KEY, {
        cluster: env.VITE_PUSHER_APP_CLUSTER,
        encrypted: true
      });
      const echo = new Echo({
        broadcaster: "pusher",
        key: env.VITE_PUSHER_APP_KEY,
        cluster: env.VITE_PUSHER_APP_CLUSTER,
        encrypted: true,
        pusher
      });
      echo.join(`friend.chat.${props.friendship_id}`).here((users) => {
      }).joining((user) => {
      }).leaving((user) => {
      }).listen("PrivateMessageSent", (data) => {
        emit("addMessage", {
          id: data.id,
          content: data.content,
          recipient_username: data.recipient_username,
          created_at: "Few seconds ago..."
        });
      }).error((err) => {
      });
    });
    let contentInput = ref(null);
    const form = useForm({
      content: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "bg-zinc-900 flex flex-col items-center p-2 pb-6" }, _attrs))}><div class="flex w-full gap-2">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "content",
        type: "text",
        class: "mt-1 flex-1 text-black",
        placeholder: _ctx.$page.props.words.type_your_message_here,
        modelValue: unref(form).content,
        "onUpdate:modelValue": ($event) => unref(form).content = $event,
        ref_key: "contentInput",
        ref: contentInput
      }, null, _parent));
      _push(`<button class="btn btn-primary"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}>${ssrInterpolate(_ctx.$page.props.words.send)}</button></div>`);
      if (unref(form).recentlySuccessful) {
        _push(`<p class="mt-2 text-sm text-gray-200">${ssrInterpolate(_ctx.$page.props.words.sent)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(form).errors.content) {
        _push(ssrRenderComponent(_sfc_main$3, {
          message: unref(form).errors.content,
          class: "error"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</form>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PrivateMessage.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    messages: {
      type: Array,
      default: []
    },
    recipient_username: {
      type: String,
      default: ""
    },
    friendship_id: {
      type: Number,
      default: 0
    }
  },
  setup(__props) {
    const props = __props;
    const user = usePage().props.auth.user;
    let messages = ref(props.messages);
    const { props: properities } = usePage();
    async function addMessage(data) {
      messages.value.push({
        id: data.id,
        content: data.content,
        created_at: data.created_at,
        recipient_username: data.recipient_username
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: unref(properities).words.private_chat
      }, null, _parent));
      _push(ssrRenderComponent(AuthLayout, null, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="shadow-lg rounded-lg bg-zinc-800"${_scopeId}><div${_scopeId}>`);
            if (unref(messages).length > 0) {
              _push2(`<section class="px-2 py-4 rounded-lg shadow-2xl h-[80vh] overflow-y-auto"${_scopeId}><!--[-->`);
              ssrRenderList(unref(messages), (message) => {
                _push2(`<div class="${ssrRenderClass([{
                  "bg-green-700 float-left": message.recipient_username != unref(user).username,
                  "bg-slate-500 float-right": message.recipient_username == unref(user).username
                }, "flex justify-between py-2 px-4 my-2 rounded-lg w-[90%]"])}"${_scopeId}><p class="text-white"${_scopeId}>${ssrInterpolate(message.content)}</p><span class="text-gray-200 mt-6"${_scopeId}>${ssrInterpolate(message.created_at)}</span></div>`);
              });
              _push2(`<!--]--></section>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="clear-both"${_scopeId}></div>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              friendship_id: props.friendship_id,
              recipient_username: props.recipient_username,
              onAddMessage: addMessage
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "shadow-lg rounded-lg bg-zinc-800" }, [
                createVNode("div", null, [
                  unref(messages).length > 0 ? (openBlock(), createBlock("section", {
                    key: 0,
                    class: "px-2 py-4 rounded-lg shadow-2xl h-[80vh] overflow-y-auto"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(messages), (message) => {
                      return openBlock(), createBlock("div", {
                        key: message.id,
                        class: ["flex justify-between py-2 px-4 my-2 rounded-lg w-[90%]", {
                          "bg-green-700 float-left": message.recipient_username != unref(user).username,
                          "bg-slate-500 float-right": message.recipient_username == unref(user).username
                        }]
                      }, [
                        createVNode("p", { class: "text-white" }, toDisplayString(message.content), 1),
                        createVNode("span", { class: "text-gray-200 mt-6" }, toDisplayString(message.created_at), 1)
                      ], 2);
                    }), 128))
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "clear-both" }),
                  createVNode(_sfc_main$1, {
                    friendship_id: props.friendship_id,
                    recipient_username: props.recipient_username,
                    onAddMessage: addMessage
                  }, null, 8, ["friendship_id", "recipient_username"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Private_Chat/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
