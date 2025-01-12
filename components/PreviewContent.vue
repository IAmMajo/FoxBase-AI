<script setup lang="ts">
defineProps<{
  primaryColor: string;
  textColor: string;
  backgroundColor: string;
  heroTopContent: string;
  heroBottomContent: string;
  heroTopHighlightContent: string;
  heroBottomHighlightContent: string;
}>();
</script>

<template>
  <div
    :style="{ backgroundColor: backgroundColor }"
    class="redesign-nav-preview-content-container flex flex-column jc-ai-center"
  >
    <h1 class="mb-0" :style="{ color: textColor }">
      {{ heroTopContent }} <span :style="{ color: primaryColor }">{{ heroTopHighlightContent }}</span>
    </h1>
    <h2 class="mt-0" :style="{ color: textColor }">
      {{ heroBottomContent }} <span :style="{ color: primaryColor }">{{ heroBottomHighlightContent }}</span>
    </h2>

    <PreviewSearchbar class="mb-5" />
  </div>
</template>

<style>
.redesign-nav-preview-content-container {
  background-color: var(--dark-bg-secondary);
  flex-grow: 1;
  padding: 150px 0;
  text-align: center;
}
.redesign-nav-preview-content-container p {
  width: 80%;
}
</style>
