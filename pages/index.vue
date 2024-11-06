<script setup lang="ts">
const results = ref<Product[]>([]);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const textResponse = ref("");

async function onSearchSubmit(query: string) {
  results.value = await fetchResults(query);
  console.log(results.value);
}
</script>

<template>
  <div>
    <NavbarComponent />
    <HeroComponent @search-submit="onSearchSubmit" />
    <FooterComponent />
  </div>
</template>

<style></style>
