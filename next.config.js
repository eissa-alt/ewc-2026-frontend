// const nextBuildId = require('next-build-id');
// Sentry is disabled
// const { withSentryConfig } = require('@sentry/nextjs');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
   enabled: process.env.ANALYZE === 'true',
});

const nextConfig = withBundleAnalyzer({
   // generateBuildId: () => nextBuildId({ dir: __dirname, describe: true }),

   images: {
      // domains: ['127.0.0.1', 'api.deve-go.sa', 'deve-go-storage.oss-me-central-1.aliyuncs.com'],
   },

   async headers() {
      return [
         {
            source: '/(.*)', // Apply to all routes
            headers: [
               {
                  key: 'X-Frame-Options',
                  value: 'DENY', // Prevent embedding in iframe
               },
               {
                  key: 'Content-Security-Policy',
                  value: "frame-ancestors 'none';", // Disallow iframe embedding via CSP
               },
               {
                  key: 'X-Content-Type-Options',
                  value: 'nosniff', // Prevent MIME type sniffing
               },
            ],
         },
      ];
   },

   webpack(config) {
      config.module.rules.push({
         test: /\.svg$/,
         use: [
            {
               loader: '@svgr/webpack',
               options: {
                  svgo: false,
               },
            },
         ],
      });
      return config;
   },
});

// Sentry is disabled - exporting nextConfig directly
module.exports = nextConfig;
// module.exports = withSentryConfig(nextConfig, {
//    // For all available options, see:
//    // https://github.com/getsentry/sentry-webpack-plugin#options

//    // Suppresses source map uploading logs during build
//    silent: true,
//    org: process.env.SENTRY_ORG,
//    project: process.env.SENTRY_PROJECT,
   
//    // Hide source maps from browser devtools in production
//    // Source maps are still uploaded to Sentry for error tracking
//    hideSourceMaps: true,
// });