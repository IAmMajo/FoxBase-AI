<script>
export default {
  props: {
    textColor: {
      type: string,
      required: false,
    },
    aiColor: {
      type: string,
      required: false,
    },
  },
};
</script>

<template>
  <nav class="relative flex t-0">
    <div
      class="darkening-layer-secondary absolute full-size-percent flex jc-space-between-ai-center"
    >
      <div>
        <div style="padding-left: 2vh" class="flex">
          <!-- Verwende die Props direkt im Template  -->
          <h5 :style="{ color: textColor || 'black' }">FoxSearch</h5>
          <h5 :style="{ color: aiColor || 'black' }">AI</h5>
        </div>
      </div>
      <div style="padding-right: 2vh">
        <PreviewLightSwitch :ButtonBgColor="aiColor" />
      </div>
    </div>
  </nav>
</template>

<style>
.preview-container-redesign nav {
  width: 100%;
  height: 8vh;
}
</style>
