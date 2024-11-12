<script setup lang="ts">
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
    <pre v-if="textResponse">{{ textResponse }}</pre>
    <ResultCardsComponent :products="results" />
  </div>
</template>

<style></style>
