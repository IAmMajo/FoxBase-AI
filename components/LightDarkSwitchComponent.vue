<script setup lang="ts">
import { SunIcon } from "@heroicons/vue/24/outline";



    onMounted(() => {
    const toggleBtn = document.getElementById("toggle-button");
    const root = document.documentElement; // Das <html>-Tag

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
        // Prüfen, ob der Dark Mode aktiv ist
        const isDarkMode = root.classList.contains("dark");

        if (isDarkMode) {
            root.classList.remove("dark");
            root.classList.add("light");
        } else {
            root.classList.remove("light");
            root.classList.add("dark");
        }
        });
    } else {
        console.error("Button not found!");
    }
    });

</script>


<template>

    <!--Light / Dark Button-->
    <div id="toggle-button" class="light-dark-switch flex jc-ai-center z-2">
        <div class="nav-icon-container flex jc-ai-center">
            <SunIcon />
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
}

.light-dark-switch:hover .nav-icon-container {
  cursor: pointer;
  transform: rotate(160deg);
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