<script setup lang="ts">
defineProps<{ text: string }>();
</script>

<template>
  <div class="response-container flex jc-ai-center relative">
    <div class="darkening-layer-secondary full-size-percent absolute z-0"></div>
    <div class="response-box flex jc-ai-center dark-subheading relative">
      <div class="shade-layer absolute full-size-percent"></div>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="dark-subheading color-response-card z-2" v-html="text" />
    </div>
  </div>
</template>

<style>
.response-box {
  border: 2px solid var(--dark-primary);
  padding: var(--gap);
  width: 65vw;
  min-height: 12vh;
  border-radius: var(--border-radius-default);
}

html.light .response-box {
  border: 2px solid var(--light-primary);
  padding: var(--gap);
  width: 65vw;
  min-height: 12vh;
  border-radius: var(--border-radius-default);
}

.shade-layer {
  background-color: var(--dark-primary);
  opacity: 5%;
}

html.light .shade-layer {
  background-color: var(--light-primary);
  opacity: 5%;
}

.response-container {
  height: auto;
  min-height: 12vh;
  padding: 5vh;
  background-color: var(--dark-bg-secondary);
}

html.light .response-container {
  height: auto;
  min-height: 12vh;
  padding: 5vh;
  background-color: var(--light-bg-secondary);
}

.response-header {
  background-color: var(--dark-bg-secondary);
}

html.light .response-header {
  background-color: var(--light-bg-secondary);
}

.color-response-card {
  color: var(--dark-text-secondary);
}

html.light .color-response-card {
  color: var(--light-text-secondary);
}
</style>
