<script setup lang="ts">



// Testdaten
// const products = ref<Product[]>([
//   {
//     id: 1,
//     name: "Apple MacBook Air 13'' (2024), MRXV3D/A'",
//     category: "Notebook",
//     description: "A high-quality smartphone with advanced features.",
//     attributes: {
//       Processor: "Apple M3 Chip",
//       Memory: "16 GB",
//       Storage: "256 GB",
//       Display: "Liquid Retina Display",
//     },
//     typicalUseCases: ["Remote work", "Business travel", "Office use"],
//     score: 1,
//   },
//   {
//     id: 2,
//     name: "Apple Mac mimi, MXNG2D/A",
//     category: "Mini PC",
//     description: "A powerful laptop for professionals and students.",
//     attributes: {
//       Processor: "3,0 GHz 6-Core Intel Core i5",
//       Memory: "8 GB",
//       Storage: "512 GB SSD",
//       GPU: "UHD 630",
//     },
//     typicalUseCases: ["Productivity", "Portability", "Office use"],
//     score: 85,
//   },
//   {
//     id: 3,
//     name: "Headphones C",
//     category: "Audio",
//     description: "Wireless headphones with excellent sound quality.",
//     attributes: {
//       brand: "Brand C",
//       color: "Blue",
//       batteryLife: "20 hours",
//       connectivity: "Bluetooth 5.0",
//     },
//     typicalUseCases: ["Music", "Podcasts", "Video Calls"],
//     score: 88,
//   },
// ]);

// Test fetchResults -> error
// const products = ref<Product[]>([]);

// onMounted(async () => {
//   try {
//     const query = 'laptop';
//     products.value = await fetchResults(query);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//   }
// });

defineProps<{
  products: Product[];
}>();
</script>

<template>
  <div id="searchState" class="result-container flex flex-column jc-ai-center gap py-6 relative">
    <div class="darkening-layer-secondary full-size-percent absolute z-0"></div>
    <div class="relative z-1">
      <ResultCardComponent
        v-for="(product, index) in products"
        :key="product.id"
        :index="index"
        :product="product"
      />
    </div>
  </div>
</template>

<style>
.result-container {
  background-color: var(--dark-bg-secondary);
}

@media (max-width: 480px) {
  .result-container {
    padding-top: 20px;
  }
}

@media (max-width: 400px) {
  .result-container {
    padding-top: 50px;
  }
}
</style>
