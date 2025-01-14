<script setup lang="ts">
defineProps<{
  primary: string;
  background: string;
  text: string;
  textSecondary: string;
  buttonState: boolean | undefined;
  topText: string;
  topHighlight: string;
  bottomHighlight: string;
  bottomText: string;
}>();
</script>

<template>
  <div class="preview-container-redesign relative">
    <PreviewNavbar
      :nav-state="buttonState"
      :background-color="background"
      :text-color="textSecondary"
      :primary-color="primary"
    />
    <PreviewContent
      :background-color="background"
      :text-color="text"
      :primary-color="primary"
      :hero-top-content="topText"
      :hero-bottom-content="bottomText"
      :hero-top-highlight-content="topHighlight"
      :hero-bottom-highlight-content="bottomHighlight"
    />
    <PreviewResponse
      :background-color="background"
      :text-color="text"
      :primary-color="primary"
    />
    <PreviewResult
      :text-color="text"
      :primary-color="primary"
      :text-secondary-color="textSecondary"
      :background-color="background"
    />
    <PreviewResult
      :text-color="text"
      :primary-color="primary"
      :text-secondary-color="textSecondary"
      :background-color="background"
    />
    <PreviewResult
      :text-color="text"
      :primary-color="primary"
      :text-secondary-color="textSecondary"
      :background-color="background"
    />
  </div>
</template>

<style>
.preview-container-redesign {
  flex-grow: 1;
  border-radius: 8px;
}
</style>
