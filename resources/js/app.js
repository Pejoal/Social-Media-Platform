import "./bootstrap";
import "../css/app.css";

import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ZiggyVue } from "../../vendor/tightenco/ziggy/dist/vue.m";
import { i18nVue, trans } from "laravel-vue-i18n";

const appName =
  window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.vue`,
      import.meta.glob("./Pages/**/*.vue")
    ),
  setup({ el, App, props, plugin }) {
    const app = 
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(ZiggyVue, Ziggy)
      .use(i18nVue, {
        lang: "de",
        resolve: (lang) => {
          const langs = import.meta.glob("../../lang/*.json", { eager: true });
          return langs[`../../lang/${lang}.json`].default;
        },
      });

      app.config.globalProperties.trans = trans;
      app.mount(el);
  },
  progress: {
    color: "#4B5563",
  },
});
