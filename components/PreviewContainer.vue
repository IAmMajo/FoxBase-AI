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
  primary: string;
  background: string;
  text: string;
  textSecondary: string;
  buttonState: boolean | undefined;
  topText: string;
  topHighlight: string;
  bottomHighlight: string;
  bottomText: string;
}>();
</script>

<template>
  <div class="preview-container-redesign relative">
    <PreviewNavbar
      :nav-state="buttonState"
      :background-color="background"
      :text-color="textSecondary"
      :primary-color="primary"
    />
    <PreviewContent
      :background-color="background"
      :text-color="text"
      :primary-color="primary"
      :hero-top-content="topText"
      :hero-bottom-content="bottomText"
      :hero-top-highlight-content="topHighlight"
      :hero-bottom-highlight-content="bottomHighlight"
    />
    <PreviewResponse
      :background-color="background"
      :text-color="text"
      :primary-color="primary"
    />
    <PreviewResult
      :text-color="text"
      :primary-color="primary"
      :text-secondary-color="textSecondary"
      :background-color="background"
    />
    <PreviewResult
      :text-color="text"
      :primary-color="primary"
      :text-secondary-color="textSecondary"
      :background-color="background"
    />
    <PreviewResult
      :text-color="text"
      :primary-color="primary"
      :text-secondary-color="textSecondary"
      :background-color="background"
    />
  </div>
</template>

<style>
.preview-container-redesign {
  flex-grow: 1;
  border-radius: 8px;
}
</style>
