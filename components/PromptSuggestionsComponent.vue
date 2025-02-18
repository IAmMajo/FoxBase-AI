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
