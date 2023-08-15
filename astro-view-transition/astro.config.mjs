import { defineConfig } from "astro/config";

import lit from "@astrojs/lit";

// https://astro.build/config
export default defineConfig({
  experimental: {
    viewTransitions: true
  },
  integrations: [lit()]
});