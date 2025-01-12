<script setup lang="ts">
defineProps<{
  Primary: string;
  Background: string;
  Text: string;
  TextSecondary: string;
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
      :background-color="Background"
      :text-color="TextSecondary"
      :primary-color="Primary"
    />
    <PreviewContent
      :background-color="Background"
      :text-color="Text"
      :primary-color="Primary"
      :hero-top-content ="topText"
      :hero-bottom-content="bottomText"
      :hero-top-highlight-content="topHighlight"
      :hero-bottom-highlight-content="bottomHighlight"
    />
    <PreviewResponse
      :background-color="Background"
      :text-color="Text"
      :primary-color="Primary"
    />
    <PreviewResult
      :text-color="Text"
      :primary-color="Primary"
      :text-secondary-color="TextSecondary"
      :background-color="Background"
    />
    <PreviewResult
      :text-color="Text"
      :primary-color="Primary"
      :text-secondary-color="TextSecondary"
      :background-color="Background"
    />
    <PreviewResult
      :text-color="Text"
      :primary-color="Primary"
      :text-secondary-color="TextSecondary"
      :background-color="Background"
    />
  </div>
</template>

<style>
.preview-container-redesign {
  flex-grow: 1;
  border-radius: 8px;
}
</style>
