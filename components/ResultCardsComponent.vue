<script setup lang="ts">

// import type { Product } from '../types/Product'

// const product = defineProps<Product>()

// // options based
// const emit = defineEmits({
//   change: (id: number) => {
//     // return `true` or `false` to indicate
//     // validation pass / fail
//     return true;
//   },
//   update: (value: string) => {
//     // return `true` or `false` to indicate
//     // validation pass / fail
//     return true;
//   }
// })

import ResultCardComponent from './ResultCardComponent.vue';
//import type Product from '../types/Product.d.ts';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  attributes: { [key: string]: string };
  typicalUseCases: string[];
  score: number;
}

const products = ref<Product[]>([
  {
    id: 1,
    name: "Apple MacBook Air 13'' (2024), MRXV3D/A'",
    category: "Notebook",
    description: "A high-quality smartphone with advanced features.",
    attributes: {
        Processor: "Apple M3 Chip", 
        Memory: "16 GB",
        Storage: "256 GB",
        Display: "Liquid Retina Display"
    },
    typicalUseCases: ["Remote work", "Business travel", "Office use"],
    score: 1
  },
  {
    id: 2,
    name: "Apple Mac mimi, MXNG2D/A",
    category: "Mini PC",
    description: "A powerful laptop for professionals and students.",
    attributes: {
        Processor: "3,0 GHz 6-Core Intel Core i5", 
        Memory: "8 GB",
        Storage: "512 GB SSD",
        GPU: "UHD 630"
    },
    typicalUseCases: ["Productivity", "Portability", "Office use"],
    score: 85
  },
  {
    id: 3,
    name: "Headphones C",
    category: "Audio",
    description: "Wireless headphones with excellent sound quality.",
    attributes: {
      brand: "Brand C",
      color: "Blue",
      batteryLife: "20 hours",
      connectivity: "Bluetooth 5.0",
    },
    typicalUseCases: ["Music", "Podcasts", "Video Calls"],
    score: 88
  }
]);


</script>


<template>
    <div class="result-container flex flex-column jc-ai-center gap">
        <ResultCardComponent 
            v-for="(product, index) in products"
            :key="product.id"
            :index="index"
            :name="product.name"
            :category="product.category"
            :description="product.description"
            :attributes="product.attributes"
            :typical-use-cases="product.typicalUseCases"
            :score="product.score"
        />
    </div>
</template>


<style>

.result-container {
    background-color: var(--dark-bg-primary);
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