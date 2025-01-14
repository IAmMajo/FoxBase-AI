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
