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
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="textResponse" v-html="textResponse" />
    <ResultCardsComponent :products="results" />
    <FooterComponent />
  </div>
</template>

<style></style>
