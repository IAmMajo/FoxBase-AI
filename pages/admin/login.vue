<script lang="ts" setup>
definePageMeta({
  layout: "custom",
});

const errorMessage = ref("");
const username = ref("");
const password = ref("");

async function handleLogin() {
  // Basic validation
  console.log(username.value + " " + password.value);
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
    errorMessage.value = (await result.json()).message;
  } else {
    reloadNuxtApp();
  }
}
</script>

<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Username:</label>
        <InputText
          id="username"
          v-model="username"
          placeholder="Enter your username"
          class="p-inputtext-lg"
        />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
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
</template>

<style />
