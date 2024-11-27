import Aura from "@primevue/themes/aura";

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

  modules: [
    "nitro-cloudflare-dev",
    "@nuxt/eslint",
    "@primevue/nuxt-module",
    "nuxt-auth-utils",
  ],
  devServer: { host: "" },

  app: {
    head: {
      htmlAttrs: { lang: "de" },
      title: "Foxbase AI",
    },
  },

  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: ".my-app-dark",
        },
      },
    },
  },

  css: ["~/assets/main.css"],

  runtimeConfig: {
    session: {
      password: "09b9a55311684b00ac269c0b24fc15ff",
    },
  },
});
