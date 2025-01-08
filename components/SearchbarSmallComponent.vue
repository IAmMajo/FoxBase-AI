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
  if (collapsed) {
    width.value = "0vw";
    borderBottom.value = "none";
    return;
  }
  event.preventDefault();
  width.value = "15vw";
  borderBottom.value = "1.5px solid var(--dark-text-secondary)";
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
