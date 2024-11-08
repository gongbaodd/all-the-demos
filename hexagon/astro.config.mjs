// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import sentry from '@sentry/astro';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), sentry({
    dsn: "https://b3c23c3f710c94a7e1c5ad2d4f295ee4@o360857.ingest.us.sentry.io/4508262508658688",
    sourceMapsUploadOptions: {
      project: "javascript",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    },
  }),]
});