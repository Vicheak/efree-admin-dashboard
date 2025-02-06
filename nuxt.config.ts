import { defineNuxtConfig } from "nuxt/config";
// import { NuxtVuefireModule } from 'nuxt-vuefire';
export default defineNuxtConfig({
  builder: "vite",
  css: ["@/assets/scss/app.scss"],
  ssr: false,
  // target: 'static', 
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  generate: {},

  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, maximum-scale=1",
        },
        { hid: "description", name: "description", content: "" },
        {
          name: "apple-mobile-web-app-capable",
          content: "yes",
        },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black",
        },
      ],
      link: [
        {
          href: "https://fonts.googleapis.com/css?family=Rubik:400,400i,500,500i,700,700i&amp;display=swap",
          rel: "stylesheet",
        },
        {
          href: "https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i,900&amp;display=swap",
          rel: "stylesheet",
        },
        {
          href: "https://fonts.googleapis.com/css?family=Kantumruy+Pro:300,300i,400,400i,500,500i,700,700i,900&amp;display=swap",
          rel: "stylesheet",
        },
        {
          href: "https://unpkg.com/vue-multiselect@2.1.6/dist/vue-multiselect.min.css",
          rel: "stylesheet",
        },
        { rel: "icon", type: "image/png", href: "/images/e-free-logo.png" },
      ],
    },
  },

  modules: [
    "nuxt-icon",
    "nuxt-pdfmake",
    "@nuxtjs/i18n",
    '@nuxt/image-edge',
    // "nuxt-vuefire",
    // NuxtVuefireModule,
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
  ],
  image:{
    provider: 'ipx',  // Default provider for local image serving
    dir: 'public',  // Local images should be placed in the public folder
    screens: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      'xxl': 1536,
      '2xl': 1536
    },
  },
  i18n: {
    locales: [
      {
        icon: "flag-icon-us",
        code: "en",
        name: "English",
        short: "(US)",
      },
      {
        icon: "flag-icon-kh",
        code: "kh",
        name: "ខ្មែរ",
        short: "(KH)",
      },
    ],
    strategy: "prefix_except_default",
    defaultLocale: "en",
    vueI18n: "./i18n.config.ts",
  },

  vue:{
    compilerOptions:{
      isCustomElement: (tag) => ['lablel'].includes(tag),
    }
  },

  plugins: [
    { src: "~/plugins/plugins.js", mode: "client" },
    { src: "~/plugins/iCan.js", mode: "all" },
    { src: "./plugins/useBootstrap.client.ts", mode: "client" },
    { src: "./plugins/firebase-client.js", mode: "client" },
    { src: "~/plugins/wangEditor.client.js", mode: "client" },
  ],

  runtimeConfig: {
    public: {
      cookie_key: process.env.COOKIE_KEY,
      prod: process.env.PROD
    },
    serviceWorker: true,
  },

  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },

  vite: {
      build: {
          chunkSizeWarningLimit: 10000
      }
  },
  experimental: {
    payloadExtraction: false,
  },

  compatibilityDate: "2024-10-04"
});