<!---
Copyright 2025 Alina Marie Hartmann, Max Josef Overlack, Nils Paaßen,
Nico Puelacher, Hanna Steffen, Lena Weuste

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

<script lang="ts" setup>
import type { NuxtError } from "#app";

const errorMessage = ref("");
const password = ref("");
const newPassword = ref("");
const rNewPassword = ref("");
async function handlePasswordChange() {
  // Basic validation
  if (!password.value || !newPassword.value || !rNewPassword.value) {
    errorMessage.value = "Please fill out all fields.";
    return;
  }

  if (newPassword.value !== rNewPassword.value) {
    errorMessage.value =
      "You need to enter the same new password in both fields";
    return;
  }

  const result = await fetch(`/api/users/change-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password.value,
      newPassword: newPassword.value,
    }),
  });

  if (!result.ok) {
    const body = (await result.json()) as NuxtError;
    errorMessage.value = body.message;
    return;
  } else {
    errorMessage.value = "Password changed successfully";
  }
}
</script>

<template>
  <div class="login-container">
    <h2>Change Password</h2>
    <form @submit.prevent="handlePasswordChange">
      <div class="form-group">
        <label for="password">Old Password:</label>
        <Password
          id="password"
          v-model="password"
          :feedback="false"
          placeholder="Enter your password"
          toggle-mask
        />
      </div>
      <div class="form-group">
        <label for="newPassword">New Password:</label>
        <Password
          id="newPassword"
          v-model="newPassword"
          :feedback="true"
          placeholder="Enter your new password"
          toggle-mask
        />
        <label for="rNewPassword">Repeat new Password:</label>
        <Password
          id="rNewPassword"
          v-model="rNewPassword"
          :feedback="true"
          placeholder="Enter your new password"
          toggle-mask
        />
      </div>
      <Button
        label="Change Password"
        type="submit"
        class="p-button-lg p-button-primary"
      />
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style />
