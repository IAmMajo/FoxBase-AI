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
  textColor: string;
  primaryColor: string;
  backgroundColor: string;
}>();
</script>

<template>
  <div
    :style="{ backgroundColor: backgroundColor }"
    class="flex jc-ai-center py-5 relative"
  >
    <div class="darkening-layer-secondary full-size absolute"></div>
    <div
      :style="{ border: '3px solid ' + primaryColor }"
      class="preview-response relative flex jc-ai-center relative"
    >
      <div :style="{ color: textColor }" class="flex jc-ai-center z-2 text-xl">
        This is a Response!
      </div>
      <div
        :style="{ backgroundColor: primaryColor }"
        class="color-layer-response absolute full-size"
      ></div>
    </div>
  </div>
</template>

<style>
.color-layer-response {
  opacity: 10%;
}

.preview-response {
  border-radius: 8px;
  width: 700px;
  height: 120px;
  border: 3px solid red;
}
</style>
