<script lang="ts" setup>
import type { NuxtError } from "#app";

definePageMeta({
  layout: "custom",
});

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
  <div class="full-size flex jc-ai-center">

    <div class="login-container box-shadow flex flex-column jc-ai-center p-5 br-default">
      <h2>Login</h2>
      <form class="flex flex-column jc-ai-center gap" @submit.prevent="handleLogin">
        <div class="form-group flex flex-column jc-ai-center">
          <label for="username"><b>Username</b></label>
          <InputText
            id="username"
            v-model="username"
            placeholder="Enter your username"
            class="p-inputtext-lg"
          />
        </div>
        <div class="form-group flex flex-column jc-ai-center">
          <label for="password"><b>Password</b></label>
          <Password
            id="password"
            v-model="password"
            :feedback="false"
            placeholder="Enter your password"
            toggle-mask
          />
        </div>
        <Button
          label="Login"
          icon="pi pi-sign-in"
          type="submit"
          class="p-button-lg p-button-primary"
        />
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style>


</style>
