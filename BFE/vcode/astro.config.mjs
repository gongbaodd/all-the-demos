import { defineConfig } from "astro/config";
import { createStyleImportPlugin, AntdResolve } from "vite-plugin-style-import";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [
      createStyleImportPlugin({
        resolves: [AntdResolve()],
      }),
    ],
  },
});
