// https://nuxt.com/docs/api/configuration/nuxt-config
import { MyPreset } from "./assets/mytheme";
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  nitro: {
    preset: "cloudflare-pages",
  }, 

  modules: ["nitro-cloudflare-dev", "@nuxt/eslint", "@primevue/nuxt-module"],
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
        preset: MyPreset,
        options: {
          darkModeSelector: '.my-app-dark'
        }
      }
    }
  },

  css: [
  "~/node_modules/primeicons/primeicons.css",
  "~/node_modules/primeflex/primeflex.css",
  ],
});
