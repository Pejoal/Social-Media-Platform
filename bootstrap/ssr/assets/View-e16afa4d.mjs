import { onMounted, onUnmounted, ref, unref, withCtx, isRef, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createVNode, withModifiers, createCommentVNode, Teleport, withDirectives, vModelText, Transition, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderTeleport, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { A as AuthLayout, a as _sfc_main$1 } from "./AuthLayout-a31bd95f.mjs";
import { useForm, Head, Link } from "@inertiajs/vue3";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import "./Hamburger-c1553109.mjs";
import "./Dropdown-d2a4ee41.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./TextInput-66ab7a8d.mjs";
const _sfc_main = {
  __name: "View",
  __ssrInlineRender: true,
  props: {
    messages: {
      type: Array,
      default: []
    },
    chat_group: {
      type: Object,
      default: {}
    },
    friends: {
      type: Object,
      default: []
    },
    joined_chat_groups: {
      type: Array,
      default: []
    }
  },
  setup(__props) {
    const props = __props;
    const env = { "VITE_PUSHER_APP_KEY": "a5fc9c15e9d538e998b4", "VITE_PUSHER_HOST": "localhost", "VITE_PUSHER_PORT": "80", "VITE_PUSHER_SCHEME": "http", "VITE_PUSHER_APP_CLUSTER": "eu", "BASE_URL": "/build/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true };
    onMounted(() => {
      window.addEventListener("scroll", getMessagess);
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
      echo.join(`chat.group.${props.chat_group.id}`).here((users) => {
      }).joining((user) => {
      }).leaving((user) => {
      }).listen("ChatGroupMessageSent", (data) => {
        messages.value.unshift({
          id: data.id,
          content: data.content,
          canUpdateMessage: data.canUpdateMessage,
          created_at: data.created_at,
          user: {
            name: data.name,
            username: data.username
          }
        });
      }).error((error) => {
        console.error(error);
      });
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", getMessagess);
    });
    let addMemberModal = ref(false);
    let removeMemberModal = ref(false);
    let form = useForm({
      user_id: 0
    });
    let messageForm = useForm({
      content: ""
    });
    function addMember(id) {
      addMemberModal.value = false;
      form.user_id = id;
      form.post(route("chat.groups.user.add", [props.chat_group.id]), {
        preserveScroll: true,
        onSuccess: () => {
        }
      });
    }
    function removeMember(id) {
      removeMemberModal.value = false;
      form.user_id = id;
      form.delete(route("chat.groups.user.remove", [props.chat_group.id]), {
        preserveScroll: true,
        onSuccess: () => {
        }
      });
    }
    const getMessagess = async () => {
      const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom + window.innerHeight / 2 >= docHeight) {
        if (lastPage.value || loading.value) {
          return;
        }
        try {
          loading.value = true;
          const response = await axios.get(
            route("chat.groups.view", [props.chat_group.id]),
            {
              params: {
                page: page.value
              }
            }
          );
          messages.value.unshift(...response.data.data);
          lastPage.value = !response.data.links.next;
          page.value++;
        } catch (error) {
          console.error(error);
        } finally {
          loading.value = false;
        }
      }
    };
    const messages = ref(props.messages);
    const contentInput = ref(null);
    const page = ref(2);
    const lastPage = ref(false);
    const loading = ref(false);
    function sendMessage() {
      axios.post(route("chat.groups.message.store", [props.chat_group.id]), {
        content: messageForm.content
      }).then(function() {
        messageForm.reset();
        messageForm.recentlySuccessful = true;
        setTimeout(() => {
          messageForm.recentlySuccessful = false;
        }, 2500);
      }).catch(function(e) {
        var _a;
        messageForm.errors.content = ((_a = e.response.data.errors) == null ? void 0 : _a.content[0]) ?? false;
        contentInput.value.focus();
        setTimeout(() => {
          messageForm.errors.content = false;
        }, 4e3);
      });
    }
    function handleDeleteGroupMessage(id) {
      axios.delete(route("chat.groups.message.delete", [props.chat_group.id, id])).then(function() {
        messages.value = messages.value.filter(function(message) {
          return message.id != id;
        });
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: props.chat_group.name
      }, null, _parent));
      _push(ssrRenderComponent(AuthLayout, {
        joined_chat_groups: props.joined_chat_groups
      }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="px-2 py-1 bg-zinc-800"${_scopeId}><section class="flex items-center justify-between px-2"${_scopeId}><h2 class="text-xl px-4 py-2"${_scopeId}>${ssrInterpolate(props.chat_group.name)}</h2>`);
            if (__props.chat_group.description) {
              _push2(`<p class="text-gray-200 text-md"${_scopeId}>${ssrInterpolate(__props.chat_group.description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span class="text-gray-300 text-md self-end"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.created + " " + __props.chat_group.created_at)}</span></section>`);
            if (__props.chat_group.creator_id == _ctx.$page.props.auth.user.id) {
              _push2(`<section class="flex gap-2 bg-neutral-600 rounded-md px-4 py-2"${_scopeId}><button class="btn btn-primary"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.add_member)}</button><button class="btn btn-danger"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.remove_member)}</button></section>`);
            } else {
              _push2(`<!---->`);
            }
            ssrRenderTeleport(_push2, (_push3) => {
              _push3(ssrRenderComponent(_sfc_main$1, {
                show: unref(addMemberModal),
                onClose: ($event) => isRef(addMemberModal) ? addMemberModal.value = false : addMemberModal = false
              }, {
                content: withCtx((_2, _push4, _parent3, _scopeId2) => {
                  if (_push4) {
                    if (props.friends) {
                      _push4(`<!--[-->`);
                      ssrRenderList(props.friends, (friend) => {
                        _push4(`<div class="bg-zinc-800 shadow-md my-2 rounded-lg p-2 w-full"${_scopeId2}><div class="flex items-center justify-between mb-2"${_scopeId2}>`);
                        _push4(ssrRenderComponent(unref(Link), {
                          href: _ctx.route("user.profile", friend.username),
                          as: "button",
                          class: "text-lg font-bold"
                        }, {
                          default: withCtx((_3, _push5, _parent4, _scopeId3) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(friend.name)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(friend.name), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                        _push4(`<form${_scopeId2}><button class="btn btn-primary"${_scopeId2}>${ssrInterpolate(_ctx.$page.props.words.add_to_group)}</button></form></div></div>`);
                      });
                      _push4(`<!--]-->`);
                    } else {
                      _push4(`<!---->`);
                    }
                  } else {
                    return [
                      props.friends ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(props.friends, (friend) => {
                        return openBlock(), createBlock("div", {
                          key: friend.id,
                          class: "bg-zinc-800 shadow-md my-2 rounded-lg p-2 w-full"
                        }, [
                          createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                            createVNode(unref(Link), {
                              href: _ctx.route("user.profile", friend.username),
                              as: "button",
                              class: "text-lg font-bold"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(friend.name), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"]),
                            createVNode("form", {
                              onSubmit: withModifiers(($event) => addMember(friend.id), ["prevent"])
                            }, [
                              createVNode("button", { class: "btn btn-primary" }, toDisplayString(_ctx.$page.props.words.add_to_group), 1)
                            ], 40, ["onSubmit"])
                          ])
                        ]);
                      }), 128)) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }, "body", false, _parent2);
            ssrRenderTeleport(_push2, (_push3) => {
              _push3(ssrRenderComponent(_sfc_main$1, {
                show: unref(removeMemberModal),
                onClose: ($event) => isRef(removeMemberModal) ? removeMemberModal.value = false : removeMemberModal = false
              }, {
                content: withCtx((_2, _push4, _parent3, _scopeId2) => {
                  if (_push4) {
                    if (props.chat_group.members) {
                      _push4(`<!--[-->`);
                      ssrRenderList(props.chat_group.members, (member) => {
                        _push4(`<div class="bg-zinc-800 shadow-md my-2 rounded-lg p-2 w-full"${_scopeId2}><div class="flex items-center justify-between"${_scopeId2}>`);
                        _push4(ssrRenderComponent(unref(Link), {
                          href: _ctx.route("user.profile", member.username),
                          as: "button",
                          class: "text-lg font-bold"
                        }, {
                          default: withCtx((_3, _push5, _parent4, _scopeId3) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(member.name)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(member.name), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                        _push4(`<form${_scopeId2}><button class="btn btn-danger"${_scopeId2}>${ssrInterpolate(_ctx.$page.props.words.remove_from_group)}</button></form></div></div>`);
                      });
                      _push4(`<!--]-->`);
                    } else {
                      _push4(`<!---->`);
                    }
                  } else {
                    return [
                      props.chat_group.members ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(props.chat_group.members, (member) => {
                        return openBlock(), createBlock("div", {
                          key: member.id,
                          class: "bg-zinc-800 shadow-md my-2 rounded-lg p-2 w-full"
                        }, [
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode(unref(Link), {
                              href: _ctx.route("user.profile", member.username),
                              as: "button",
                              class: "text-lg font-bold"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(member.name), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"]),
                            createVNode("form", {
                              onSubmit: withModifiers(($event) => removeMember(member.id), ["prevent"])
                            }, [
                              createVNode("button", { class: "btn btn-danger" }, toDisplayString(_ctx.$page.props.words.remove_from_group), 1)
                            ], 40, ["onSubmit"])
                          ])
                        ]);
                      }), 128)) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }, "body", false, _parent2);
            _push2(`<h3 class="text-lg mt-2"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.members)}</h3><section class="flex gap-2 bg-stone-700 overflow-x-auto px-2 py-1 mb-2 rounded-lg"${_scopeId}><!--[-->`);
            ssrRenderList(props.chat_group.members, (member) => {
              _push2(`<div class="my-2 bg-slate-700 px-2 py-1 rounded-md"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("user.profile", member.username),
                as: "button",
                class: "text-lg font-bold"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(member.name)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(member.name), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></section><section class="bg-slate-700 px-2 pt-1 pb-4 rounded-lg"${_scopeId}><form${_scopeId}><div class="flex gap-2 my-4"${_scopeId}><input${ssrRenderAttr("value", unref(messageForm).content)} type="text"${ssrRenderAttr("placeholder", _ctx.$page.props.words.content)} class="px-4 py-2 rounded-lg text-black flex-1"${_scopeId}><button class="btn btn-primary"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.send)}</button></div>`);
            if (unref(messageForm).recentlySuccessful) {
              _push2(`<p class="mt-2 text-sm text-gray-200"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.sent)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(messageForm).errors.content) {
              _push2(`<p class="error"${_scopeId}>${ssrInterpolate(unref(messageForm).errors.content)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</form>`);
            if (messages.value.length >= 1) {
              _push2(`<section${_scopeId}><!--[-->`);
              ssrRenderList(messages.value, (message) => {
                _push2(`<div class="bg-zinc-700 rounded-md my-2 px-2 py-1"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  class: "text-white font-bold py-2",
                  href: _ctx.route("user.profile", [message.user.username])
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(message.user.name)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(message.user.name), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`<p class="text-gray-100 px-4"${_scopeId}>${ssrInterpolate(message.content)}</p><div class="flex items-center justify-end"${_scopeId}>`);
                if (message.canUpdateMessage) {
                  _push2(`<button class="btn btn-danger"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.delete)}</button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></section>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</section></section>`);
          } else {
            return [
              createVNode("section", { class: "px-2 py-1 bg-zinc-800" }, [
                createVNode("section", { class: "flex items-center justify-between px-2" }, [
                  createVNode("h2", { class: "text-xl px-4 py-2" }, toDisplayString(props.chat_group.name), 1),
                  __props.chat_group.description ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "text-gray-200 text-md"
                  }, toDisplayString(__props.chat_group.description), 1)) : createCommentVNode("", true),
                  createVNode("span", { class: "text-gray-300 text-md self-end" }, toDisplayString(_ctx.$page.props.words.created + " " + __props.chat_group.created_at), 1)
                ]),
                __props.chat_group.creator_id == _ctx.$page.props.auth.user.id ? (openBlock(), createBlock("section", {
                  key: 0,
                  class: "flex gap-2 bg-neutral-600 rounded-md px-4 py-2"
                }, [
                  createVNode("button", {
                    class: "btn btn-primary",
                    onClick: ($event) => isRef(addMemberModal) ? addMemberModal.value = true : addMemberModal = true
                  }, toDisplayString(_ctx.$page.props.words.add_member), 9, ["onClick"]),
                  createVNode("button", {
                    class: "btn btn-danger",
                    onClick: ($event) => isRef(removeMemberModal) ? removeMemberModal.value = true : removeMemberModal = true
                  }, toDisplayString(_ctx.$page.props.words.remove_member), 9, ["onClick"])
                ])) : createCommentVNode("", true),
                (openBlock(), createBlock(Teleport, { to: "body" }, [
                  createVNode(_sfc_main$1, {
                    show: unref(addMemberModal),
                    onClose: ($event) => isRef(addMemberModal) ? addMemberModal.value = false : addMemberModal = false
                  }, {
                    content: withCtx(() => [
                      props.friends ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(props.friends, (friend) => {
                        return openBlock(), createBlock("div", {
                          key: friend.id,
                          class: "bg-zinc-800 shadow-md my-2 rounded-lg p-2 w-full"
                        }, [
                          createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                            createVNode(unref(Link), {
                              href: _ctx.route("user.profile", friend.username),
                              as: "button",
                              class: "text-lg font-bold"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(friend.name), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"]),
                            createVNode("form", {
                              onSubmit: withModifiers(($event) => addMember(friend.id), ["prevent"])
                            }, [
                              createVNode("button", { class: "btn btn-primary" }, toDisplayString(_ctx.$page.props.words.add_to_group), 1)
                            ], 40, ["onSubmit"])
                          ])
                        ]);
                      }), 128)) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }, 8, ["show", "onClose"])
                ])),
                (openBlock(), createBlock(Teleport, { to: "body" }, [
                  createVNode(_sfc_main$1, {
                    show: unref(removeMemberModal),
                    onClose: ($event) => isRef(removeMemberModal) ? removeMemberModal.value = false : removeMemberModal = false
                  }, {
                    content: withCtx(() => [
                      props.chat_group.members ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(props.chat_group.members, (member) => {
                        return openBlock(), createBlock("div", {
                          key: member.id,
                          class: "bg-zinc-800 shadow-md my-2 rounded-lg p-2 w-full"
                        }, [
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode(unref(Link), {
                              href: _ctx.route("user.profile", member.username),
                              as: "button",
                              class: "text-lg font-bold"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(member.name), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"]),
                            createVNode("form", {
                              onSubmit: withModifiers(($event) => removeMember(member.id), ["prevent"])
                            }, [
                              createVNode("button", { class: "btn btn-danger" }, toDisplayString(_ctx.$page.props.words.remove_from_group), 1)
                            ], 40, ["onSubmit"])
                          ])
                        ]);
                      }), 128)) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }, 8, ["show", "onClose"])
                ])),
                createVNode("h3", { class: "text-lg mt-2" }, toDisplayString(_ctx.$page.props.words.members), 1),
                createVNode("section", { class: "flex gap-2 bg-stone-700 overflow-x-auto px-2 py-1 mb-2 rounded-lg" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(props.chat_group.members, (member) => {
                    return openBlock(), createBlock("div", {
                      key: member.id,
                      class: "my-2 bg-slate-700 px-2 py-1 rounded-md"
                    }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("user.profile", member.username),
                        as: "button",
                        class: "text-lg font-bold"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(member.name), 1)
                        ]),
                        _: 2
                      }, 1032, ["href"])
                    ]);
                  }), 128))
                ]),
                createVNode("section", { class: "bg-slate-700 px-2 pt-1 pb-4 rounded-lg" }, [
                  createVNode("form", {
                    onSubmit: withModifiers(($event) => sendMessage(), ["prevent"])
                  }, [
                    createVNode("div", { class: "flex gap-2 my-4" }, [
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(messageForm).content = $event,
                        type: "text",
                        placeholder: _ctx.$page.props.words.content,
                        class: "px-4 py-2 rounded-lg text-black flex-1",
                        ref_key: "contentInput",
                        ref: contentInput
                      }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                        [vModelText, unref(messageForm).content]
                      ]),
                      createVNode("button", { class: "btn btn-primary" }, toDisplayString(_ctx.$page.props.words.send), 1)
                    ]),
                    createVNode(Transition, {
                      "enter-from-class": "opacity-0",
                      "leave-to-class": "opacity-0",
                      class: "transition ease-in-out"
                    }, {
                      default: withCtx(() => [
                        unref(messageForm).recentlySuccessful ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-2 text-sm text-gray-200"
                        }, toDisplayString(_ctx.$page.props.words.sent), 1)) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }),
                    unref(messageForm).errors.content ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "error"
                    }, toDisplayString(unref(messageForm).errors.content), 1)) : createCommentVNode("", true)
                  ], 40, ["onSubmit"]),
                  messages.value.length >= 1 ? (openBlock(), createBlock("section", { key: 0 }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(messages.value, (message) => {
                      return openBlock(), createBlock("div", {
                        class: "bg-zinc-700 rounded-md my-2 px-2 py-1",
                        key: message.id
                      }, [
                        createVNode(unref(Link), {
                          class: "text-white font-bold py-2",
                          href: _ctx.route("user.profile", [message.user.username])
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(message.user.name), 1)
                          ]),
                          _: 2
                        }, 1032, ["href"]),
                        createVNode("p", { class: "text-gray-100 px-4" }, toDisplayString(message.content), 1),
                        createVNode("div", { class: "flex items-center justify-end" }, [
                          message.canUpdateMessage ? (openBlock(), createBlock("button", {
                            key: 0,
                            onClick: ($event) => handleDeleteGroupMessage(message.id),
                            class: "btn btn-danger"
                          }, toDisplayString(_ctx.$page.props.words.delete), 9, ["onClick"])) : createCommentVNode("", true)
                        ])
                      ]);
                    }), 128))
                  ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Chat_Groups/View.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
