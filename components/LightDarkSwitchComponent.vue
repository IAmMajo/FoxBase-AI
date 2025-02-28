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
import { MoonIcon, SunIcon } from "@heroicons/vue/24/outline";

// Zustand für den Dark Mode
const isDarkMode = ref(true);

onMounted(() => {
  const toggleBtn = document.getElementById("toggle-button");
  const root = document.documentElement; // Das <html>-Tag

  // Initiale Überprüfung des Dark Modes
  isDarkMode.value = root.classList.contains("dark");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      // Prüfen, ob der Dark Mode aktiv ist
      // const isDarkMode = root.classList.contains("dark");

      if (isDarkMode.value) {
        root.classList.remove("dark");
        root.classList.add("light");
      } else {
        root.classList.remove("light");
        root.classList.add("dark");
      }
      // Update des Zustands für das Icon
      isDarkMode.value = !isDarkMode.value;
    });
  } else {
    console.error("Button not found!");
  }
});
</script>

<template>
  <!-- Light/DarkMode Button-->
  <div id="toggle-button" class="light-dark-switch flex jc-ai-center z-2">
    <div class="nav-icon-container flex jc-ai-center">
      <MoonIcon v-if="isDarkMode" />
      <SunIcon v-else />
    </div>
  </div>
</template>

<style>
.light-dark-switch {
  margin-right: var(--gap);
  background-color: var(--dark-bg-secondary);
  height: 4vh;
  width: 4vh;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--box-shadow);
  transition-duration: 0.8s;
}

.nav-icon-container {
  height: 90%;
  width: 90%;
  color: var(--dark-primary);
  transform: rotate(0deg);
  transition: 1.4s ease transform;
}

.light-dark-switch:hover .nav-icon-container {
  cursor: pointer;
  transform: rotate(260deg);
}

html.light .nav-icon-container {
  height: 90%;
  width: 90%;
  color: var(--light-primary);
  transform: rotate(0deg);
  transition: 1.4s ease transform;
}

html.light .light-dark-switch {
  margin-right: var(--gap);
  background-color: var(--light-bg-secondary);
  height: 4vh;
  width: 4vh;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--box-shadow);
}
</style>
