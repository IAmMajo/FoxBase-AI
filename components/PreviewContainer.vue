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
