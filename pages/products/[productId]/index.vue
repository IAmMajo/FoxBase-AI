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
import "primeicons/primeicons.css";

// Custom Layout, um nicht das Admin Layout zu erhalten
definePageMeta({
  layout: "custom",
});

const { data: settings } =
  await useFetch<Record<string, string>>("/api/settings");
const product = ref<Product | null>(null);
const textResponse = ref<string | null>(null);

const { query, params } = useRoute();
const q = String(query.q ?? "");

if (settings.value) {
  const { data } = await useFetch<Product>(
    `/api/collections/${settings.value.activeCollection}/products/` +
      params.productId,
  );
  product.value = data.value;
}

onMounted(async () => {
  if (q && product.value) {
    textResponse.value = await fetchTextResponse(q, [product.value]);
  }
});
</script>

<template>
  <div class="detail-container flex flex-column">
    <div class="py-3 flex jc-space-between-ai-center">
      <DetailBackButtonComponent />
      <LightDarkSwitchComponent />
    </div>

    <div class="flex full-width jc-ai-center">
      <div class="content-container-detail flex gap-lg jc-center-ai-start">
        <img src="@/assets/graphics/mock.webp" alt="Mock Image" />
        <div class="flex flex-column jc-ai-start gap">
          <div class="flex gap jc-start-ai-center">
            <h2>{{ product?.name ?? "Product not found" }}</h2>
            <div v-if="query.label" class="label-result asap">
              {{ query.label }}
            </div>
          </div>

          <template v-if="product">
            <div v-if="product.category || product.attributes" class="text-xl">
              <div
                v-if="product.category"
                class="mt-2 flex gap jc-start-ai-center"
              >
                <div class="dot"></div>
                <div class="dot-element-text asap">
                  Type: <b>{{ product.category }}</b>
                </div>
              </div>

              <div
                v-if="product.attributes"
                class="mt-1 flex gap jc-start-ai-center"
              >
                <div class="dot"></div>
                <div class="dot-element-text asap">
                  <template
                    v-for="(value, name, index) in product.attributes"
                    :key="index"
                  >
                    <template v-if="index"> | </template>
                    {{ name }}: <b>{{ value }}</b>
                  </template>
                </div>
              </div>
            </div>
            <p v-if="product.description" class="text-xl">
              {{ product.description }}
            </p>
            <div v-if="q" class="mt text-response">
              <h3 class="dark-subheading">Does the product fit your query?</h3>
              <p>{{ q }}</p>
              <div
                class="mt response-box-detail flex jc-ai-center dark-subheading relative"
              >
                <div class="shade-layer absolute full-size-percent"></div>
                <div
                  class="dark-subheading color-response-card z-2 text-xl"
                  v-html="textResponse /* eslint-disable-line vue/no-v-html */"
                ></div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

.detail-button {
  font-size: 1.2rem;
  background-color: var(--dark-primary);
  color: var(--dark-text-primary);
  padding: 16px 100px;
  border-radius: 1000px;
  border: none;
}

html.light .detail-button {
  font-size: 1.2rem;
  background-color: var(--light-primary);
  color: var(--dark-text-primary);
  padding: 16px 100px;
  border-radius: 1000px;
  border: none;
}

.detail-button:hover {
  cursor: pointer;
}

.dot-element-text {

  color: var(--dark-text-secondary);
}

html.light .dot-element-text {
  color: var(--light-text-secondary);
}

.dot-element-text b {
  color: var(--dark-text-primary);
}

html.light .dot-element-text b {
  color: var(--light-text-primary);
}

.response-box-detail {
  border: 2px solid var(--dark-primary);
  padding: var(--gap);
  width: 80%;
  border-radius: var(--border-radius-default);
}

.content-container-detail {
  padding-left: 20px;
}

.content-container-detail h2 {
  color: var(--dark-text-primary);
}

html.light .content-container-detail h1 {
  color: var(--light-text-primary);
}

.content-container-detail p {
  color: var(--dark-text-primary);
}

html.light .content-container-detail p {
  color: var(--light-text-primary);
}

.detail-container {
  height: auto;
  width: 100%;
  padding-bottom: 25vh;
  background-color: var(--dark-bg-secondary);
}

html.light .detail-container {
  height: auto;
  width: 100%;
  padding-bottom: 25vh;
  background-color: var(--light-bg-secondary);
}

.detail-container img {
  height: 70vh;
  width: 45vw;
}

.detail-container p {
  width: 70%;
}

.text-response h2 {
  margin: 0;
}

.response-box-detail {
  width: 70%;
}

.response-box-detail p {
  color: var(--dark-text-secondary);
  width: unset;
  margin: 0;
}

html.light .response-box-detail p {
  color: var(--light-text-secondary);
}
</style>
