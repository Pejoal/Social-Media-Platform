import { ref, unref, isRef, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext, createCommentVNode } from "vue";
import { ssrInterpolate, ssrRenderTeleport, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { a as _sfc_main$3, A as AuthLayout, b as _sfc_main$4 } from "./AuthLayout-18ded6d5.mjs";
import { Link, Head } from "@inertiajs/vue3";
import { P as Post } from "./Post-53712adf.mjs";
import { L as Loading } from "./Loading-c0e5699a.mjs";
import { u as useFetch } from "./utils-a971894e.mjs";
import "./Hamburger-c1553109.mjs";
import "./Dropdown-d2a4ee41.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./TextInput-66ab7a8d.mjs";
import "sweetalert";
const _sfc_main$2 = {
  __name: "FriendshipRequests",
  __ssrInlineRender: true,
  setup(__props) {
    let showModal = ref(true);
    let friendshipRequests = ref([]);
    async function getFriendShipRequests() {
      showModal.value = !showModal.value;
      try {
        axios.get("/getFriendShipRequests").then((res) => {
          friendshipRequests.value = res.data;
        });
      } catch (err) {
        console.log(err);
      }
    }
    getFriendShipRequests();
    async function rejectFriendshipRequest(friendshipRequestId, user2_id) {
      friendshipRequests.value = friendshipRequests.value.filter(function(friendshipRequest) {
        return friendshipRequest.id != friendshipRequestId;
      });
      try {
        axios.delete("/rejectFriendshipRequest", {
          params: {
            friendshipRequestId,
            user2_id
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
    async function acceptFriendshipRequest(friendshipRequestId, user2_id) {
      friendshipRequests.value = friendshipRequests.value.filter(function(friendshipRequest) {
        return friendshipRequest.id != friendshipRequestId;
      });
      try {
        axios.post("/acceptFriendshipRequest", {
          friendshipRequestId,
          user2_id
        });
      } catch (err) {
        console.log(err);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><span class="bg-red-500 text-white rounded-full px-3 py-1 text-sm font-semibold">${ssrInterpolate(unref(friendshipRequests).length)}</span> ${ssrInterpolate(_ctx.$page.props.words.requests)}</button>`);
      ssrRenderTeleport(_push, (_push2) => {
        _push2(ssrRenderComponent(_sfc_main$3, {
          show: unref(showModal),
          onClose: ($event) => isRef(showModal) ? showModal.value = false : showModal = false
        }, {
          content: withCtx((_, _push3, _parent2, _scopeId) => {
            if (_push3) {
              _push3(`<section class="w-[70vw]"${_scopeId}><h2 class="text-lg py-2 px-4"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.friendship_requests)}</h2><div class="flex flex-col gap-3 max-h-[85vh] overflow-y-auto"${_scopeId}><!--[-->`);
              ssrRenderList(unref(friendshipRequests), (friendshipRequest) => {
                _push3(`<div class="bg-zinc-800 shadow-md rounded-lg p-2 w-full"${_scopeId}><div class="flex items-center justify-between mb-2"${_scopeId}><h3 class="text-lg font-bold"${_scopeId}>${ssrInterpolate(friendshipRequest.requester_name)}</h3><button class="text-red-500 font-bold hover:underline"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.reject)}</button></div><p class="text-sm text-gray-100"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.sent_friend_request)}</p><p class="text-sm text-gray-300"${_scopeId}>${ssrInterpolate(friendshipRequest.updated_at)}</p><div class="flex justify-end mt-2"${_scopeId}><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.accept)}</button>`);
                _push3(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("user.profile", friendshipRequest.requester_username),
                  as: "button",
                  class: "bg-gray-700 hover:bg-gray-600 text-gray-100 font-bold py-2 px-4 rounded"
                }, {
                  default: withCtx((_2, _push4, _parent3, _scopeId2) => {
                    if (_push4) {
                      _push4(`${ssrInterpolate(_ctx.$page.props.words.view_profile)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(_ctx.$page.props.words.view_profile), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push3(`</div></div>`);
              });
              _push3(`<!--]--></div></section>`);
            } else {
              return [
                createVNode("section", { class: "w-[70vw]" }, [
                  createVNode("h2", { class: "text-lg py-2 px-4" }, toDisplayString(_ctx.$page.props.words.friendship_requests), 1),
                  createVNode("div", { class: "flex flex-col gap-3 max-h-[85vh] overflow-y-auto" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(friendshipRequests), (friendshipRequest) => {
                      return openBlock(), createBlock("div", { class: "bg-zinc-800 shadow-md rounded-lg p-2 w-full" }, [
                        createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                          createVNode("h3", { class: "text-lg font-bold" }, toDisplayString(friendshipRequest.requester_name), 1),
                          createVNode("button", {
                            class: "text-red-500 font-bold hover:underline",
                            onClick: ($event) => rejectFriendshipRequest(
                              friendshipRequest.id,
                              friendshipRequest.requester_id
                            )
                          }, toDisplayString(_ctx.$page.props.words.reject), 9, ["onClick"])
                        ]),
                        createVNode("p", { class: "text-sm text-gray-100" }, toDisplayString(_ctx.$page.props.words.sent_friend_request), 1),
                        createVNode("p", { class: "text-sm text-gray-300" }, toDisplayString(friendshipRequest.updated_at), 1),
                        createVNode("div", { class: "flex justify-end mt-2" }, [
                          createVNode("button", {
                            onClick: ($event) => acceptFriendshipRequest(
                              friendshipRequest.id,
                              friendshipRequest.requester_id
                            ),
                            class: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                          }, toDisplayString(_ctx.$page.props.words.accept), 9, ["onClick"]),
                          createVNode(unref(Link), {
                            href: _ctx.route("user.profile", friendshipRequest.requester_username),
                            as: "button",
                            class: "bg-gray-700 hover:bg-gray-600 text-gray-100 font-bold py-2 px-4 rounded"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.$page.props.words.view_profile), 1)
                            ]),
                            _: 2
                          }, 1032, ["href"])
                        ])
                      ]);
                    }), 256))
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      }, "body", false, _parent);
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/FriendshipRequests.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "Friends",
  __ssrInlineRender: true,
  setup(__props) {
    let showModal = ref(true);
    let friendships = ref([]);
    async function getFriends() {
      showModal.value = !showModal.value;
      try {
        axios.get("/getFriends").then((res) => {
          friendships.value = res.data;
        });
      } catch (err) {
        console.log(err);
      }
    }
    getFriends();
    async function unfriend(friendship_id, user2_id) {
      try {
        axios.delete("/unfriend", {
          params: {
            user2_id
          }
        }).then((res) => {
          friendships.value = friendships.value.filter(function(friendship) {
            return friendship.id != friendship_id;
          });
        });
      } catch (err) {
        console.log(err);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><span class="bg-red-500 text-white rounded-full px-3 py-1 text-sm font-semibold">${ssrInterpolate(unref(friendships).length)}</span> ${ssrInterpolate(_ctx.$page.props.words.friends)}</button>`);
      ssrRenderTeleport(_push, (_push2) => {
        _push2(ssrRenderComponent(_sfc_main$3, {
          show: unref(showModal),
          onClose: ($event) => isRef(showModal) ? showModal.value = false : showModal = false
        }, {
          content: withCtx((_, _push3, _parent2, _scopeId) => {
            if (_push3) {
              _push3(`<section class="w-[70vw]"${_scopeId}><h2 class="text-lg py-2 px-4"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.your_friends)}</h2><div class="flex flex-col gap-2 max-h-[85vh] overflow-y-auto"${_scopeId}><!--[-->`);
              ssrRenderList(unref(friendships), (friendship) => {
                _push3(`<div class="bg-zinc-800 shadow-md rounded-lg p-2 w-full"${_scopeId}><div class="flex items-center justify-between mb-2"${_scopeId}><h3 class="text-lg font-bold"${_scopeId}>${ssrInterpolate(friendship.friend_name)}</h3><button class="text-red-500 font-bold hover:underline"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.unfriend)}</button></div><p class="text-sm text-gray-200"${_scopeId}>${ssrInterpolate(friendship.updated_at)}</p><div class="flex justify-between mt-2"${_scopeId}>`);
                _push3(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("private.messages.index", friendship.friend_username),
                  as: "button",
                  class: "text-md font-bold text-teal-500 hover:text-teal-700 hover:underline"
                }, {
                  default: withCtx((_2, _push4, _parent3, _scopeId2) => {
                    if (_push4) {
                      _push4(`${ssrInterpolate(_ctx.$page.props.words.chat)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(_ctx.$page.props.words.chat), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push3(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("user.profile", friendship.friend_username),
                  as: "button",
                  class: "text-sm text-gray-200 hover:text-white underline"
                }, {
                  default: withCtx((_2, _push4, _parent3, _scopeId2) => {
                    if (_push4) {
                      _push4(`${ssrInterpolate(_ctx.$page.props.words.view_profile)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(_ctx.$page.props.words.view_profile), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push3(`</div></div>`);
              });
              _push3(`<!--]--></div></section>`);
            } else {
              return [
                createVNode("section", { class: "w-[70vw]" }, [
                  createVNode("h2", { class: "text-lg py-2 px-4" }, toDisplayString(_ctx.$page.props.words.your_friends), 1),
                  createVNode("div", { class: "flex flex-col gap-2 max-h-[85vh] overflow-y-auto" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(friendships), (friendship) => {
                      return openBlock(), createBlock("div", {
                        key: friendship.id,
                        class: "bg-zinc-800 shadow-md rounded-lg p-2 w-full"
                      }, [
                        createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                          createVNode("h3", { class: "text-lg font-bold" }, toDisplayString(friendship.friend_name), 1),
                          createVNode("button", {
                            class: "text-red-500 font-bold hover:underline",
                            onClick: ($event) => unfriend(friendship.id, friendship.friend_id)
                          }, toDisplayString(_ctx.$page.props.words.unfriend), 9, ["onClick"])
                        ]),
                        createVNode("p", { class: "text-sm text-gray-200" }, toDisplayString(friendship.updated_at), 1),
                        createVNode("div", { class: "flex justify-between mt-2" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("private.messages.index", friendship.friend_username),
                            as: "button",
                            class: "text-md font-bold text-teal-500 hover:text-teal-700 hover:underline"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.$page.props.words.chat), 1)
                            ]),
                            _: 2
                          }, 1032, ["href"]),
                          createVNode(unref(Link), {
                            href: _ctx.route("user.profile", friendship.friend_username),
                            as: "button",
                            class: "text-sm text-gray-200 hover:text-white underline"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.$page.props.words.view_profile), 1)
                            ]),
                            _: 2
                          }, 1032, ["href"])
                        ])
                      ]);
                    }), 128))
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      }, "body", false, _parent);
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Friends.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    posts: {
      type: Array,
      default: []
    },
    joined_chat_groups: {
      type: Array,
      default: []
    }
  },
  setup(__props) {
    const props = __props;
    let allPosts = ref([]);
    let page = ref(2);
    let loading = ref(false);
    ({ data: allPosts, loading } = useFetch(
      route("user.profile.me"),
      page,
      props.posts
    ));
    function setPosts() {
      const mergedArray = [...props.posts, ...allPosts.value];
      allPosts.value = Array.from(new Set(mergedArray.map((obj) => obj.id))).map(
        (id) => mergedArray.find((obj) => obj.id === id)
      );
    }
    function deletePost(id) {
      allPosts.value = allPosts.value.filter(function(post) {
        return post.id != id;
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: _ctx.$page.props.words.my_profile
      }, null, _parent));
      _push(ssrRenderComponent(AuthLayout, {
        onSetPosts: ($event) => setPosts(),
        joined_chat_groups: unref(props).joined_chat_groups
      }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-center gap-2 py-2 shadow-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
            _push2(`</div><div class="py-2 rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, { class: "md:hidden p-2 bg-zinc-900 rounded-lg" }, null, _parent2, _scopeId));
            if (unref(allPosts).length >= 1) {
              _push2(`<section class="bg-zinc-800 text-white rounded-lg p-2 my-2"${_scopeId}><h2 class="text-lg px-2 py-1"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.posts)}</h2><!--[-->`);
              ssrRenderList(unref(allPosts), (post) => {
                _push2(ssrRenderComponent(Post, {
                  key: post.id,
                  class: "my-4 p-2 bg-zinc-900 rounded-lg",
                  post,
                  onDeletePost: deletePost
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
              if (unref(loading)) {
                _push2(ssrRenderComponent(Loading, null, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</section>`);
            } else {
              _push2(`<section${_scopeId}><h3 class="text-xl py-2 px-4 border-b text-white"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.no_posts_yet)}</h3></section>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-center gap-2 py-2 shadow-lg" }, [
                createVNode(_sfc_main$2),
                createVNode(_sfc_main$1)
              ]),
              createVNode("div", { class: "py-2 rounded-lg" }, [
                createVNode(_sfc_main$4, { class: "md:hidden p-2 bg-zinc-900 rounded-lg" }),
                unref(allPosts).length >= 1 ? (openBlock(), createBlock("section", {
                  key: 0,
                  class: "bg-zinc-800 text-white rounded-lg p-2 my-2"
                }, [
                  createVNode("h2", { class: "text-lg px-2 py-1" }, toDisplayString(_ctx.$page.props.words.posts), 1),
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(allPosts), (post) => {
                    return openBlock(), createBlock(Post, {
                      key: post.id,
                      class: "my-4 p-2 bg-zinc-900 rounded-lg",
                      post,
                      onDeletePost: deletePost
                    }, null, 8, ["post"]);
                  }), 128)),
                  unref(loading) ? (openBlock(), createBlock(Loading, { key: 0 })) : createCommentVNode("", true)
                ])) : (openBlock(), createBlock("section", { key: 1 }, [
                  createVNode("h3", { class: "text-xl py-2 px-4 border-b text-white" }, toDisplayString(_ctx.$page.props.words.no_posts_yet), 1)
                ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
