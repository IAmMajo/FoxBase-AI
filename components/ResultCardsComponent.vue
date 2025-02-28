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
  products: Product[];
}>();
</script>

<template>
  <div
    id="searchState"
    class="result-container flex flex-column jc-ai-center gap py-6 relative"
  >
    <div class="darkening-layer-secondary full-size-percent absolute z-0"></div>
    <div class="relative z-1">
      <ResultCardComponent
        v-for="(product, index) in products"
        :key="product.id"
        :index="index"
        :product="product"
      />
    </div>
  </div>
</template>

<style>
.result-container {
  background-color: var(--dark-bg-secondary);
}

html.light .result-container {
  background-color: var(--light-bg-secondary);
}

@media (max-width: 480px) {
  .result-container {
    padding-top: 20px;
  }
}

@media (max-width: 400px) {
  .result-container {
    padding-top: 50px;
  }
}
</style>
