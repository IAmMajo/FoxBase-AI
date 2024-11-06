<script setup lang="ts">
const headingText = 'FoxSearch'
const spanHeadingText = 'AI'
</script>

<template>
  <nav class="flex jc-space-between-ai-center">
    <div class="flex jc-ai-center gap">
      <img
        class="fox-find-logo"
        src="./../assets/FoxFindLogo.svg"
        alt="fox logo"
      />
      <h3 class="no-spacing dark-subheading">
        {{ headingText
        }}<span class="dark-highlight">{{ spanHeadingText }}</span>
      </h3>
    </div>

    <div class="flex nav-switch gradient-green-dark">
      <div class="nav-thumb"></div>
    </div>
  </nav>
</template>

<style>
.fox-find-logo {
  height: calc(var(--fs-h3) + 1rem); /*Größe abhängig von der h3 font-size*/
  width: calc(var(--fs-h3) + 1rem);
  object-fit: cover;
  border-radius: 0px; /*Ausnahme für das Logo*/
}

nav {
  background-color: var(--dark-bg-primary);
  height: var(--navbar-height);
  width: 98%;
  padding: 0 1%;
}

.gradient-green-dark {
  background: rgb(0, 176, 104);
  background: linear-gradient(
    -105deg,
    rgba(0, 176, 104, 1) 0%,
    rgba(0, 220, 128, 1) 100%
  );
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
  height: calc(var(--fs-h3) - 0.5rem);
  width: calc(var(--fs-h3) + 0.5rem);
}
.nav-thumb {
  background: var(--dark-primary);
  border-radius: var(--border-radius-full);

  /* thumb size: 1.5rem * 1.5rem */
  height: calc(var(--fs-h3) - 1rem);
  width: calc(var(--fs-h3) - 1rem);
}
</style>
