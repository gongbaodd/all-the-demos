import { defineConfig } from "astro/config";
import { createStyleImportPlugin, AntdResolve } from "vite-plugin-style-import";
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import solidJs from "@astrojs/solid-js";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), vue(), solidJs(), svelte()],
  vite: {
    plugins: [createStyleImportPlugin({
      resolves: [AntdResolve()]
    })]
  }
});