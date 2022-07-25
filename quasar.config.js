/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */


const { configure } = require('quasar/wrappers');
const envParser = require('./envParser');

module.exports = configure(function (ctx) {
  return {
    eslint: {
      // fix: true,
      // include = [],
      // exclude = [],
      // rawOptions = {},
      warnings: true,
      errors: true
    },
    // https://quasar.dev/quasar-cli/supporting-ts
    // supportTS: {
    //   tsCheckerConfig: {
    //     eslint: true
    //   }
    // },
    // supporTS: true,

    // https://quasar.dev/quasar-cli/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/boot-files
    boot: [
      'axios',
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: [
      'app.scss'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      target: {
        browser: [ 'es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1' ],
        node: 'node16'
      },
      vueRouterMode: 'history', // available values: 'hash', 'history'
      // distDir: ctx.mode.spa ? 'public/dist' : null,
      distDir: ctx.mode.spa ? 'public' : null, // VERCEL
      // transpile: false,

      // Add dependencies for transpiling with Babel (Array of string/regex)
      // (from node_modules, which are by default not transpiled).
      // Applies only if "transpile" is set to true.
      // transpileDependencies: [],

      // rtl: false, // https://quasar.dev/options/rtl-support
      // preloadChunks: true,
      // showProgress: false,
      // gzip: true,
      // analyze: true,
      env: envParser(),

      // Options below are automatically set depending on the env, set them if you want to override
      // extractCSS: false,

    },

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    // devServer: {
    //   // https: false,
    //   port: 8081,
    //   open: true // opens browser window automatically
    // },

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      // iconSet: 'material-icons', // Quasar icon set
      // lang: 'en-us', // Quasar language pack
      config: {},

      // Possible values for "importStrategy":
      // * 'auto' - (DEFAULT) Auto-import needed Quasar components & directives
      // * 'all'  - Manually specify what to import
      // importStrategy: 'auto',

      // Quasar plugins
      plugins: []
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: [],

    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false,
      prodPort: 3000, // The default port that the production server should use
      middlewares: [
        'render' // keep this as last one
      ]
    },

    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxMode: 'generateSW', // or 'injectManifest'
      injectPwaMetaTags: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false,
      // workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      // workboxOptions: {}, // only for GenerateSW
      // manifest: {
      //   name: 'SRFramework API',
      //   short_name: 'SRFramework API',
      //   description: 'SR Framework API Updater',
      //   display: 'standalone',
      //   orientation: 'portrait',
      //   background_color: '#ffffff',
      //   theme_color: '#027be3',
      //   icons: [
      //     {
      //       src: 'icons/icon-128x128.png',
      //       sizes: '128x128',
      //       type: 'image/png'
      //     },
      //     {
      //       src: 'icons/icon-192x192.png',
      //       sizes: '192x192',
      //       type: 'image/png'
      //     },
      //     {
      //       src: 'icons/icon-256x256.png',
      //       sizes: '256x256',
      //       type: 'image/png'
      //     },
      //     {
      //       src: 'icons/icon-384x384.png',
      //       sizes: '384x384',
      //       type: 'image/png'
      //     },
      //     {
      //       src: 'icons/icon-512x512.png',
      //       sizes: '512x512',
      //       type: 'image/png'
      //     }
      //   ]
      // }
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'packager', // 'packager' or 'builder'
      inspectPort: 5858,

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'srframework-api'
      },

      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: true,
    },

    bex: {
      contentScripts: [
        'my-content-script'
      ],

      // extendBexScriptsConf (esbuildConf) {}
      // extendBexManifestJson (json) {}
    }
  }
});
