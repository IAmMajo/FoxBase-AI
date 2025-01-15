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

    <div>
      <div class="content-container-detail flex gap-lg jc-ai-center">
        <img src="@/assets/graphics/mock.webp" alt="Mock Image" />
        <div class="flex flex-column jc-ai-start gap">
          <div class="flex gap jc-start-ai-center">
            <h1>{{ product?.name ?? "Product not found" }}</h1>
            <div v-if="query.label" class="label-result">
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
                <div class="dot-element-text">
                  Type: <b>{{ product.category }}</b>
                </div>
              </div>

              <div
                v-if="product.attributes"
                class="mt-1 flex gap jc-start-ai-center"
              >
                <div class="dot"></div>
                <div class="dot-element-text">
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
            <div class="flex gap">
              <button class="detail-button">Button 1</button>
              <button class="detail-button">Button 2</button>
            </div>
            <div v-if="q" class="mt text-response">
              <h2 class="dark-subheading">Does the product fit your query?</h2>
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
  min-height: 12vh;
  border-radius: var(--border-radius-default);
}

.content-container-detail {
  padding-left: 20px;
}

.content-container-detail h1 {
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
  height: 100vh;
  width: 100%;
  background-color: var(--dark-bg-secondary);
}

html.light .detail-container {
  height: 100vh;
  width: 100%;
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
