<script setup lang="ts">
defineProps<{ text: string }>();
</script>

<template>
  <div class="response-header flex jc-ai-center">
    <h3 class="dark-heading no-spacing">Basierend auf Ihrer Anfrage...</h3>
  </div>
  <div class="response-container flex jc-ai-center">
    <div class="response-box flex jc-ai-center dark-bottomtext">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="dark-bottomtext" v-html="text" />
    </div>
  </div>
  <div class="response-header flex jc-ai-center">
    <h3 class="dark-heading no-spacing">
      ... empfehlen wir Ihnen folgende Produkte:
    </h3>
  </div>
</template>

<style>
.response-box {
  background-color: #00dc8011;
  border: 2px solid var(--dark-primary);
  padding: var(--gap);
  width: 65vw;
  min-height: 12vh;
  border-radius: var(--border-radius-default);
}

.response-container {
  height: 26vh;
  background-color: var(--dark-bg-primary);
}

.response-header {
  background-color: var(--dark-bg-primary);
}
</style>
