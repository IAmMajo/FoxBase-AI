<script lang="ts" setup>
import type { NuxtError } from "#app";

definePageMeta({
  layout: "custom",
});

const headingText = "FoxSearch";
const spanHeadingText = "AI";
const errorMessage = ref("");
const username = ref("");
const password = ref("");

const fetchUserSession = useUserSession().fetch;

async function handleLogin() {
  // Basic validation
  if (!username.value || !password.value) {
    errorMessage.value = "Please fill out all fields.";
    return;
  }
  const result = await fetch(`/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  });

  if (!result.ok) {
    const body = (await result.json()) as NuxtError;
    errorMessage.value = body.message;
    return;
  }
  await fetchUserSession();
  navigateTo("/admin");
}
</script>

<template>
  <div class="background full-size flex flex-column jc-ai-center">
    <div class="login-container flex flex-column jc-ai-center gap">
      <div class="flex jc-ai-center gap">
        <img
          class="fox-find-logo"
          src="./../../assets/FoxFindLogo.svg"
          alt="fox logo"
        />
        <h4 class="light-bottomtext">
          Bei
          <span class="no-spacing light-bottomtext">
            {{ headingText
            }}<span class="light-highlight">{{ spanHeadingText }}</span>
          </span>
          anmelden
        </h4>
      </div>

      <div class="error-div flex jc-ai-center">
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </div>

      <form
        class="flex flex-column jc-ai-center gap"
        @submit.prevent="handleLogin"
      >
        <FloatLabel variant="in">
          <InputText
            id="username"
            v-model="username"
            variant="filled"
            class="p-inputtext-lg"
          />
          <label for="username">Benutzername</label>
        </FloatLabel>
        <FloatLabel variant="in">
          <Password
            id="password"
            v-model="password"
            :feedback="false"
            variant="filled"
            toggle-mask
          />
          <label for="password">Passwort</label>
        </FloatLabel>

        <Button
          label="Anmelden"
          type="submit"
          class="button p-button-lg p-button-primary"
        />
      </form>

      <p class="forgot-pw light-highlight">Passwort vergessen?</p>
    </div>
  </div>
</template>

<style>
:root {
  --all-width: 615px;
  --p-message-error-simple-color: #dc2626;
}

div * {
  font-family: "asap", sans-serif;
}

.background {
  background-color: color-mix(in srgb, var(--light-primary), transparent 70%);
}

.login-container {
  padding: 25px;
  border-radius: var(--border-radius-default);
  background-color: white;
}

h4 {
  font-weight: 500;
}

.fox-find-logo {
  height: calc(var(--fs-h4) + 3.25rem);
  /*Größe abhängig von der h4 font-size*/
  width: calc(var(--fs-h4) + 4rem);
  object-fit: cover;
  border-radius: 0px;
}

.error {
  width: var(--all-width);
  padding: 10px;
  background-color: color-mix(
    in srgb,
    var(--p-inputtext-invalid-border-color),
    transparent 90%
  );
  color: var(--p-message-error-simple-color);
  border: 1px solid var(--p-inputtext-invalid-border-color);
  border-radius: 6px;
}

form * {
  width: var(--all-width);
}

label {
  font-size: var(--fs-paragraph);
}

.button {
  background-color: var(--light-primary-hover) !important;
}

.button:hover {
  background-color: color-mix(
    in srgb,
    var(--light-primary),
    transparent 60%
  ) !important;
  color: var(--light-primary-hover) !important;
  border-color: var(--light-primary-hover) !important;
}

.forgot-pw:hover {
  text-decoration: underline;
  cursor: pointer;
}

@media (max-width: 1930px) {
}

/* Kleine Desktops */
@media (max-width: 1279px) {
}

/* Tablets */
@media (max-width: 768px) {
  :root {
    --all-width: 80vw;
  }
}

/* Handys */
@media (max-width: 480px) {
  :root {
    --all-width: 95vw;
  }
}

/* kleine Handys */

@media (max-width: 400px) {
}
</style>
