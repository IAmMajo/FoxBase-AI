<script setup lang="ts">
import Searchbar from './Searchbar.vue'
const headline = 'Finden Sie die'
const headlineSpan = ' richtige Lösung'

const subheadline = 'Für Ihr'
const subheadlineSpan = ' Fallbeispiel'
</script>

<template>
  <div class="relative">
    <div class="darkening-layer"></div>
    <iframe
      class="spline-iframe"
      src="https://my.spline.design/foxbasestripe-f90a5e89be7191d7e6c082d643111766/"
      frameborder="0"
      allowfullscreen
    ></iframe>
    <div class="flex flex-column gap hero-size debugging-red jc-ai-center">
      <p class="dark-heading text-shadow header-title no-spacing">
        {{ headline }}<span class="dark-highlight">{{ headlineSpan }}</span>
      </p>
      <h1 class="dark-heading text-shadow no-spacing">
        {{ subheadline
        }}<span class="dark-highlight">{{ subheadlineSpan }}</span>
      </h1>

      <Searchbar />
    </div>
  </div>
</template>

<style>
.darkening-layer {
  position: absolute;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  z-index: -1;
  background-color: #00000038;
}

.spline-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  z-index: -2;
}

.relative {
  position: relative;
  overflow: hidden;
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
</style>
