<script setup lang="ts">
import { ref } from 'vue'
import HeroComponent from './components/HeroComponent.vue'
import NavbarComponent from './components/NavbarComponent.vue'
import type { Product } from './interfaces/Product'
import { fetchResults } from './api-calls/fetchResults'

const results = ref<Product[]>([])
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const textResponse = ref('')

async function onSearchSubmit(query: string) {
  results.value = await fetchResults(query)
  console.log(results.value)
}
</script>

<template>
  <NavbarComponent />
  <HeroComponent @searchSubmit="onSearchSubmit" />
</template>

<style></style>
