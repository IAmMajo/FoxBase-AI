<script setup lang="ts">
import { SunIcon } from "@heroicons/vue/24/outline";

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

    <!--Light / Dark Button-->
    <div class="light-dark-switch flex jc-ai-center z-2"> 
      <div class="nav-icon-container flex jc-ai-center">
        <SunIcon/>
      </div>  
    </div>

  </nav>
</template>

<style>
.logo-text {
  font-size: 1.8rem;
}
.fox-find-logo {
  height: calc(1.8rem + 1rem); /*Größe abhängig von der h3 font-size*/
  width: calc(1.8rem + 1rem);
  object-fit: cover;
  border-radius: 0px; /*Ausnahme für das Logo*/
}

.fox-find-logo{
  margin-left: var(--gap);
}

nav {
  background-color: var(--dark-bg-secondary);
  height: var(--navbar-height);
  width: 100%;
}

.nav-icon-container{
  height: 90%;
  width: 90%;
  color: var(--dark-primary);
  transform: rotate(0deg);
  transition: 1.4s ease transform;
}

.light-dark-switch{
  margin-right: var(--gap);
  background-color: var(--dark-bg-secondary);
  height: 4vh;
  width: 4vh;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--box-shadow);
}

.light-dark-switch:hover .nav-icon-container{
  cursor: pointer;
  transform: rotate(160deg);
}


/*

.gradient-green-dark {
  background: rgb(0, 176, 104);
  background: linear-gradient(
    -105deg,
    rgba(0, 176, 104, 1) 0%,
    rgba(0, 220, 128, 1) 100%
  );
}

*/

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
.nav-thumb {
  background: var(--dark-primary);
  border-radius: var(--border-radius-full);

  /* thumb size: 1.5rem * 1.5rem */
  height: calc(var(--fs-h3) - 0.8rem);
  width: calc(var(--fs-h3) - 0.8rem);
}
</style>
