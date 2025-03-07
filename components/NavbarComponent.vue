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
  query: string;
}>();
defineEmits(["searchInput", "searchSubmit"]);

const headingText = "FoxSearch";
const spanHeadingText = "AI";
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
      <SearchbarSmallComponent
        :query="query"
        @search-input="(event) => $emit('searchInput', event)"
        @search-submit="$emit('searchSubmit')"
      />

      <LightDarkSwitchComponent />
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

.light-dark-switch {
  margin-right: var(--gap);
  background-color: var(--dark-bg-secondary);
  height: 4vh;
  width: 4vh;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--box-shadow);
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

html.light .nav-thumb {
  background: var(--light-primary);
  border-radius: var(--border-radius-full);

  /* thumb size: 1.5rem * 1.5rem */
  height: calc(var(--fs-h3) - 0.8rem);
  width: calc(var(--fs-h3) - 0.8rem);
}

/* MEDIA QUERIES */

/* Handies */
@media (max-width: 360px) {
  .logo-text {
    font-size: 0rem;
  }

  .fox-find-logo {
    height: 35px;
    width: 35px;
  }
}
@media (min-width: 361px) and (max-width: 600px) {
  .logo-text {
    font-size: 0rem;
  }

  .fox-find-logo {
    height: 40px;
    width: 40px;
  }
}

/* Small Desktops */
@media (min-width: 601px) and (max-width: 1000px) {
  .fox-find-logo {
    height: 45px;
    width: 45px;
  }
  .logo-text {
    font-size: 1.2rem;
  }
}
</style>
