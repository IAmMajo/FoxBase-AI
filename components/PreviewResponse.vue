<script setup lang="ts">
defineProps<{
  textColor: string;
  primaryColor: string;
  backgroundColor: string;
}>();

</script>

<template>
    <div :style="{backgroundColor: backgroundColor}" class="flex jc-ai-center py-5 relative">
        <div class="darkening-layer-secondary full-size absolute"></div>
        <div :style="{border: '3px solid ' + primaryColor}" class="preview-response relative flex jc-ai-center relative">
            <div :style="{color: textColor}" class="flex jc-ai-center z-2 text-xl">
                Das ist eine Response!
            </div>
            <div :style="{backgroundColor: primaryColor}" class="color-layer-response absolute full-size"></div>
        </div>
    </div>
</template>

<style>

    .color-layer-response{
        opacity: 10%;
    }

    .preview-response{
        border-radius: 8px;
        width: 700px;
        height: 120px;
        border: 3px solid red;
    }

</style>
