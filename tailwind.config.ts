import type { Config } from "tailwindcss";

export default {
  content: ["src/**/*.{js,ts,vue}"],
  corePlugins: {
    preflight: false,
  },
} satisfies Config;
