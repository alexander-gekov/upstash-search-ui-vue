import type { App, Plugin } from "vue";

import Gekata from "./Gekata.vue";

import { registerComponent } from "../../utils";

export default {
  install(app: App) {
    registerComponent(app, Gekata);
  },
} as Plugin;

export { Gekata };
