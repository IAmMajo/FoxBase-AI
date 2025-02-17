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
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";

const { query } = defineProps<{
  query: string;
}>();
defineEmits(["searchInput", "searchSubmit"]);

let collapsed = true;

const width = ref("0vw");
const borderBottom = ref("none");

function onClick(event: MouseEvent) {
  collapsed = !collapsed;
  const screenWidth = window.innerWidth;
  console.log(screenWidth);

  if (collapsed) {
    width.value = "0vw";
    borderBottom.value = "none";
    return;
  }
  event.preventDefault();
  if (screenWidth >= 360 && screenWidth <= 600) {
    console.log("Screen ist zwischen 360 und 600");
    width.value = "50vw";
    borderBottom.value = "1.5px solid var(--dark-text-secondary)";
    return;
  }
  if (screenWidth >= 601 && screenWidth <= 1000) {
    console.log("Screen ist zwischen 601 und 1000");
    width.value = "30vw";
    borderBottom.value = "1.5px solid var(--dark-text-secondary)";
    return;
  } else {
    width.value = "15vw";
    borderBottom.value = "1.5px solid var(--dark-text-secondary)";
    return;
  }
}
</script>

<template>
  <form
    id="search-container-sm"
    action=""
    class="flex"
    @submit.prevent="$emit('searchSubmit')"
  >
    <input
      id="search-input-navsmall"
      class="search-input-sm"
      :style="{ width, borderBottom }"
      type="text"
      placeholder="Suche..."
      :value="query"
      @input="$emit('searchInput', $event)"
    />
    <button
      id="search-btn-sm"
      type="submit"
      class="submit-btn-sm flex jc-ai-center"
      @click="onClick"
    >
      <MagnifyingGlassIcon class="searchbar-icon-sm" />
    </button>
  </form>
</template>

<style>
/* Standardzustand vor dem ersten Click auf den Searchbtn */
.search-input-sm {
  color: var(--dark-text-secondary);
  font-size: 14px;
  width: 0vw;
  background-color: transparent;
  border: none;
  transition: 0.75s ease;
}
.search-input-sm:focus {
  outline: none;
  border-bottom: 1.5px solid var(--dark-text-secondary);
}
.submit-btn-sm {
  width: 35px;
  height: 35px;
  padding: 0;
  border: none;
  background-color: transparent;
}

.searchbar-icon-sm {
  height: 25px;
  width: 25px;
  color: var(--dark-text-secondary);
}

.submit-btn-sm:hover {
  cursor: pointer;
}
</style>
