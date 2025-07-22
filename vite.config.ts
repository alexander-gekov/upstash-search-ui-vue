import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import path from "path";

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
  css: {
    postcss: "./postcss.config.js",
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "SearchUI",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "es" : "cjs"}.js`,
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
        assetFileNames: "index.css",
      },
    },
  },
});
