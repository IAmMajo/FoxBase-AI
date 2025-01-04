<script setup>
import { SunIcon } from "@heroicons/vue/24/outline";



const headingText = "FoxSearch";
const spanHeadingText = "AI";

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
  <nav class="flex jc-space-between-ai-center relative z-1">
    <div class="darkening-layer-secondary absolute full-size-percent"></div>
    <div class="flex jc-ai-center gap z-2">
      <img
        class="fox-find-logo"
        src="./../assets/FoxFindLogo.svg"
        alt="fox logo"
      />
      <h3 class="no-spacing dark-subheading logo-text">
        {{ headingText
        }}<span class="dark-highlight">{{ spanHeadingText }}</span>
      </h3>
    </div>

    <div class="flex jc-ai-center gap z-2">
      <!--
        <SearchbarSmallComponent />
      -->

      <!--Light / Dark Button-->
      <div id="toggle-button" class="light-dark-switch flex jc-ai-center z-2">
        <div class="nav-icon-container flex jc-ai-center">
          <SunIcon />
        </div>
      </div>
    </div>
  </nav>
</template>

<style>
/** Non-Color Classes **/
.logo-text {
  font-size: 1.8rem;
}

.fox-find-logo {
  height: calc(1.8rem + 1rem); /*Größe abhängig von der h3 font-size*/
  width: calc(1.8rem + 1rem);
  object-fit: cover;
  border-radius: 0px; /*Ausnahme für das Logo*/
}
.fox-find-logo {
  margin-left: var(--gap);
}

.searchbar {
  height: 2rem;
  width: 30rem;
  border-radius: var(--border-radius-full);
}

.nav-switch {
  align-items: center;
  justify-content: end;

  border-radius: var(--border-radius-full);
  padding: 0 0.3rem;
  height: calc(var(--fs-h3) - 0.8rem);
  width: calc(var(--fs-h3) + 0.9rem);
}

/** Color Classes **/

nav {
  background-color: var(--dark-bg-secondary);
  height: var(--navbar-height);
  width: 100%;
}

.nav-icon-container {
  height: 90%;
  width: 90%;
  color: var(--dark-primary);
  transform: rotate(0deg);
  transition: 1.4s ease transform;
}

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

.nav-thumb {
  background: var(--dark-primary);
  border-radius: var(--border-radius-full);

  /* thumb size: 1.5rem * 1.5rem */
  height: calc(var(--fs-h3) - 0.8rem);
  width: calc(var(--fs-h3) - 0.8rem);
}

/*******************************/
/* Light Mode */
/*******************************/

html.light nav {
  background-color: var(--light-bg-secondary);
  height: var(--navbar-height);
  width: 100%;
}

html.light .light-dark-switch {
  margin-right: var(--gap);
  background-color: var(--light-bg-secondary);
  height: 4vh;
  width: 4vh;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--box-shadow);
}

html.light .nav-icon-container {
  height: 90%;
  width: 90%;
  color: var(--light-primary);
  transform: rotate(0deg);
  transition: 1.4s ease transform;
}

html.light .nav-thumb {
  background: var(--light-primary);
  border-radius: var(--border-radius-full);

  /* thumb size: 1.5rem * 1.5rem */
  height: calc(var(--fs-h3) - 0.8rem);
  width: calc(var(--fs-h3) - 0.8rem);
}
</style>
