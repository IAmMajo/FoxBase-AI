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
const { collectionId } = useRoute().params;
const { data: collection } = await useFetch<Collection>(
  `/api/collections/${collectionId}`,
);
const { data: products } = await useFetch<Product[]>(
  `/api/collections/${collectionId}/products?page=1`,
);
</script>

<template>
  <div v-if="collection">
    <h2>Collection "{{ collection.collection_name }}"</h2>
    <p>ID: {{ collection.id }}</p>
    <p>Description: {{ collection.collection_description }}</p>
    <p>Key: {{ collection.collection_key }}</p>
    <h3>Products</h3>
    <DataTable
      :value="products"
      data-key="id"
      striped-rows
      table-style="min-width: 50rem"
    >
      <Column field="id" header="ID" style="font-weight: normal" />
      <Column
        field="foxbase_id"
        header="FoxBase ID"
        style="font-weight: normal"
      />
      <Column field="name" header="Name" style="font-weight: normal" />
      <Column field="category" header="Category" style="font-weight: normal" />
      <Column
        field="description"
        header="Description"
        style="font-weight: normal"
      />
    </DataTable>
  </div>
  <h2 v-else>Collection not found</h2>
</template>
