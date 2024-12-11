<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";

defineEmits(["searchInput", "searchSubmit"]);

const query = ref("");
</script>

<template>
  <form
    class="searchbar-container flex"
    action=""
    @submit.prevent="$emit('searchSubmit', query)"
  >
    <input
      v-model="query"
      class="searchbar-input"
      type="text"
      placeholder="Suche..."
      @input="$emit('searchInput', query)"
    />
    <button type="submit" class="submit-btn flex jc-ai-center">
      <MagnifyingGlassIcon class="searchbar-icon" />
    </button>
  </form>
</template>

<style>
.submit-btn {
  width: 60px;
}

.searchbar-input {
  height: 70px;
  border: none;
  flex: 1;
  margin: 0;
  padding-left: 24px;
  background-color: var(--dark-bg-search);
  border-bottom-left-radius: var(--border-radius-full);
  border-top-left-radius: var(--border-radius-full);
  font-size: var(--fs-paragraph);
  outline: none;
  color: var(--dark-text-primary);
  font-family: "asap", sans-serif;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 15%);
}

.searchbar-container .submit-btn {
  background-color: var(--dark-bg-search);
  border: none;
  border-top-right-radius: 1000px;
  border-bottom-right-radius: 1000px;
  height: 70px;
  color: var(--dark-text-secondary);
  padding-right: 20px;
}

.searchbar-icon {
  height: 30px;
  width: 30px;
}

@media (max-width: 1279px) {
  .searchbar-container {
    width: 80%;
  }

  .searchbar-input {
    height: 50px;
  }
  .searchbar-container a {
    height: 52px;
  }
}

@media (max-width: 768px) {
  .searchbar-container {
    width: 85%;
  }

  .searchbar-input {
    height: 50px;
  }
  .searchbar-container a {
    height: 52px;
  }
}

@media (max-width: 480px) {
  .searchbar-container {
    width: 93%;
  }

  .searchbar-input {
    height: 50px;
  }
  .searchbar-container a {
    height: 52px;
  }
}

@media (max-width: 400px) {
  .searchbar-container {
    width: 93%;
  }

  .searchbar-input {
    height: 50px;
  }
  .searchbar-container a {
    height: 52px;
  }
}
</style>
