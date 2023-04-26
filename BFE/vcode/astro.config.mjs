import { defineConfig } from "astro/config";
import { createStyleImportPlugin, AntdResolve } from "vite-plugin-style-import";
import react from "@astrojs/react";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), vue()],
  vite: {
    plugins: [createStyleImportPlugin({
      resolves: [AntdResolve()]
    })]
  }
});