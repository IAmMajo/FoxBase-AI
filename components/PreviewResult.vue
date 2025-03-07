<!---
Copyright 2025 Alina Marie Hartmann, Max Josef Overlack, Nils Paaßen,
Nico Puelacher, Hanna Steffen, Lena Weuste

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

<script setup lang="ts">
defineProps<{
  textColor: string;
  primaryColor: string;
  backgroundColor: string;
  textSecondaryColor: string;
}>();
</script>

<template>
  <div
    :style="{ backgroundColor: backgroundColor }"
    class="flex jc-ai-center py-5 relative"
  >
    <div class="darkening-layer-secondary full-size absolute"></div>
    <div class="preview-result flex jc-start-ai-center relative">
      <div class="flex gap">
        <img
          class="preview-mock-image"
          src="./../assets/graphics/mock.webp"
          alt="Mock Image"
        />
        <div>
          <div class="flex jc-start-ai-center gap">
            <h5 :style="{ color: textColor }" class="m-0 pt-2">
              Computer with Monitor
            </h5>
            <div
              :style="{ backgroundColor: primaryColor, color: textColor }"
              class="preview-label"
            >
              Best
            </div>
          </div>

          <div class="mt-2 flex gap jc-start-ai-center preview-secondary-size">
            <div
              :style="{ backgroundColor: primaryColor }"
              class="preview-dot"
            ></div>
            <div :style="{ color: textColor }">
              Type: <b :style="{ color: textSecondaryColor }">Computers</b>
            </div>
          </div>
          <div class="mt-1 flex gap jc-start-ai-center preview-secondary-size">
            <div
              :style="{ backgroundColor: primaryColor }"
              class="preview-dot"
            ></div>
            <div :style="{ color: textColor }">
              Processor:
              <b :style="{ color: textSecondaryColor }">AMD Ryzen 9</b> | RAM:
              <b :style="{ color: textSecondaryColor }">128GB</b> | Storage:
              <b :style="{ color: textSecondaryColor }">1TB HDD + 512GB SSD</b>
              | Graphics:
              <b :style="{ color: textSecondaryColor }"
                >NVIDIA GeForce RTX 3080</b
              >
            </div>
          </div>

          <div
            class="absolute b-0 flex jc-space-between-ai-center preview-w-100 pb-2"
          >
            <div
              :style="{ color: primaryColor }"
              class="flex gap preview-secondary-size text-xl"
            >
              <div>Tag 1</div>
              <div>Tag 2</div>
              <div>Tag 3</div>
            </div>

            <div
              :style="{ backgroundColor: backgroundColor }"
              class="preview-voting flex preview-secondary-size"
            >
              <i
                :style="{ color: textColor }"
                class="pi pi-angle-double-down preview-secondary-size"
              ></i>
              <i
                :style="{ color: textColor }"
                class="pi pi-angle-double-up preview-secondary-size"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="my-5"></div>
  </div>
</template>

<style>
.preview-w-100 {
  width: 75%;
}

.preview-secondary-size {
  font-size: 16px;
}

.preview-voting {
  border-radius: 10000px;
  padding: 4px 8px;
}
.preview-dot {
  border-radius: 100000px;
  height: 10px;
  width: 10px;
}

.preview-label {
  padding: 6px 12px;
  border-radius: 1000px;
  font-size: 16px;
}

.preview-mock-image {
  height: 200px;
  width: 200px;
}

.preview-result {
  height: 200px;
  width: 70%;
}
</style>
