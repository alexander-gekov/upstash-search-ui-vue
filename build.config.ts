import { defineBuildConfig } from "unbuild";
import vuePlugin from "@vitejs/plugin-vue";

export default defineBuildConfig({
  entries: ["./src/index"],
  declaration: true,
  clean: true,
  hooks: {
    "rollup:options"(_ctx, options) {
      options.plugins = [
        vuePlugin({
          include: [/\.vue$/],
          isProduction: true,
        }),
        ...(options.plugins || []),
      ];
    },
  },
  rollup: {
    emitCJS: true,
    esbuild: {
      target: "es2020",
      minify: false,
    },
  },
  externals: [
    "vue",
    "@vueuse/core",
    "@iconify/vue",
    "clsx",
    "reka-ui",
    "tailwind-merge",
    "lucide-vue-next",
  ],
});
