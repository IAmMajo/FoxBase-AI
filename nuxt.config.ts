// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  nitro: {
    preset: "cloudflare-pages",
  },

  modules: ["nitro-cloudflare-dev", "@nuxt/eslint", '@primevue/nuxt-module'],
  devServer: { host: "" },

  primevue: {
    options: {
      ripple: true
    }
  },

  app: {
    head: {
      htmlAttrs: { lang: "de" },
      title: "Foxbase AI",
    },
  },

  css: [
    '~/node_modules/primevue/resources/themes/foxbase_dark/theme.css',
    '~/node_modules/primeicons/primeicons.css',
    '~/node_modules/primeflex/primeflex.css',
    "~/assets/main.css"
  ],
});
