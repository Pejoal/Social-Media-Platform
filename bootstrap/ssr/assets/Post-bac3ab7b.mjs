import { ref, mergeProps, unref, withCtx, openBlock, createBlock, createCommentVNode, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderList } from "vue/server-renderer";
import { usePage, useForm, Link } from "@inertiajs/vue3";
import { a as _sfc_main$1 } from "./TextInput-66ab7a8d.mjs";
import { _ as _sfc_main$2 } from "./Dropdown-d2a4ee41.mjs";
import swal from "sweetalert";
import { L as Loading } from "./Loading-c0e5699a.mjs";
import { u as useFetch } from "./utils-a971894e.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.mjs";
const Post_vue_vue_type_style_index_0_scoped_c45ecd52_lang = "";
const _sfc_main = {
  __name: "Post",
  __ssrInlineRender: true,
  props: {
    post: Object
  },
  emits: ["deletePost"],
  setup(__props, { emit }) {
    var _a, _b;
    const properities = __props;
    const { component, props } = usePage();
    const canLikePost = ref(properities.post.canLikePost);
    const postLikes = ref(properities.post.likes);
    const comments = ref(((_b = (_a = properities.post) == null ? void 0 : _a.comments) == null ? void 0 : _b.data) ?? []);
    let allComments = ref([]);
    let page = ref(2);
    let loading = ref(false);
    ({ data: allComments, loading } = useFetch(
      route("user.post", [properities.post.id]),
      page,
      comments
    ));
    function handleLikePost() {
      canLikePost.value = !canLikePost.value;
      postLikes.value++;
    }
    function handleUnlikePost() {
      canLikePost.value = !canLikePost.value;
      postLikes.value--;
    }
    function handleLikeComment(key) {
      allComments.value[key].canLikeComment = !allComments.value[key].canLikeComment;
      allComments.value[key].likes++;
    }
    function handleUnlikeComment(key) {
      allComments.value[key].canLikeComment = !allComments.value[key].canLikeComment;
      allComments.value[key].likes--;
    }
    const commentForm = useForm({
      content: ""
    });
    const deletePostForm = useForm({
      component
    });
    const deleteCommentForm = useForm({});
    function handleDeletePost() {
      swal({
        title: props.words.are_you_sure,
        text: props.words.once_deleted_post,
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then((willDelete) => {
        if (willDelete) {
          deletePostForm.delete(route("user.posts.delete", properities.post.id), {
            preserveScroll: true,
            onSuccess: () => {
              swal(props.words.post_deleted, {
                icon: "success"
              });
              emit("deletePost", properities.post.id);
            },
            onError: (error) => {
              swal(props.words.something_went_wrong, error.message, "error");
            }
          });
        } else {
          swal(props.words.post_is_safe);
        }
      });
    }
    function handleDeleteComment(id) {
      swal({
        title: props.words.are_you_sure,
        text: props.words.once_deleted_comment,
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then((willDelete) => {
        if (willDelete) {
          deleteCommentForm.delete(route("comments.delete", id), {
            preserveScroll: true,
            onSuccess: () => {
              swal(props.words.comment_deleted, {
                icon: "success"
              });
              allComments.value = allComments.value.filter(function(comment) {
                return comment.id != id;
              });
            },
            onError: (error) => {
              swal(props.words.something_went_wrong, error.message, "error");
            }
          });
        } else {
          swal(props.words.comment_is_safe);
        }
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))} data-v-c45ecd52><section class="flex gap-12 ml-2 py-2" data-v-c45ecd52>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("user.profile", properities.post.username),
        as: "button",
        class: "flex items-center gap-2 text-gray-300 font-bold hover:text-gray-50 text-lg hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (properities.post.authorPhoto) {
              _push2(`<img class="w-10 h-10 md:w-14 md:h-14 rounded-full"${ssrRenderAttr("src", properities.post.authorPhoto)}${ssrRenderAttr("alt", _ctx.$page.props.words.profile_photo)} data-v-c45ecd52${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(properities.post.author)}`);
          } else {
            return [
              properities.post.authorPhoto ? (openBlock(), createBlock("img", {
                key: 0,
                class: "w-10 h-10 md:w-14 md:h-14 rounded-full",
                src: properities.post.authorPhoto,
                alt: _ctx.$page.props.words.profile_photo
              }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
              createTextVNode(" " + toDisplayString(properities.post.author), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><p class="ml-2 my-1" data-v-c45ecd52>${ssrInterpolate(properities.post.title)}</p><div class="pl-6 my-2" data-v-c45ecd52>${ssrInterpolate(properities.post.content)} <div class="text-green-500 float-right pt-6 px-4" data-v-c45ecd52>${ssrInterpolate(properities.post.created_at)}</div></div><div class="clear-both" data-v-c45ecd52></div><section class="flex justify-between items-center px-4" data-v-c45ecd52>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("posts.likes", properities.post),
        class: "text-gray-300 hover:text-gray-50 text-lg hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(postLikes.value)} ${ssrInterpolate(_ctx.$page.props.words.likes)}`);
          } else {
            return [
              createTextVNode(toDisplayString(postLikes.value) + " " + toDisplayString(_ctx.$page.props.words.likes), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("user.post", properities.post),
        class: "text-gray-300 hover:text-gray-50 text-lg hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(properities.post.commentsCount)} ${ssrInterpolate(_ctx.$page.props.words.comments)}`);
          } else {
            return [
              createTextVNode(toDisplayString(properities.post.commentsCount) + " " + toDisplayString(_ctx.$page.props.words.comments), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><section class="grid place-items-center" data-v-c45ecd52>`);
      if (canLikePost.value) {
        _push(ssrRenderComponent(unref(Link), {
          "preserve-scroll": true,
          href: _ctx.route("posts.likes.store", properities.post),
          method: "post",
          as: "button",
          onClick: handleLikePost,
          class: "btn btn-success"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$page.props.words.like)}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$page.props.words.like), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(unref(Link), {
          "preserve-scroll": true,
          href: _ctx.route("posts.likes.delete", properities.post),
          method: "delete",
          as: "button",
          onClick: handleUnlikePost,
          class: "btn btn-danger"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$page.props.words.unlike)}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$page.props.words.unlike), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</section>`);
      if (unref(component) === "User/Post") {
        _push(`<form class="my-3" data-v-c45ecd52><div class="grid place-items-center" data-v-c45ecd52><textarea id="content" required autofocus${ssrRenderAttr("placeholder", _ctx.$page.props.words.comment)} class="text-black rounded-lg py-2 px-4 my-2 w-3/4 h-24" data-v-c45ecd52>${ssrInterpolate(unref(commentForm).content)}</textarea>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          class: "my-2 px-4 py-2 bg-slate-100 rounded-lg",
          message: unref(commentForm).errors.content
        }, null, _parent));
        _push(`<button class="${ssrRenderClass([{ "opacity-25": unref(commentForm).processing }, "btn btn-primary"])}"${ssrIncludeBooleanAttr(unref(commentForm).processing) ? " disabled" : ""} data-v-c45ecd52>${ssrInterpolate(_ctx.$page.props.words.comment)}</button>`);
        if (unref(commentForm).recentlySuccessful) {
          _push(`<p class="text-sm my-1 text-white" data-v-c45ecd52>${ssrInterpolate(_ctx.$page.props.words.created)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></form>`);
      } else {
        _push(`<!---->`);
      }
      if (properities.post.canUpdatePost) {
        _push(`<div class="absolute right-4 top-2" data-v-c45ecd52>`);
        _push(ssrRenderComponent(_sfc_main$2, { width: "48" }, {
          trigger: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="inline-flex rounded-md" data-v-c45ecd52${_scopeId}><button type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150" data-v-c45ecd52${_scopeId}><svg class="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" data-v-c45ecd52${_scopeId}><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" data-v-c45ecd52${_scopeId}></path></svg></button></span>`);
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
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button class="block w-full text-red-400 hover:text-red-500 text-lg hover:underline px-4 py-2" data-v-c45ecd52${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.delete)}</button>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("user.posts.edit", properities.post.id),
                as: "button",
                class: "block w-full text-green-500 hover:green-red-800 text-lg hover:underline px-4 py-2"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.$page.props.words.edit)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.$page.props.words.edit), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode("button", {
                  onClick: ($event) => handleDeletePost(),
                  class: "block w-full text-red-400 hover:text-red-500 text-lg hover:underline px-4 py-2"
                }, toDisplayString(_ctx.$page.props.words.delete), 9, ["onClick"]),
                createVNode(unref(Link), {
                  href: _ctx.route("user.posts.edit", properities.post.id),
                  as: "button",
                  class: "block w-full text-green-500 hover:green-red-800 text-lg hover:underline px-4 py-2"
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
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(allComments).length >= 1) {
        _push(`<section class="bg-stone-800 py-2 rounded-lg" data-v-c45ecd52><h2 class="text-lg indent-4" data-v-c45ecd52>${ssrInterpolate(_ctx.$page.props.words.comments)}</h2><!--[-->`);
        ssrRenderList(unref(allComments), (comment, key) => {
          _push(`<section class="flex flex-col gap-4 my-2 py-2 px-4 bg-zinc-900 rounded-lg relative"${ssrRenderAttr("id", comment.id)} data-v-c45ecd52>`);
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("user.profile", comment.authorUsername),
            as: "button",
            class: "flex gap-2 items-center self-start text-gray-300 font-bold hover:text-gray-50 text-lg hover:underline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                if (comment.authorPhoto) {
                  _push2(`<img class="w-10 h-10 md:w-14 md:h-14 rounded-full"${ssrRenderAttr("src", comment.authorPhoto)}${ssrRenderAttr("alt", _ctx.$page.props.words.profile_photo)} data-v-c45ecd52${_scopeId}>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(` ${ssrInterpolate(comment.author)}`);
              } else {
                return [
                  comment.authorPhoto ? (openBlock(), createBlock("img", {
                    key: 0,
                    class: "w-10 h-10 md:w-14 md:h-14 rounded-full",
                    src: comment.authorPhoto,
                    alt: _ctx.$page.props.words.profile_photo
                  }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                  createTextVNode(" " + toDisplayString(comment.author), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<p class="indent-4" data-v-c45ecd52>${ssrInterpolate(comment.content)}</p><div class="flex flex-col gap-6 px-4" data-v-c45ecd52><section class="flex justify-between py-3 border-t" data-v-c45ecd52>`);
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("comments.likes", comment),
            class: "text-gray-300 hover:text-gray-50 text-lg hover:underline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(comment.likes)} ${ssrInterpolate(_ctx.$page.props.words.likes)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(comment.likes) + " " + toDisplayString(_ctx.$page.props.words.likes), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("comments.replies", comment),
            class: "text-green-300 hover:text-green-50 text-lg hover:underline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(comment.repliesCount)} ${ssrInterpolate(_ctx.$page.props.words.replies)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(comment.repliesCount) + " " + toDisplayString(_ctx.$page.props.words.replies), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          if (comment.canLikeComment) {
            _push(ssrRenderComponent(unref(Link), {
              href: _ctx.route("comments.likes.store", comment),
              method: "post",
              as: "button",
              onClick: ($event) => handleLikeComment(key),
              "preserve-scroll": true,
              class: "btn btn-success"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(_ctx.$page.props.words.like)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$page.props.words.like), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          if (!comment.canLikeComment) {
            _push(ssrRenderComponent(unref(Link), {
              href: _ctx.route("comments.likes.delete", comment),
              method: "delete",
              as: "button",
              onClick: ($event) => handleUnlikeComment(key),
              "preserve-scroll": true,
              class: "btn btn-danger"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(_ctx.$page.props.words.unlike)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$page.props.words.unlike), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</section>`);
          if (comment.canUpdateComment) {
            _push(`<section class="absolute right-4 top-2" data-v-c45ecd52>`);
            _push(ssrRenderComponent(_sfc_main$2, { width: "48" }, {
              trigger: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<span class="inline-flex rounded-md" data-v-c45ecd52${_scopeId}><button type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150" data-v-c45ecd52${_scopeId}><svg class="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" data-v-c45ecd52${_scopeId}><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" data-v-c45ecd52${_scopeId}></path></svg></button></span>`);
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
              content: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<button class="block w-full text-red-400 hover:text-red-500 text-lg hover:underline px-4 py-2" data-v-c45ecd52${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.delete)}</button>`);
                  _push2(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("comments.edit", comment.id),
                    as: "button",
                    class: "block w-full text-green-500 ml-auto hover:green-red-800 text-lg hover:underline"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(_ctx.$page.props.words.edit)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(_ctx.$page.props.words.edit), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  return [
                    createVNode("button", {
                      onClick: ($event) => handleDeleteComment(comment.id),
                      class: "block w-full text-red-400 hover:text-red-500 text-lg hover:underline px-4 py-2"
                    }, toDisplayString(_ctx.$page.props.words.delete), 9, ["onClick"]),
                    createVNode(unref(Link), {
                      href: _ctx.route("comments.edit", comment.id),
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
            }, _parent));
            _push(`</section>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></section>`);
        });
        _push(`<!--]-->`);
        if (unref(loading)) {
          _push(ssrRenderComponent(Loading, null, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Post.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Post = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c45ecd52"]]);
export {
  Post as P
};
