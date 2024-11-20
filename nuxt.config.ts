// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  nitro: {
    preset: "cloudflare-pages",
    experimental: { database: true },
    database: {
      default: {
        connector: "cloudflare-d1",
        options: { bindingName: "DB" },
      },
    },
  },

  modules: ["nitro-cloudflare-dev", "@nuxt/eslint"],
  devServer: { host: "" },

  app: {
    head: {
      htmlAttrs: { lang: "de" },
      title: "Foxbase AI",
    },
  },

  css: ["~/assets/main.css"],
});
