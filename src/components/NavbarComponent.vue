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

    <div class="flex nav-switch">
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

.nav-switch {
  align-items: center;
  justify-content: end;

  background: var(--dark-primary);
  background: linear-gradient(
    65,
    rgba(254, 254, 254, 0) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  border-radius: var(--border-radius-full);
  padding: 0 0.2rem;
  height: var(--fs-h3);
  width: calc(var(--fs-h3) + 2rem);
}
.nav-thumb {
  background: #0a8652; /*var(--dark-primary);*/
  border-radius: var(--border-radius-full);
  height: calc(var(--fs-h3) - 0.5rem);
  width: calc(var(--fs-h3) - 0.5rem);
}
</style>
