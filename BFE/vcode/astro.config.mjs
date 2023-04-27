import { defineConfig } from "astro/config";
import {
  createStyleImportPlugin,
  AntdResolve,
  ElementPlusResolve,
} from "vite-plugin-style-import";
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import solidJs from "@astrojs/solid-js";
// import solidPlugin from "vite-plugin-solid";
import suidPlugin from "@suid/vite-plugin";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), vue(), solidJs(), svelte()],
  vite: {
    plugins: [
      suidPlugin(),
      createStyleImportPlugin({
        resolves: [AntdResolve(), ElementPlusResolve()],
      }),
    ],
  },
});
