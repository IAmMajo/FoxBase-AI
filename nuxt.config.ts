// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  nitro: {
    preset: "cloudflare-pages",
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

  runtimeConfig: {
    apiToken: "",
    collection: "553BCD50-71D5-11EF-B48C-9BF348DF607F",
  },
});
