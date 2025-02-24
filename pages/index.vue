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
    <CallToSpecification
      :prompts="filteredPrompts"
      :query="query"
      @prompt-click="onPromptClick"
      @search-input="onSearchInput"
      @search-submit="onSearchSubmit"
    />
    <FooterComponent />
  </div>
</template>

<style></style>
