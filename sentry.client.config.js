// // // This file configures the initialization of Sentry on the browser.
// // // The config you add here will be used whenever a page is visited.
// // // https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: "https://3054912eb4be4f0ea7f0440de6583a68@o4504423755808768.ingest.sentry.io/4504423760658432",
  tracesSampleRate: 1.0,
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
})