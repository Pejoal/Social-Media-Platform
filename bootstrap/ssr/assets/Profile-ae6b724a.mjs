import { ref, unref, withCtx, isRef, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, createCommentVNode, Teleport, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderTeleport, ssrRenderList } from "vue/server-renderer";
import { A as AuthLayout, a as _sfc_main$1 } from "./AuthLayout-a31bd95f.mjs";
import { usePage, Head, Link } from "@inertiajs/vue3";
import { P as Post } from "./Post-bac3ab7b.mjs";
import { L as Loading } from "./Loading-c0e5699a.mjs";
import { u as useFetch } from "./utils-a971894e.mjs";
import "./Hamburger-c1553109.mjs";
import "./Dropdown-d2a4ee41.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./TextInput-66ab7a8d.mjs";
import "sweetalert";
const _sfc_main = {
  __name: "Profile",
  __ssrInlineRender: true,
  props: {
    posts: {
      type: Array,
      default: []
    },
    author: String,
    authorId: Number,
    authorUsername: String,
    postLikesGot: Number,
    friendshipRequestSenderId: {
      type: Number,
      default: 0
    },
    friendshipRequestId: {
      type: Number,
      default: 0
    },
    friendshipStatus: {
      type: String,
      default: "no"
    }
  },
  setup(__props) {
    const props = __props;
    let allPosts = ref([]);
    let page = ref(2);
    let loading = ref(false);
    ({ data: allPosts, loading } = useFetch(
      route("user.profile", props.authorId),
      page,
      props.posts
    ));
    let friendshipStatus = ref(props.friendshipStatus);
    let friendshipRequestSenderId = ref(props.friendshipRequestSenderId);
    const user = usePage().props.auth.user;
    async function sendFriendshipRequest() {
      try {
        axios.post("/sendFriendshipRequest", {
          user2_id: props.authorId,
          friendshipRequestId: props.friendshipRequestId
        }).then((res) => {
          friendshipStatus.value = "pending";
          friendshipRequestSenderId.value = user.id;
        });
      } catch (err) {
        console.log(err);
      }
    }
    async function cancelFriendshipRequest() {
      try {
        axios.delete("/cancelFriendshipRequest", {
          params: {
            user2_id: props.authorId
          }
        }).then((res) => {
          friendshipStatus.value = "canceled";
        });
      } catch (err) {
        console.log(err);
      }
    }
    let showModal = ref(true);
    let friendshipRequest = ref([]);
    async function getFriendShipRequest() {
      showModal.value = !showModal.value;
      try {
        axios.get("/getFriendShipRequest", {
          params: {
            user1_id: props.authorId
          }
        }).then((res) => {
          friendshipRequest.value = res.data;
        });
      } catch (err) {
        console.log(err);
      }
    }
    if (props.friendshipRequestId != 0 && props.friendshipStatus === "pending" && ![user.id, 0].includes(props.friendshipRequestSenderId)) {
      getFriendShipRequest();
    }
    async function rejectFriendshipRequest(friendshipRequestId, user2_id) {
      showModal.value = false;
      friendshipStatus.value = "rejected";
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
      showModal.value = false;
      friendshipStatus.value = "accepted";
      try {
        axios.post("/acceptFriendshipRequest", {
          friendshipRequestId,
          user2_id
        });
      } catch (err) {
        console.log(err);
      }
    }
    function deletePost(id) {
      allPosts.value = allPosts.value.filter(function(post) {
        return post.id != id;
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: props.author + `'s Profile`
      }, null, _parent));
      _push(ssrRenderComponent(AuthLayout, null, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="flex justify-between py-6 px-4"${_scopeId}><h2 class="font-semibold text-lg text-white leading-tight"${_scopeId}>${ssrInterpolate(props.author)}&#39;s Profile </h2>`);
            if (__props.postLikesGot) {
              _push2(`<div${_scopeId}>${ssrInterpolate(props.postLikesGot)} ${ssrInterpolate(_ctx.$page.props.words.likes)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</section>`);
            if (props.authorId != unref(user).id && unref(friendshipStatus) !== "accepted") {
              _push2(`<section class="flex justify-end bg-zinc-700 text-white px-4 py-2"${_scopeId}>`);
              if (unref(friendshipStatus) === "pending" && unref(friendshipRequestSenderId) == unref(user).id) {
                _push2(`<button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.cancel)}</button>`);
              } else if (props.friendshipRequestId != 0 && unref(friendshipStatus) === "pending" && ![unref(user).id, 0].includes(unref(friendshipRequestSenderId))) {
                _push2(`<div class="my-2"${_scopeId}><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.respond)}</button>`);
                ssrRenderTeleport(_push2, (_push3) => {
                  _push3(ssrRenderComponent(_sfc_main$1, {
                    show: unref(showModal),
                    onClose: ($event) => isRef(showModal) ? showModal.value = false : showModal = false
                  }, {
                    content: withCtx((_2, _push4, _parent3, _scopeId2) => {
                      if (_push4) {
                        _push4(`<div class="flex flex-col w-[70vw] px-2 py-1 overflow-y-auto"${_scopeId2}><div class="bg-zinc-800 shadow-md rounded-lg p-2 w-full"${_scopeId2}><div class="flex items-center justify-between mb-2"${_scopeId2}><h3 class="text-lg font-bold text-white"${_scopeId2}>${ssrInterpolate(props.author)}</h3><button class="text-red-500 font-bold"${_scopeId2}>${ssrInterpolate(_ctx.$page.props.words.reject)}</button></div><p class="text-sm text-gray-200"${_scopeId2}>${ssrInterpolate(_ctx.$page.props.words.sent_friend_request)}</p><p class="text-sm text-gray-300"${_scopeId2}>${ssrInterpolate(unref(friendshipRequest).updated_at)}</p><div class="flex justify-end mt-2"${_scopeId2}><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"${_scopeId2}>${ssrInterpolate(_ctx.$page.props.words.accept)}</button></div></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex flex-col w-[70vw] px-2 py-1 overflow-y-auto" }, [
                            createVNode("div", { class: "bg-zinc-800 shadow-md rounded-lg p-2 w-full" }, [
                              createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                                createVNode("h3", { class: "text-lg font-bold text-white" }, toDisplayString(props.author), 1),
                                createVNode("button", {
                                  class: "text-red-500 font-bold",
                                  onClick: ($event) => rejectFriendshipRequest(
                                    unref(friendshipRequest).id,
                                    unref(friendshipRequest).requester_id
                                  )
                                }, toDisplayString(_ctx.$page.props.words.reject), 9, ["onClick"])
                              ]),
                              createVNode("p", { class: "text-sm text-gray-200" }, toDisplayString(_ctx.$page.props.words.sent_friend_request), 1),
                              createVNode("p", { class: "text-sm text-gray-300" }, toDisplayString(unref(friendshipRequest).updated_at), 1),
                              createVNode("div", { class: "flex justify-end mt-2" }, [
                                createVNode("button", {
                                  onClick: ($event) => acceptFriendshipRequest(
                                    unref(friendshipRequest).id,
                                    unref(friendshipRequest).requester_id
                                  ),
                                  class: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                }, toDisplayString(_ctx.$page.props.words.accept), 9, ["onClick"])
                              ])
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent2, _scopeId));
                }, "body", false, _parent2);
                _push2(`</div>`);
              } else if (!["accepted", "blocked"].includes(unref(friendshipStatus))) {
                _push2(`<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.add_friend)}</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</section>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(friendshipStatus) === "accepted") {
              _push2(`<section class="flex justify-between py-4 px-12"${_scopeId}><h2 class="text-xl border-b"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.you_are_friends)}</h2>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("private.messages.index", props.authorUsername),
                as: "button",
                class: "text-lg text-green-500 hover:text-green-700 hover:underline"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.$page.props.words.chat)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.$page.props.words.chat), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</section>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="py-6"${_scopeId}>`);
            if (unref(allPosts).length >= 1) {
              _push2(`<section class="bg-zinc-900 text-white py-4 rounded-lg"${_scopeId}><!--[-->`);
              ssrRenderList(unref(allPosts), (post) => {
                _push2(ssrRenderComponent(Post, {
                  key: post.id,
                  class: "my-2 p-2 bg-zinc-800 rounded-lg",
                  onDeletePost: deletePost,
                  post
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
              createVNode("section", { class: "flex justify-between py-6 px-4" }, [
                createVNode("h2", { class: "font-semibold text-lg text-white leading-tight" }, toDisplayString(props.author) + "'s Profile ", 1),
                __props.postLikesGot ? (openBlock(), createBlock("div", { key: 0 }, toDisplayString(props.postLikesGot) + " " + toDisplayString(_ctx.$page.props.words.likes), 1)) : createCommentVNode("", true)
              ]),
              props.authorId != unref(user).id && unref(friendshipStatus) !== "accepted" ? (openBlock(), createBlock("section", {
                key: 0,
                class: "flex justify-end bg-zinc-700 text-white px-4 py-2"
              }, [
                unref(friendshipStatus) === "pending" && unref(friendshipRequestSenderId) == unref(user).id ? (openBlock(), createBlock("button", {
                  key: 0,
                  class: "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded",
                  onClick: cancelFriendshipRequest
                }, toDisplayString(_ctx.$page.props.words.cancel), 1)) : props.friendshipRequestId != 0 && unref(friendshipStatus) === "pending" && ![unref(user).id, 0].includes(unref(friendshipRequestSenderId)) ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "my-2"
                }, [
                  createVNode("button", {
                    class: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
                    onClick: getFriendShipRequest
                  }, toDisplayString(_ctx.$page.props.words.respond), 1),
                  (openBlock(), createBlock(Teleport, { to: "body" }, [
                    createVNode(_sfc_main$1, {
                      show: unref(showModal),
                      onClose: ($event) => isRef(showModal) ? showModal.value = false : showModal = false
                    }, {
                      content: withCtx(() => [
                        createVNode("div", { class: "flex flex-col w-[70vw] px-2 py-1 overflow-y-auto" }, [
                          createVNode("div", { class: "bg-zinc-800 shadow-md rounded-lg p-2 w-full" }, [
                            createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                              createVNode("h3", { class: "text-lg font-bold text-white" }, toDisplayString(props.author), 1),
                              createVNode("button", {
                                class: "text-red-500 font-bold",
                                onClick: ($event) => rejectFriendshipRequest(
                                  unref(friendshipRequest).id,
                                  unref(friendshipRequest).requester_id
                                )
                              }, toDisplayString(_ctx.$page.props.words.reject), 9, ["onClick"])
                            ]),
                            createVNode("p", { class: "text-sm text-gray-200" }, toDisplayString(_ctx.$page.props.words.sent_friend_request), 1),
                            createVNode("p", { class: "text-sm text-gray-300" }, toDisplayString(unref(friendshipRequest).updated_at), 1),
                            createVNode("div", { class: "flex justify-end mt-2" }, [
                              createVNode("button", {
                                onClick: ($event) => acceptFriendshipRequest(
                                  unref(friendshipRequest).id,
                                  unref(friendshipRequest).requester_id
                                ),
                                class: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                              }, toDisplayString(_ctx.$page.props.words.accept), 9, ["onClick"])
                            ])
                          ])
                        ])
                      ]),
                      _: 1
                    }, 8, ["show", "onClose"])
                  ]))
                ])) : !["accepted", "blocked"].includes(unref(friendshipStatus)) ? (openBlock(), createBlock("button", {
                  key: 2,
                  class: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
                  onClick: sendFriendshipRequest
                }, toDisplayString(_ctx.$page.props.words.add_friend), 1)) : createCommentVNode("", true)
              ])) : createCommentVNode("", true),
              unref(friendshipStatus) === "accepted" ? (openBlock(), createBlock("section", {
                key: 1,
                class: "flex justify-between py-4 px-12"
              }, [
                createVNode("h2", { class: "text-xl border-b" }, toDisplayString(_ctx.$page.props.words.you_are_friends), 1),
                createVNode(unref(Link), {
                  href: _ctx.route("private.messages.index", props.authorUsername),
                  as: "button",
                  class: "text-lg text-green-500 hover:text-green-700 hover:underline"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$page.props.words.chat), 1)
                  ]),
                  _: 1
                }, 8, ["href"])
              ])) : createCommentVNode("", true),
              createVNode("div", { class: "py-6" }, [
                unref(allPosts).length >= 1 ? (openBlock(), createBlock("section", {
                  key: 0,
                  class: "bg-zinc-900 text-white py-4 rounded-lg"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(allPosts), (post) => {
                    return openBlock(), createBlock(Post, {
                      key: post.id,
                      class: "my-2 p-2 bg-zinc-800 rounded-lg",
                      onDeletePost: deletePost,
                      post
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/Profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
