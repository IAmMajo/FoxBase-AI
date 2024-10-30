<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue';

const emit = defineEmits(['searchSubmit'])

const query = ref('')

function onSubmit(event: Event) {
  event.preventDefault()
  emit('searchSubmit', query.value)
}
</script>

<template>
  <form @submit="onSubmit" class="searchbar-container flex" action="">
    <input v-model="query" class="searchbar-input" type="text" placeholder="Suche..." />
    <a class="flex jc-ai-center" href=""
      ><MagnifyingGlassIcon class="searchbar-icon"
    /></a>
  </form>
</template>

<style>
.searchbar-input {
  height: 68px;
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
  font-family: 'asap', sans-serif;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 15%);
}

.searchbar-container {
  margin: 70px 0;
  height: 80px;
  width: 65%;
  border-radius: var(--border-radius-full);
}
.searchbar-container a {
  height: 70px;
  width: 68px;
  color: var(--dark-text-secondary);
  background-color: var(--dark-bg-search);
  border-top-right-radius: var(--border-radius-full);
  border-bottom-right-radius: var(--border-radius-full);
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
