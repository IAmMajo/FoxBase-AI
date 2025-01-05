<script setup>
defineProps({
  primary: {
    type: string,
    required: false,
  },
  background: {
    type: string,
    required: false,
  },
  heading: {
    type: string,
    required: false,
  },
  text: {
    type: string,
    required: false,
  },
});
</script>

<template>
  <div class="preview-container-redesign relative">
    <PreviewNavbar :text-color="text" :ai-color="primary" />
    <PreviewContent />
    <PreviewResult />
  </div>
</template>

<style>
.preview-container-redesign {
  width: 75%;
  border-radius: 8px;
}
</style>
