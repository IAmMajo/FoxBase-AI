<script setup lang="ts">
  defineProps<{
  Primary: string;
  Background: string;
  Text: string;
  TextSecondary: string;
  buttonState: boolean | undefined;
}>();

</script>

<template>
  <div class="preview-container-redesign relative">
    <PreviewNavbar :navState = buttonState :backgroundColor = "Background" :textColor = "TextSecondary" :primaryColor = "Primary"/>
    <PreviewContent :backgroundColor = "Background" :textColor = "Text" :primaryColor = "Primary"/>
    <PreviewResponse :backgroundColor = "Background" :textColor = "Text" :primaryColor ="Primary"/>
    <PreviewResult :textColor = "Text" :primaryColor="Primary" :textSecondaryColor="TextSecondary" :backgroundColor="Background"/>
    <PreviewResult :textColor = "Text" :primaryColor="Primary" :textSecondaryColor="TextSecondary" :backgroundColor="Background"/>
    <PreviewResult :textColor = "Text" :primaryColor="Primary" :textSecondaryColor="TextSecondary" :backgroundColor="Background"/>
  </div>
</template>

<style>
.preview-container-redesign {
  flex-grow: 1;
  border-radius: 8px;
}
</style>
