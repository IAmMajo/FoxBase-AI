<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    titleHighlight: {
      type: String,
      required: false,
      default: "",
    },
    image: {
      type: String,
      required: true,
    },
    bottomText: {
      type: String,
      required: false,
      default: "",
    },
  },
};
</script>

<template>
  <div class="text-media-container flex">
    <div class="half-width flex jc-ai-center p-2vw">
      <img class="full-size" :src="image" alt="Image" />
    </div>
    <div class="half-width flex jc-start-ai-center p-2vw">
      <div>
        <h2 class="dark-heading">
          {{ title }} <span class="dark-highlight">{{ titleHighlight }}</span>
        </h2>
        <p class="dark-bottomtext">{{ bottomText }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.text-media-container {
  height: 90vh;
  width: 100%;
  background-color: var(--dark-bg-primary);
}

.text-media-container img {
  height: 80%;
  width: 80%;
}
</style>
