import { ref, watch, unref, withCtx, createVNode, toDisplayString, withDirectives, isRef, vModelText, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { A as AuthLayout } from "./AuthLayout-18ded6d5.mjs";
import { P as Post } from "./Post-53712adf.mjs";
import { L as Loading } from "./Loading-c0e5699a.mjs";
import { Head } from "@inertiajs/vue3";
import { u as useFetch } from "./utils-a971894e.mjs";
import "laravel-vue-i18n";
import "./Hamburger-c1553109.mjs";
import "./Dropdown-d2a4ee41.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./TextInput-66ab7a8d.mjs";
import "sweetalert";
const _sfc_main = {
  __name: "Home",
  __ssrInlineRender: true,
  props: {
    posts: {
      type: Array,
      default: []
    },
    filters: {
      type: Object,
      default: {
        search: ""
      }
    },
    joined_chat_groups: {
      type: Array,
      default: []
    },
    projects: {
      type: Array,
      default: []
    }
  },
  setup(__props) {
    const props = __props;
    let search = ref(props.filters.search);
    function setPosts() {
      const mergedArray = [...props.posts, ...allPosts.value];
      allPosts.value = Array.from(new Set(mergedArray.map((obj) => obj.id))).map(
        (id) => mergedArray.find((obj) => obj.id === id)
      );
    }
    let allPosts = ref([]);
    let page = ref(2);
    let loading = ref(false);
    ({
      data: allPosts,
      page,
      loading
    } = useFetch(route("home"), page, props.posts));
    async function doSearch(search2) {
      try {
        loading.value = true;
        const response = await axios.get(route("home"), {
          params: {
            search: search2
          }
        });
        allPosts.value = response.data.data;
        page.value == 2;
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
      }
    }
    watch(search, (value) => {
      doSearch(value);
    });
    function deletePost(id) {
      allPosts.value = allPosts.value.filter(function(post) {
        return post.id != id;
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.home)}</title>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(_ctx.$page.props.words.home), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AuthLayout, {
        onSetPosts: setPosts,
        joined_chat_groups: props.joined_chat_groups,
        projects: props.projects
      }, {
        "left-sidebar": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2)
            ;
          else {
            return [];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="flex items-center justify-between px-4 md:px-0 pt-6 pb-4"${_scopeId}><button class="btn btn-primary"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.search)} </button><input class="py-2 px-4 rounded-xl text-black w-3/4" type="search" name="search"${ssrRenderAttr("placeholder", _ctx.$page.props.words.search + " " + _ctx.$page.props.appName)} id="search"${ssrRenderAttr("value", unref(search))}${_scopeId}></section>`);
            if (unref(allPosts).length >= 1) {
              _push2(`<section${_scopeId}><!--[-->`);
              ssrRenderList(unref(allPosts), (post) => {
                _push2(`<div class="flex flex-col gap-1 my-4 p-2 bg-neutral-900 rounded-lg"${_scopeId}>`);
                _push2(ssrRenderComponent(Post, {
                  post,
                  onDeletePost: deletePost
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              });
              _push2(`<!--]-->`);
              if (unref(loading)) {
                _push2(ssrRenderComponent(Loading, null, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</section>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("section", { class: "flex items-center justify-between px-4 md:px-0 pt-6 pb-4" }, [
                createVNode("button", {
                  class: "btn btn-primary",
                  onClick: ($event) => doSearch(unref(search))
                }, toDisplayString(_ctx.$page.props.words.search) + " ", 9, ["onClick"]),
                withDirectives(createVNode("input", {
                  class: "py-2 px-4 rounded-xl text-black w-3/4",
                  type: "search",
                  name: "search",
                  placeholder: _ctx.$page.props.words.search + " " + _ctx.$page.props.appName,
                  id: "search",
                  "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : search = $event
                }, null, 8, ["placeholder", "onUpdate:modelValue"]), [
                  [vModelText, unref(search)]
                ])
              ]),
              unref(allPosts).length >= 1 ? (openBlock(), createBlock("section", { key: 0 }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(allPosts), (post) => {
                  return openBlock(), createBlock("div", {
                    key: post.id,
                    class: "flex flex-col gap-1 my-4 p-2 bg-neutral-900 rounded-lg"
                  }, [
                    createVNode(Post, {
                      post,
                      onDeletePost: deletePost
                    }, null, 8, ["post"])
                  ]);
                }), 128)),
                unref(loading) ? (openBlock(), createBlock(Loading, { key: 0 })) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
