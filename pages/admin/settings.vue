<template>
  <Card>
    <template #title>Passwort ändern</template>
    <template #content>
      <p class="m-0">Wähle ein Passwort.</p>
      <div class="card flex justify-center">
        <Password v-model="value" />
      </div>
    </template>
  </Card>
</template>

<script setup>
import { ref } from "vue";

const value = ref(null);
</script>
