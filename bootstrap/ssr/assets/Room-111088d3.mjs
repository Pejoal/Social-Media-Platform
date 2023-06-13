import { mergeProps, useSSRContext, ref, unref, onMounted, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { A as AuthLayout } from "./AuthLayout-a31bd95f.mjs";
import { usePage, Head } from "@inertiajs/vue3";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { g as getRandomDigits } from "./utils-a971894e.mjs";
import "./Hamburger-c1553109.mjs";
import "./Dropdown-d2a4ee41.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./TextInput-66ab7a8d.mjs";
const _sfc_main$3 = {
  __name: "Message",
  __ssrInlineRender: true,
  props: {
    message: {
      type: Object,
      default: {}
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gray-900 py-2 px-4 rounded-lg mb-3" }, _attrs))}><div class="flex justify-between items-center mb-2"><h2 class="font-bold">${ssrInterpolate(__props.message.firstname + " " + __props.message.lastname)}</h2><p class="text-gray-500 text-sm">at ${ssrInterpolate(__props.message.created_at)}</p></div><p class="indent-2 text-gray-200">${ssrInterpolate(__props.message.content)}</p></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Message.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "CreateMessage",
  __ssrInlineRender: true,
  props: {
    roomId: {
      type: Number,
      default: 0
    }
  },
  emits: ["unshiftMessage"],
  setup(__props, { emit }) {
    usePage().props.auth.user;
    ref(null);
    let newMessage = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center mb-5" }, _attrs))}><div class="flex-1 mr-3"><input name="content" type="text" class="w-full text-black border-2 border-gray-300 p-2 rounded-md"${ssrRenderAttr("placeholder", _ctx.$page.props.words.type_your_message_here)}${ssrRenderAttr("value", unref(newMessage))}></div><button class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">${ssrInterpolate(_ctx.$page.props.words.send)}</button></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CreateMessage.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "Alert",
  __ssrInlineRender: true,
  props: {
    message: {
      type: Object,
      default: {}
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: ["flex px-1 py-2 my-2 text-sm rounded-lg", {
          "text-blue-800 border border-blue-300  bg-blue-50": __props.message.type === "join",
          "text-red-800 border border-red-300 bg-red-50": __props.message.type === "leave"
        }],
        role: "alert"
      }, _attrs))}>`);
      if (__props.message.type === "join") {
        _push(`<svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.message.type === "leave") {
        _push(`<svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="w-full"><div class="flex justify-between items-center my-2"><span class="font-medium">Info alert!</span><time class="text-gray-500 text-sm"> at ${ssrInterpolate(__props.message.created_at)}</time></div><p>${ssrInterpolate(__props.message.firstname + " " + __props.message.lastname)} has ${ssrInterpolate(__props.message.type === "leave" ? "left" : "joined")} the room </p></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Alert.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Room",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: ""
    },
    roomId: {
      type: Number,
      default: 0
    }
    // messages: {
    //   type: Array,
    //   default: [],
    // },
  },
  setup(__props) {
    const props = __props;
    const env = { "VITE_PUSHER_APP_KEY": "a5fc9c15e9d538e998b4", "VITE_PUSHER_HOST": "localhost", "VITE_PUSHER_PORT": "80", "VITE_PUSHER_SCHEME": "http", "VITE_PUSHER_APP_CLUSTER": "eu", "BASE_URL": "/build/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true };
    let initials = ref([]);
    let messages = ref([]);
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
      echo.join(`chat.${props.roomId}`).here((users) => {
        initials.value = users.map(function(user) {
          return {
            id: user.id,
            name: user.firstname[0] + user.lastname[0]
          };
        });
      }).joining((user) => {
        messages.value.unshift({
          id: getRandomDigits(),
          firstname: user.firstname,
          lastname: user.lastname,
          created_at: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
          type: "join"
        });
        initials.value.unshift({
          id: user.id,
          name: user.firstname[0] + user.lastname[0]
        });
      }).leaving((user) => {
        messages.value.unshift({
          id: getRandomDigits(),
          firstname: user.firstname,
          lastname: user.lastname,
          created_at: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
          type: "leave"
        });
        initials.value = initials.value.filter(function(ini) {
          return ini.id != user.id;
        });
      }).listen("RoomMessageSent", (data) => {
        messages.value.unshift({
          id: getRandomDigits(),
          firstname: data.firstname,
          lastname: data.lastname,
          content: data.content,
          created_at: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
          type: "content"
        });
      }).error((error) => {
        console.error(error);
      });
    });
    function unshiftMessage(data) {
      messages.value.unshift({
        id: getRandomDigits(),
        firstname: data.firstname,
        lastname: data.lastname,
        content: data.content,
        created_at: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
        type: "content"
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: unref(props).title + " Room"
      }, null, _parent));
      _push(ssrRenderComponent(AuthLayout, null, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<main class="bg-zinc-800"${_scopeId}><div class="mb-2 bg-zinc-700 px-2 border border-gray-600 rounded-md shadow-lg"${_scopeId}><section class="flex gap-1 m-2 px-2 py-4 border rounded-lg overflow-x-auto"${_scopeId}><!--[-->`);
            ssrRenderList(unref(initials), (initial) => {
              _push2(`<div class="flex items-center justify-center w-10 h-10 bg-gray-800 text-white rounded-full"${_scopeId}>${ssrInterpolate(initial.name)}</div>`);
            });
            _push2(`<!--]--></section><div class="overflow-y-auto h-96 max-h-[75vh] mb-5 px-2 py-4 border border-gray-600 rounded-lg"${_scopeId}><!--[-->`);
            ssrRenderList(unref(messages), (message) => {
              _push2(`<section${_scopeId}>`);
              if (message.type === "join" || message.type === "leave") {
                _push2(ssrRenderComponent(_sfc_main$1, { message }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(_sfc_main$3, { message }, null, _parent2, _scopeId));
              }
              _push2(`</section>`);
            });
            _push2(`<!--]--></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              roomId: unref(props).roomId,
              onUnshiftMessage: unshiftMessage
            }, null, _parent2, _scopeId));
            _push2(`</div></main>`);
          } else {
            return [
              createVNode("main", { class: "bg-zinc-800" }, [
                createVNode("div", { class: "mb-2 bg-zinc-700 px-2 border border-gray-600 rounded-md shadow-lg" }, [
                  createVNode("section", { class: "flex gap-1 m-2 px-2 py-4 border rounded-lg overflow-x-auto" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(initials), (initial) => {
                      return openBlock(), createBlock("div", {
                        class: "flex items-center justify-center w-10 h-10 bg-gray-800 text-white rounded-full",
                        key: initial.id,
                        textContent: toDisplayString(initial.name)
                      }, null, 8, ["textContent"]);
                    }), 128))
                  ]),
                  createVNode("div", { class: "overflow-y-auto h-96 max-h-[75vh] mb-5 px-2 py-4 border border-gray-600 rounded-lg" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(messages), (message) => {
                      return openBlock(), createBlock("section", {
                        key: message.id
                      }, [
                        message.type === "join" || message.type === "leave" ? (openBlock(), createBlock(_sfc_main$1, {
                          key: 0,
                          message
                        }, null, 8, ["message"])) : (openBlock(), createBlock(_sfc_main$3, {
                          key: 1,
                          message
                        }, null, 8, ["message"]))
                      ]);
                    }), 128))
                  ]),
                  createVNode(_sfc_main$2, {
                    roomId: unref(props).roomId,
                    onUnshiftMessage: unshiftMessage
                  }, null, 8, ["roomId"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Room/Room.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
