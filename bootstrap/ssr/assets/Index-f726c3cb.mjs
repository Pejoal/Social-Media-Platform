import { ref, unref, withCtx, createVNode, toDisplayString, withDirectives, isRef, openBlock, createBlock, Fragment, renderList, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { A as AuthLayout } from "./AuthLayout-18ded6d5.mjs";
import { usePage, Head } from "@inertiajs/vue3";
import "./Hamburger-c1553109.mjs";
import "./Dropdown-d2a4ee41.mjs";
import "./_plugin-vue_export-helper-cc2b3d55.mjs";
import "./TextInput-66ab7a8d.mjs";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    rooms: {
      type: Array,
      default: []
    }
  },
  setup(__props) {
    const props = __props;
    const { props: properities } = usePage();
    let selectedRoom = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: unref(properities).words.rooms
      }, null, _parent));
      _push(ssrRenderComponent(AuthLayout, null, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-zinc-800 rounded-lg text-white"${_scopeId}><div class="overflow-hidden shadow-sm sm:rounded-lg"${_scopeId}><div class="container mx-auto"${_scopeId}><form${ssrRenderAttr("action", _ctx.route("rooms.room", unref(selectedRoom)))} class="flex flex-col py-2 px-4 my-2 mx-4" method="GET"${_scopeId}><label for="room" class="block font-medium"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.rooms)}:</label><select name="room" id="room" class="block w-full text-black mt-1 rounded-md shadow-sm border-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"${_scopeId}><option value="" disabled${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.please_select)}</option><!--[-->`);
            ssrRenderList(unref(props).rooms, (room) => {
              _push2(`<option${ssrRenderAttr("id", room.id)}${ssrRenderAttr("value", room.slug)} class="bg-zinc-800 hover:bg-zinc-800 text-gray-100 hover:text-white"${_scopeId}>${ssrInterpolate(room.title)}</option>`);
            });
            _push2(`<!--]--></select><button type="submit" class="inline-block bg-indigo-500 hover:bg-indigo-700 text-white font-bold my-4 py-2 px-4 rounded-md self-center justify-center"${_scopeId}>${ssrInterpolate(_ctx.$page.props.words.join_room)}</button></form></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "bg-zinc-800 rounded-lg text-white" }, [
                createVNode("div", { class: "overflow-hidden shadow-sm sm:rounded-lg" }, [
                  createVNode("div", { class: "container mx-auto" }, [
                    createVNode("form", {
                      action: _ctx.route("rooms.room", unref(selectedRoom)),
                      class: "flex flex-col py-2 px-4 my-2 mx-4",
                      method: "GET"
                    }, [
                      createVNode("label", {
                        for: "room",
                        class: "block font-medium"
                      }, toDisplayString(_ctx.$page.props.words.rooms) + ":", 1),
                      withDirectives(createVNode("select", {
                        name: "room",
                        id: "room",
                        "onUpdate:modelValue": ($event) => isRef(selectedRoom) ? selectedRoom.value = $event : selectedRoom = $event,
                        class: "block w-full text-black mt-1 rounded-md shadow-sm border-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      }, [
                        createVNode("option", {
                          value: "",
                          disabled: ""
                        }, toDisplayString(_ctx.$page.props.words.please_select), 1),
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(props).rooms, (room) => {
                          return openBlock(), createBlock("option", {
                            id: room.id,
                            value: room.slug,
                            class: "bg-zinc-800 hover:bg-zinc-800 text-gray-100 hover:text-white"
                          }, toDisplayString(room.title), 9, ["id", "value"]);
                        }), 256))
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, unref(selectedRoom)]
                      ]),
                      createVNode("button", {
                        type: "submit",
                        class: "inline-block bg-indigo-500 hover:bg-indigo-700 text-white font-bold my-4 py-2 px-4 rounded-md self-center justify-center"
                      }, toDisplayString(_ctx.$page.props.words.join_room), 1)
                    ], 8, ["action"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Room/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
