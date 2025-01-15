<script setup lang="ts">
definePageMeta({
  layout: "custom",
});

const { data: prompts } = await useFetch<string[]>("/api/prompts");
const filteredPrompts = ref<string[]>(prompts.value ?? []);
const query = ref(String(useRoute().query.q ?? ""));
const textResponse = ref("");
const results = ref<Product[]>([]);

function onPromptClick(event: MouseEvent) {
  onSearchInput(event);
  onSearchSubmit();
}

async function onSearchInput(event: UIEvent) {
  query.value = (event.target as HTMLInputElement).value;
  const newPrompts = await fetchPrompts(query.value);
  if (newPrompts.length) {
    prompts.value = newPrompts;
  }
  filteredPrompts.value = (prompts.value ?? []).filter(
    (prompt) => prompt !== query.value,
  );
}

async function onSearchSubmit() {
  textResponse.value = "";
  results.value = [];
  const params = new URLSearchParams(location.search);
  if (!query.value) {
    params.delete("q");
    history.pushState(null, "", `?${params}`);
    return;
  }
  params.set("q", query.value);
  history.pushState(null, "", `?${params}`);
  document.getElementById("searchState")!.scrollIntoView({
    behavior: "smooth",
  });
  results.value = await fetchResults(query.value);
  textResponse.value = await fetchTextResponse(query.value, results.value);
}

onMounted(() => {
  if (query.value) {
    onSearchSubmit();
  }
});
</script>

<template>
  <div>
    <NavbarComponent
      :query="query"
      @search-input="onSearchInput"
      @search-submit="onSearchSubmit"
    />
    <HeroComponent
      :prompts="filteredPrompts"
      :query="query"
      @prompt-click="onPromptClick"
      @search-input="onSearchInput"
      @search-submit="onSearchSubmit"
    />
    <ResponseCardComponent v-if="results.length" :text="textResponse" />
    <ResultCardsComponent :products="results" />
    <FooterComponent />
  </div>
</template>

<style></style>
