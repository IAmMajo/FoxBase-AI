<script setup lang="ts">
const { prompts } = defineProps<{
  prompts: string[];
}>();
</script>

<template>
  <div class="prompt-suggestions flex gap">
    <p
      v-for="(prompt, index) in prompts"
      :key="index"
      class="chip dark-subheading bg-secondary"
    >
      {{ prompt }}
    </p>
  </div>
</template>

<style scoped>
.prompt-suggestions {
  overflow: auto;
}
.chip {
  padding: 8px 16px;
  font-size: 16px;
  border-radius: var(--border-radius-full);
  white-space: nowrap;
}
p {
  margin: 0;
}
</style>
