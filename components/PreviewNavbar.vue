<script setup lang="ts">
defineProps<{
  textColor: string;
  primaryColor: string;
  backgroundColor: string;
  navState: boolean | undefined;
}>();
</script>

<template>
  <nav :style="{ backgroundColor: backgroundColor }" class="relative flex t-0">
    <div
      class="darkening-layer-secondary absolute full-size-percent flex jc-space-between-ai-center"
    >
      <div>
        <div style="padding-left: 2vh" class="flex jc-ai-center gap-sm">
          <img
            class="fox-find-logo-sm"
            src="./../assets/FoxFindLogo.svg"
            alt="FoxFind Logo"
          />
          <div class="flex jc-ai-center">
            <h5 :style="{ color: textColor }">FoxSearch</h5>
            <h5 :style="{ color: primaryColor }">AI</h5>
          </div>
        </div>
      </div>
      <div style="padding-right: 2vh">
        <PreviewLightSwitch
          :nav-state="navState"
          :primary-color="primaryColor"
        />
      </div>
    </div>
  </nav>
</template>

<style>
.fox-find-logo-sm {
  height: 50px;
  width: 50px;
}
.preview-container-redesign nav {
  width: 100%;
  height: 8vh;
}
</style>
