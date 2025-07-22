import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ["src/**/*.ts", "src/**/*.vue"],
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace("/src", ""),
        content,
      }),
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "upstash-search-ui-vue",
      fileName: (format) => `index.${format === "es" ? "mjs" : "cjs"}`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [
        "vue",
        "@vueuse/core",
        "@iconify/vue",
        "clsx",
        "reka-ui",
        "tailwind-merge",
        "lucide-vue-next",
      ],
      output: {
        globals: {
          vue: "Vue",
          "@vueuse/core": "VueUse",
          "@iconify/vue": "Iconify",
          clsx: "clsx",
          "reka-ui": "RekaUI",
          "tailwind-merge": "tailwindMerge",
          "lucide-vue-next": "Lucide",
        },
      },
    },
  },
});
