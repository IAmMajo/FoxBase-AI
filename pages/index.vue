<script setup lang="ts">
definePageMeta({
  layout: "custom",
});

const results = ref<Product[]>([]);
const textResponse = ref("");

async function onSearchSubmit(query: string) {
  results.value = [];
  textResponse.value = "";
  results.value = await fetchResults(query);
  textResponse.value = await fetchTextResponse(query, results.value);
}
</script>

<template>
  <div>
    <NavbarComponent />
    <HeroComponent @search-submit="onSearchSubmit" />
    <ResponseCardComponent v-if="results.length" :text="textResponse" />
    <ResultCardsComponent :products="results" />
    <FooterComponent />
  </div>
</template>

<style></style>
