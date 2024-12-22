<script setup>
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";

onMounted(() => {
  const searchState = false;
  const searchSmBtn = document.getElementById("search-btn-sm");

  searchSmBtn.addEventListener("click", function () {
    if (searchState) {
      searchState = false;
      console.log("Searchstate ist aus");
    } else {
      searchState = true;
      console.log("Searchstate ist an");
    }
  });
});
</script>

<template>
  <form action="" class="flex">
    <input class="search-input-sm" type="text" placeholder="Suche..." />
    <button
      id="search-btn-sm"
      type="submit"
      class="submit-btn-sm flex jc-ai-center"
    >
      <MagnifyingGlassIcon class="searchbar-icon-sm" />
    </button>
  </form>
</template>

<style>
.search-input-sm {
  width: 15vw;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid var(--dark-text-secondary);
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
