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
defineProps<{
  primaryColor: string;
  navState: boolean | undefined;
}>();
</script>

<template>
  <div>
    <div v-if="navState">
      <button class="flex jc-ai-center">
        <div class="preview-icon-container relative flex jc-ai-center">
          <div
            class="darkening-layer-secondary absolute full-size-percent"
          ></div>
          <i :style="{ color: primaryColor || 'white' }" class="pi pi-sun"></i>
        </div>
      </button>
    </div>
  </div>
</template>

<style>
.preview-container-redesign nav button {
  height: 60%;
  border-radius: 6px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  background: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--box-shadow);
}

.preview-icon-container {
  height: 40px;
  width: 40px;
}

.preview-icon-container i {
  font-size: 22px;
  font-weight: 500;
}
</style>
