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
  textColor: string;
  backgroundColor: string;
  heroTopContent: string;
  heroBottomContent: string;
  heroTopHighlightContent: string;
  heroBottomHighlightContent: string;
}>();
</script>

<template>
  <div
    :style="{ backgroundColor: backgroundColor }"
    class="redesign-nav-preview-content-container flex flex-column jc-ai-center"
  >
    <h1 class="mb-0" :style="{ color: textColor }">
      {{ heroTopContent }}
      <span :style="{ color: primaryColor }">{{
        heroTopHighlightContent
      }}</span>
    </h1>
    <h2 class="mt-0" :style="{ color: textColor }">
      {{ heroBottomContent }}
      <span :style="{ color: primaryColor }">{{
        heroBottomHighlightContent
      }}</span>
    </h2>

    <PreviewSearchbar class="mb-5" />
  </div>
</template>

<style>
.redesign-nav-preview-content-container {
  background-color: var(--dark-bg-secondary);
  flex-grow: 1;
  padding: 150px 0;
  text-align: center;
}
.redesign-nav-preview-content-container p {
  width: 80%;
}
</style>
