// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  nitro: {
    preset: "cloudflare-pages"
  },

  modules: ["nitro-cloudflare-dev", "@nuxt/eslint"],
  devServer: { host: "" },

  app: {
    head: {
      htmlAttrs: { lang: "de" },
      title: "Foxbase AI",
    }
  },

  css: ["~/assets/main.css"],
});
