<script setup lang="ts">
definePageMeta({
  layout: "custom",
});
const results = ref<Product[]>([]);
const textResponse = ref("");

const { data } = await useFetch<{ [key: string]: string }>("/api/settings");
const value = data.value;

onMounted(() => {
  if (!value) {
    return;
  }
  const documentStyle = document.documentElement.style;
  documentStyle.setProperty("--dark-primary", value.colorPrimary);
  documentStyle.setProperty(
    "--dark-bg-secondary",
    value.colorBackgroundSecondary,
  );
  documentStyle.setProperty("--dark-text-primary", value.colorTextPrimary);
  documentStyle.setProperty("--dark-text-secondary", value.colorTextSecondary);
});

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
