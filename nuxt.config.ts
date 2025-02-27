/*
 * Copyright 2025 Alina Marie Hartmann, Max Josef Overlack, Nils Paaßen,
 * Nico Puelacher, Hanna Steffen, Lena Weuste
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
      htmlAttrs: { lang: "de", class: "dark" },
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
