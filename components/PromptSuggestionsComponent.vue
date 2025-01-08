<script setup lang="ts">
const { prompts } = defineProps<{
  prompts: string[];
}>();
defineEmits(["promptClick"]);
</script>

<template>
  <div v-if="prompts.length" class="prompt-suggestions flex gap">
    <input
      v-for="(prompt, index) in prompts"
      :key="index"
      class="dark-subheading bg-secondary"
      type="button"
      :value="prompt"
      @click="$emit('promptClick', $event)"
    />
  </div>
</template>

<style scoped>
.prompt-suggestions {
  overflow: auto;
}
input {
  padding: 8px 16px;
  font-size: 16px;
  border-radius: var(--border-radius-full);
  white-space: nowrap;
  font-family: "asap", sans-serif;
  border-style: none;
}
</style>
