import { App, Plugin } from "vue";
import "./index.css";

import { registerPlugin } from "./utils";
export { useSearch } from "./composables/useSearch";

import * as plugins from "./components/plugins";

export * from "./components";
export * from "./components/plugins";

const plugin: Plugin = {
  install(app: App) {
    // add all components
    for (const componentKey in plugins) {
      registerPlugin(app, plugins[componentKey as keyof typeof plugins]);
    }
  },
};

export { plugin as UpstashSearchUI };
export default plugin;
