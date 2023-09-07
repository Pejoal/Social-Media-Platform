import { ref, unref, withCtx, createVNode, openBlock, createBlock, createTextVNode, toDisplayString, createCommentVNode, withModifiers, Transition, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { A as AuthLayout } from "./AuthLayout-18ded6d5.mjs";
import { usePage, useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./TextInput-66ab7a8d.mjs";
import { _ as _sfc_main$1 } from "./Dropdown-d2a4ee41.mjs";
import swal from "sweetalert";
import { u as useFetch } from "./utils-a971894e.mjs";
import { L as Loading } from "./Loading-c0e5699a.mjs";
import "./Hamburger-c1553109.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    comment: {
      type: Object,
      default: {
        id: 0,
        content: "",
        author: "",
        authorUsername: "",
        canLikeComment: false,
        canUpdateComment: false
      }
    },
    replies: {
      type: Array,
      default: []
    }
  },
  setup(__props) {
    const props = __props;
    const { component, props: properities } = usePage();
    const contentInput = ref(null);
    const form = useForm({
      content: ""
    });
    const page = ref(2);
    const { data: allReplies, loading } = useFetch(
      route("comments.replies", props.comment.id),
      page,
      props.replies
    );
    const storeReply = () => {
      form.post(route("comments.replies.store", props.comment.id), {
        preserveScroll: true,
        onSuccess: () => {
          const mergedArray = [...props.replies, ...allReplies.value];
          allReplies.value = Array.from(
            new Set(mergedArray.map((obj) => obj.id))
          ).map((id) => mergedArray.find((obj) => obj.id === id));
          form.reset();
        },
        onError: () => {
          if (form.errors.content) {
            form.reset("content");
            contentInput.value.focus();
          }
        }
      });
    };
    const back = () => {
      window.history.back();
    };
    ref(properities.comment.canLikeComment);
    const handleLikeReply = (key) => {
      allReplies.value[key].canLikeReply = !allReplies.value[key].canLikeReply;
      allReplies.value[key].likes++;
    };
    const handleUnlikeReply = (key) => {
      allReplies.value[key].canLikeReply = !allReplies.value[key].canLikeReply;
      allReplies.value[key].likes--;
    };
    const deleteCommentForm = useForm({
      component
    });
    const deleteReplyForm = useForm({});
    function handleDeleteComment(id) {
      swal({
        title: properities.words.are_you_sure,
        text: properities.words.once_deleted_comment,
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then((willDelete) => {
        if (willDelete) {
          deleteCommentForm.delete(route("comments.delete", id), {
            preserveScroll: true,
            onSuccess: () => {
              swal(properities.words.comment_deleted, {
                icon: "success"
              });
              form.reset("content");
            },
            onError: (error) => {
              swal(properities.words.something_went_wrong, error.message, "error");
            }
          });
        } else {
          swal(properities.words.comment_is_safe);
        }
      });
    }
    function handleDeleteReply(id, replyId) {
      swal({
        title: properities.words.are_you_sure,
        text: properities.words.once_deleted_reply,
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then((willDelete) => {
        if (willDelete) {
          deleteReplyForm.delete(
            route("comments.replies.delete", [id, replyId]),
            {
              preserveScroll: true,
              onSuccess: () => {
                swal(properities.words.reply_deleted, {
                  icon: "success"
                });
                allReplies.value = allReplies.value.filter(function(reply) {
                  return reply.id != replyId;
                });
                form.reset("content");
              },
              onError: (error) => {
                swal(properities.words.something_went_wrong, error.message);
              }
            }
          );
        } else {
          swal(properities.words.reply_is_safe);
        }
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: unref(properities).words.replies
      }, null, _parent));
      _push(ssrRenderComponent(AuthLayout, null, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(props).comment.id) {
              _push2(`<section class="relative py-6 mb-4 rounded-lg bg-zinc-800 text-white"${_scopeId}>`);
              if (unref(props).comment.canUpdateComment) {
                _push2(`<section class="absolute right-4 top-2"${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$1, { width: "48" }, {
                  trigger: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span class="inline-flex rounded-md"${_scopeId2}><button type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"${_scopeId2}><svg class="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${_scopeId2}><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"${_scopeId2}></path></svg></button></span>`);
                    } else {
                      return [
                        createVNode("span", { class: "inline-flex rounded-md" }, [
                          createVNode("button", {
                            type: "button",
                            class: "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                          }, [
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
                  content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<button class="block w-full text-red-400 hover:text-red-500 text-lg hover:underline px-4 py-2"${_scopeId2}>${ssrInterpolate(_ctx.$page.props.words.delete)}</button>`);
                      _push3(ssrRenderComponent(unref(Link), {
                        href: _ctx.route("comments.edit", unref(props).comment.id),
                        as: "button",
                        class: "block w-full text-green-500 ml-auto hover:green-red-800 text-lg hover:underline"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(_ctx.$page.props.words.edit)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(_ctx.$page.props.words.edit), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode("button", {
                          onClick: ($event) => handleDeleteComment(unref(props).comment.id),
                          class: "block w-full text-red-400 hover:text-red-500 text-lg hover:underline px-4 py-2"
                        }, toDisplayString(_ctx.$page.props.words.delete), 9, ["onClick"]),
                        createVNode(unref(Link), {
                          href: _ctx.route("comments.edit", unref(props).comment.id),
                          as: "button",
                          class: "block w-full text-green-500 ml-auto hover:green-red-800 text-lg hover:underline"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.$page.props.words.edit), 1)
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</section>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("user.profile", unref(props).comment.authorUsername),
                as: "button",
                class: "text-gray-300 px-2 font-bold hover:text-gray-50 text-lg hover:underline"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(props).comment.author)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(props).comment.author), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<p class="mt-3 px-4"${_scopeId}>${unref(props).comment.content}</p><form class="bg-zinc-700 mt-6 mx-2 space-y-6 p-2 rounded-lg"${_scopeId}><div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                id: "content",
                ref_key: "contentInput",
                ref: contentInput,
                modelValue: unref(form).content,
                "onUpdate:modelValue": ($event) => unref(form).content = $event,
                placeholder: _ctx.$page.props.words.reply_content,
                type: "text",
                class: "mt-1 text-black block w-full"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$3, {
                class: "my-2 px-4 py-2 bg-slate-100 rounded-lg",
                message: unref(form).errors.content
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="flex items-center gap-4"${_scopeId}><button class="btn btn-primary"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.reply)}</button>`);
              if (unref(form).recentlySuccessful) {
                _push2(`<p class="text-white text-sm my-1"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.replied)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></form>`);
              if (unref(allReplies).length >= 1) {
                _push2(`<section class="py-4 my-4 border border-zinc-700 rounded-lg bg-zinc-700 text-white"${_scopeId}><p class="px-2"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.the_replies)}:</p><section class="py-3 px-1"${_scopeId}><!--[-->`);
                ssrRenderList(unref(allReplies), (reply, key) => {
                  _push2(`<div class="my-2 p-2 rounded-lg relative bg-zinc-800"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("user.profile", reply.author),
                    as: "button",
                    class: "flex gap-2 items-center self-start text-gray-300 font-bold hover:text-gray-50 text-lg hover:underline"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        if (reply.authorPhoto) {
                          _push3(`<img class="w-10 h-10 md:w-14 md:h-14 rounded-full"${ssrRenderAttr("src", reply.authorPhoto)}${ssrRenderAttr("alt", _ctx.$page.props.words.profile_photo)}${_scopeId2}>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(` ${ssrInterpolate(reply.author)}`);
                      } else {
                        return [
                          reply.authorPhoto ? (openBlock(), createBlock("img", {
                            key: 0,
                            class: "w-10 h-10 md:w-14 md:h-14 rounded-full",
                            src: reply.authorPhoto,
                            alt: _ctx.$page.props.words.profile_photo
                          }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                          createTextVNode(" " + toDisplayString(reply.author), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`<p class="indent-3 mt-4 pb-2 border-b"${_scopeId}>${ssrInterpolate(reply.content)}</p><div class="flex justify-between px-6 py-2 my-1"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("comments.replies.likes", [
                      unref(props).comment.id,
                      reply.id
                    ]),
                    class: "text-gray-300 hover:text-gray-50 text-lg hover:underline"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(reply.likes)} ${ssrInterpolate(_ctx.$page.props.words.likes)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(reply.likes) + " " + toDisplayString(_ctx.$page.props.words.likes), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  if (reply.canLikeReply) {
                    _push2(ssrRenderComponent(unref(Link), {
                      "preserve-scroll": true,
                      href: _ctx.route("comments.replies.likes.store", [
                        unref(props).comment.id,
                        reply.id
                      ]),
                      onClick: ($event) => handleLikeReply(key),
                      method: "post",
                      as: "button",
                      class: "btn btn-success"
                    }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`${ssrInterpolate(_ctx.$page.props.words.like)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(_ctx.$page.props.words.like), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent2, _scopeId));
                  } else {
                    _push2(`<!---->`);
                  }
                  if (!reply.canLikeReply) {
                    _push2(ssrRenderComponent(unref(Link), {
                      "preserve-scroll": true,
                      href: _ctx.route("comments.replies.likes.delete", [
                        unref(props).comment.id,
                        reply.id
                      ]),
                      onClick: ($event) => handleUnlikeReply(key),
                      method: "delete",
                      as: "button",
                      class: "btn btn-danger"
                    }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`${ssrInterpolate(_ctx.$page.props.words.unlike)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(_ctx.$page.props.words.unlike), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent2, _scopeId));
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                  if (reply.canUpdateReply) {
                    _push2(`<section class="absolute right-4 top-2"${_scopeId}>`);
                    _push2(ssrRenderComponent(_sfc_main$1, { width: "48" }, {
                      trigger: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`<span class="inline-flex rounded-md"${_scopeId2}><button type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"${_scopeId2}><svg class="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${_scopeId2}><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"${_scopeId2}></path></svg></button></span>`);
                        } else {
                          return [
                            createVNode("span", { class: "inline-flex rounded-md" }, [
                              createVNode("button", {
                                type: "button",
                                class: "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                              }, [
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
                      content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`<button class="block w-full text-red-400 hover:text-red-500 text-lg hover:underline px-4 py-2"${_scopeId2}>${ssrInterpolate(_ctx.$page.props.words.delete)}</button>`);
                          _push3(ssrRenderComponent(unref(Link), {
                            href: _ctx.route("comments.replies.edit", [
                              unref(props).comment.id,
                              reply.id
                            ]),
                            as: "button",
                            class: "block w-full text-green-500 ml-auto hover:green-red-800 text-lg hover:underline"
                          }, {
                            default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                              if (_push4) {
                                _push4(`${ssrInterpolate(_ctx.$page.props.words.edit)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(_ctx.$page.props.words.edit), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent3, _scopeId2));
                        } else {
                          return [
                            createVNode("button", {
                              onClick: ($event) => handleDeleteReply(unref(props).comment.id, reply.id),
                              class: "block w-full text-red-400 hover:text-red-500 text-lg hover:underline px-4 py-2"
                            }, toDisplayString(_ctx.$page.props.words.delete), 9, ["onClick"]),
                            createVNode(unref(Link), {
                              href: _ctx.route("comments.replies.edit", [
                                unref(props).comment.id,
                                reply.id
                              ]),
                              as: "button",
                              class: "block w-full text-green-500 ml-auto hover:green-red-800 text-lg hover:underline"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.$page.props.words.edit), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent2, _scopeId));
                    _push2(`</section>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                });
                _push2(`<!--]-->`);
                if (unref(loading)) {
                  _push2(ssrRenderComponent(Loading, null, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</section><button class="ml-6 btn btn-warning"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.back)}</button></section>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</section>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(props).comment.id ? (openBlock(), createBlock("section", {
                key: 0,
                class: "relative py-6 mb-4 rounded-lg bg-zinc-800 text-white"
              }, [
                unref(props).comment.canUpdateComment ? (openBlock(), createBlock("section", {
                  key: 0,
                  class: "absolute right-4 top-2"
                }, [
                  createVNode(_sfc_main$1, { width: "48" }, {
                    trigger: withCtx(() => [
                      createVNode("span", { class: "inline-flex rounded-md" }, [
                        createVNode("button", {
                          type: "button",
                          class: "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                        }, [
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
                    ]),
                    content: withCtx(() => [
                      createVNode("button", {
                        onClick: ($event) => handleDeleteComment(unref(props).comment.id),
                        class: "block w-full text-red-400 hover:text-red-500 text-lg hover:underline px-4 py-2"
                      }, toDisplayString(_ctx.$page.props.words.delete), 9, ["onClick"]),
                      createVNode(unref(Link), {
                        href: _ctx.route("comments.edit", unref(props).comment.id),
                        as: "button",
                        class: "block w-full text-green-500 ml-auto hover:green-red-800 text-lg hover:underline"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$page.props.words.edit), 1)
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ]),
                    _: 1
                  })
                ])) : createCommentVNode("", true),
                createVNode(unref(Link), {
                  href: _ctx.route("user.profile", unref(props).comment.authorUsername),
                  as: "button",
                  class: "text-gray-300 px-2 font-bold hover:text-gray-50 text-lg hover:underline"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(props).comment.author), 1)
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode("p", {
                  class: "mt-3 px-4",
                  innerHTML: unref(props).comment.content
                }, null, 8, ["innerHTML"]),
                createVNode("form", {
                  onSubmit: withModifiers(storeReply, ["prevent"]),
                  class: "bg-zinc-700 mt-6 mx-2 space-y-6 p-2 rounded-lg"
                }, [
                  createVNode("div", null, [
                    createVNode(_sfc_main$2, {
                      id: "content",
                      ref_key: "contentInput",
                      ref: contentInput,
                      modelValue: unref(form).content,
                      "onUpdate:modelValue": ($event) => unref(form).content = $event,
                      placeholder: _ctx.$page.props.words.reply_content,
                      type: "text",
                      class: "mt-1 text-black block w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                    createVNode(_sfc_main$3, {
                      class: "my-2 px-4 py-2 bg-slate-100 rounded-lg",
                      message: unref(form).errors.content
                    }, null, 8, ["message"])
                  ]),
                  createVNode("div", { class: "flex items-center gap-4" }, [
                    createVNode("button", {
                      class: "btn btn-primary",
                      disabled: unref(form).processing
                    }, toDisplayString(_ctx.$page.props.words.reply), 9, ["disabled"]),
                    createVNode(Transition, {
                      "enter-from-class": "opacity-0",
                      "leave-to-class": "opacity-0",
                      class: "transition ease-in-out"
                    }, {
                      default: withCtx(() => [
                        unref(form).recentlySuccessful ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-white text-sm my-1"
                        }, toDisplayString(_ctx.$page.props.words.replied), 1)) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ])
                ], 40, ["onSubmit"]),
                unref(allReplies).length >= 1 ? (openBlock(), createBlock("section", {
                  key: 1,
                  class: "py-4 my-4 border border-zinc-700 rounded-lg bg-zinc-700 text-white"
                }, [
                  createVNode("p", { class: "px-2" }, toDisplayString(_ctx.$page.props.words.the_replies) + ":", 1),
                  createVNode("section", { class: "py-3 px-1" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(allReplies), (reply, key) => {
                      return openBlock(), createBlock("div", {
                        key: reply.id,
                        class: "my-2 p-2 rounded-lg relative bg-zinc-800"
                      }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("user.profile", reply.author),
                          as: "button",
                          class: "flex gap-2 items-center self-start text-gray-300 font-bold hover:text-gray-50 text-lg hover:underline"
                        }, {
                          default: withCtx(() => [
                            reply.authorPhoto ? (openBlock(), createBlock("img", {
                              key: 0,
                              class: "w-10 h-10 md:w-14 md:h-14 rounded-full",
                              src: reply.authorPhoto,
                              alt: _ctx.$page.props.words.profile_photo
                            }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                            createTextVNode(" " + toDisplayString(reply.author), 1)
                          ]),
                          _: 2
                        }, 1032, ["href"]),
                        createVNode("p", { class: "indent-3 mt-4 pb-2 border-b" }, toDisplayString(reply.content), 1),
                        createVNode("div", { class: "flex justify-between px-6 py-2 my-1" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("comments.replies.likes", [
                              unref(props).comment.id,
                              reply.id
                            ]),
                            class: "text-gray-300 hover:text-gray-50 text-lg hover:underline"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(reply.likes) + " " + toDisplayString(_ctx.$page.props.words.likes), 1)
                            ]),
                            _: 2
                          }, 1032, ["href"]),
                          reply.canLikeReply ? (openBlock(), createBlock(unref(Link), {
                            key: 0,
                            "preserve-scroll": true,
                            href: _ctx.route("comments.replies.likes.store", [
                              unref(props).comment.id,
                              reply.id
                            ]),
                            onClick: ($event) => handleLikeReply(key),
                            method: "post",
                            as: "button",
                            class: "btn btn-success"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.$page.props.words.like), 1)
                            ]),
                            _: 2
                          }, 1032, ["href", "onClick"])) : createCommentVNode("", true),
                          !reply.canLikeReply ? (openBlock(), createBlock(unref(Link), {
                            key: 1,
                            "preserve-scroll": true,
                            href: _ctx.route("comments.replies.likes.delete", [
                              unref(props).comment.id,
                              reply.id
                            ]),
                            onClick: ($event) => handleUnlikeReply(key),
                            method: "delete",
                            as: "button",
                            class: "btn btn-danger"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.$page.props.words.unlike), 1)
                            ]),
                            _: 2
                          }, 1032, ["href", "onClick"])) : createCommentVNode("", true)
                        ]),
                        reply.canUpdateReply ? (openBlock(), createBlock("section", {
                          key: 0,
                          class: "absolute right-4 top-2"
                        }, [
                          createVNode(_sfc_main$1, { width: "48" }, {
                            trigger: withCtx(() => [
                              createVNode("span", { class: "inline-flex rounded-md" }, [
                                createVNode("button", {
                                  type: "button",
                                  class: "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                }, [
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
                            ]),
                            content: withCtx(() => [
                              createVNode("button", {
                                onClick: ($event) => handleDeleteReply(unref(props).comment.id, reply.id),
                                class: "block w-full text-red-400 hover:text-red-500 text-lg hover:underline px-4 py-2"
                              }, toDisplayString(_ctx.$page.props.words.delete), 9, ["onClick"]),
                              createVNode(unref(Link), {
                                href: _ctx.route("comments.replies.edit", [
                                  unref(props).comment.id,
                                  reply.id
                                ]),
                                as: "button",
                                class: "block w-full text-green-500 ml-auto hover:green-red-800 text-lg hover:underline"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(_ctx.$page.props.words.edit), 1)
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ]),
                            _: 2
                          }, 1024)
                        ])) : createCommentVNode("", true)
                      ]);
                    }), 128)),
                    unref(loading) ? (openBlock(), createBlock(Loading, { key: 0 })) : createCommentVNode("", true)
                  ]),
                  createVNode("button", {
                    class: "ml-6 btn btn-warning",
                    onClick: back
                  }, toDisplayString(_ctx.$page.props.words.back), 1)
                ])) : createCommentVNode("", true)
              ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Replies/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
