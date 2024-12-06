<script setup lang="ts">
defineEmits(["searchSubmit"]);

const headline = "Finden Sie die";
const headlineSpan = " richtige Lösung";

const subheadline = "Für Ihr";
const subheadlineSpan = " Fallbeispiel";


</script>

<template>
  <div class="relative">
    <div class="darkening-layer" />

    <div class="absolute z-negative-2 t-0 l-0 full-size">
      <div class="waves" />
    </div>

    <div data-aos="fade-up" class="flex flex-column gap hero-size debugging-red jc-ai-center">
      <p class="dark-heading text-shadow header-title no-spacing">
        {{ headline }}<span class="dark-highlight">{{ headlineSpan }}</span>
      </p>
      <h1 class="dark-heading text-shadow no-spacing">
        {{ subheadline
        }}<span class="dark-highlight">{{ subheadlineSpan }}</span>
      </h1>

      <SearchbarComponent
        @search-submit="(query) => $emit('searchSubmit', query)"
      />
    </div>
  </div>
</template>

<style>

.hero-size span{
  font-family: "Inter", sans-serif;
}
.darkening-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: #00000038;
}

.bg {
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: -1;
}
.hero-size {
  height: var(--hero-height);
  width: 100%;
}

.waves {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 400px;
  background: var(--dark-primary);
  box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.5);
  transition: 50ms;
}

.waves::before,
.waves::after {
  content: "";
  position: absolute;
  width: 300vw;
  height: 300vw;
  top: -65vw;
  left: 50%;
  border-radius: 44%;
  transform: translate(-50%, -75%);
}

.waves::before {
  background: var(--dark-bg-primary);
  animation: waves 45s linear infinite;
}
.waves::after {
  background: #02102564;
  animation: waves 75s linear infinite;
}

@keyframes waves {
  0% {
    transform: translate(-50%, -75%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -75%) rotate(360deg);
  }
}
</style>
