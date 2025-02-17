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
  navState: boolean | undefined;
}>();
</script>

<template>
  <nav :style="{ backgroundColor: backgroundColor }" class="relative flex t-0">
    <div
      class="darkening-layer-secondary absolute full-size-percent flex jc-space-between-ai-center"
    >
      <div>
        <div style="padding-left: 2vh" class="flex jc-ai-center gap-sm">
          <img
            class="fox-find-logo-sm"
            src="./../assets/FoxFindLogo.svg"
            alt="FoxFind Logo"
          />
          <div class="flex jc-ai-center">
            <h5 :style="{ color: textColor }">FoxSearch</h5>
            <h5 :style="{ color: primaryColor }">AI</h5>
          </div>
        </div>
      </div>
      <div style="padding-right: 2vh">
        <PreviewLightSwitch
          :nav-state="navState"
          :primary-color="primaryColor"
        />
      </div>
    </div>
  </nav>
</template>

<style>
.fox-find-logo-sm {
  height: 50px;
  width: 50px;
}
.preview-container-redesign nav {
  width: 100%;
  height: 8vh;
}
</style>
