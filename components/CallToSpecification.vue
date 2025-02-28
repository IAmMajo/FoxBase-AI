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
import SearchbarComponent from "./SearchbarComponent.vue";
import { ref } from "vue";

defineProps<{
  prompts: string[];
  query: string;
}>();
defineEmits(["promptClick", "searchInput", "searchSubmit"]);

const { data } = await useFetch<Record<string, string>>("/api/settings");

const settings = ref<Record<string, string>>({});
if (data.value) {
  settings.value = data.value;
}
</script>

<template>
  <div class="flex flex-column bg-secondary jc-ai-center">
    <div class="text-format-center">
      <h5 class="dark-heading text-align-center" style="margin: 0">
        Nicht das Richtige gefunden?
      </h5>
      <h5 class="dark-heading text-align-center" style="margin: 0">
        Sag mir was du suchst...
      </h5>
    </div>
    <div class="second-search">
      <SearchbarComponent
        :query="query"
        @search-input="(event) => $emit('searchInput', event)"
        @search-submit="$emit('searchSubmit')"
      />
    </div>
  </div>
</template>

<style>
.second-search {
  width: 40%;
  padding: 0 0 25px 0;
}

.text-format-center {
  text-align: center;
  padding: 25px 0px;
}
</style>
