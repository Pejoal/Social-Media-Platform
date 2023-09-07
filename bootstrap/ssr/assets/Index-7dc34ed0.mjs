import { mergeProps, unref, useSSRContext, ref, onMounted, withCtx, createVNode } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { A as AuthLayout } from "./AuthLayout-18ded6d5.mjs";
import { usePage, Head } from "@inertiajs/vue3";
import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import "./Hamburger-c1553109.mjs";
import "./Dropdown-d2a4ee41.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./TextInput-66ab7a8d.mjs";
const _sfc_main$2 = {
  __name: "ChatMessages",
  __ssrInlineRender: true,
  props: {
    messages: {
      type: Array,
      default: []
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<ul${ssrRenderAttrs(mergeProps({ class: "bg-slate-900 py-4 text-white rounded-lg" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(props).messages, (message) => {
        _push(`<li class="bg-gray-800 px-4 py-4 my-4 mx-4 max-w-full rounded-lg overflow-hidden shadow-lg"><div class="header"><strong class="font-bold text-xl my-2">${ssrInterpolate(message.user_firstname)}</strong></div><p class="indent-4 text-gray-200 text-base my-4">${ssrInterpolate(message.content)}</p></li>`);
      });
      _push(`<!--]--></ul>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ChatMessages.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "ChatForm",
  __ssrInlineRender: true,
  emits: ["messagesent"],
  setup(__props, { emit }) {
    let newMessage = ref("");
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center gap-4 my-4" }, _attrs))}><input type="text" class="text-black border border-gray-300 py-2 px-4 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" name="content"${ssrRenderAttr("placeholder", _ctx.$page.props.words.type_your_message_here)}${ssrRenderAttr("value", unref(newMessage))}><button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline-blue focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">${ssrInterpolate(_ctx.$page.props.words.submit)}</button></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ChatForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  setup(__props) {
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
      echo.channel("chat").listen("MessageSent", (data) => {
        messages.value.unshift({
          id: data.id,
          content: data.content,
          user_firstname: data.user_firstname
        });
      });
      fetchMessages();
    });
    usePage().props.auth.user;
    let messages = ref([]);
    const { props: properities } = usePage();
    function fetchMessages() {
      axios.get(route("public.chat.fetch")).then((response) => {
        messages.value = response.data;
      });
    }
    async function addMessage(data) {
      try {
        axios.post(route("public.chat.create"), data);
      } catch (err) {
        console.log(err);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: unref(properities).words.chats
      }, null, _parent));
      _push(ssrRenderComponent(AuthLayout, null, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-zinc-800 px-2 py-4 rounded-lg"${_scopeId}><div class="overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="container mx-auto"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, { onMessagesent: addMessage }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, { messages: unref(messages) }, null, _parent2, _scopeId));
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "bg-zinc-800 px-2 py-4 rounded-lg" }, [
                createVNode("div", { class: "overflow-hidden shadow-sm sm:rounded-lg" }, [
                  createVNode("div", { class: "container mx-auto" }, [
                    createVNode("div", null, [
                      createVNode(_sfc_main$1, { onMessagesent: addMessage }),
                      createVNode(_sfc_main$2, { messages: unref(messages) }, null, 8, ["messages"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Chat/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
