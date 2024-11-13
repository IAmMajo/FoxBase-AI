// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  ignores: ["worker-configuration.d.ts"],
}).removeRules("vue/html-self-closing");
