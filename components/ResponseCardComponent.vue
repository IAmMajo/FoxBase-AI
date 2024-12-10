<script setup lang="ts">
defineProps<{ text: string }>();
</script>

<template>
  <div class="response-header flex jc-ai-center" />
  <div class="response-container flex jc-ai-center relative">
    <div class="darkening-layer-secondary full-size-percent absolute z-0"></div>
    <div class="response-box flex jc-ai-center dark-bottomtext relative">
      <div class="shade-layer absolute full-size-percent"></div>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="dark-bottomtext z-2" v-html="text" />
    </div>
  </div>
  <div class="response-header flex jc-ai-center" />
</template>

<style>
.response-box {
  border: 2px solid var(--dark-primary);
  padding: var(--gap);
  width: 65vw;
  min-height: 12vh;
  border-radius: var(--border-radius-default);
}

.shade-layer{
  background-color: var(--dark-primary);
  opacity: 5%;
}

.response-container {
  height: auto;
  min-height: 12vh;
  padding: 5vh;
  background-color: var(--dark-bg-secondary);
}

.response-header {
  background-color: var(--dark-bg-secondary);
}
</style>
