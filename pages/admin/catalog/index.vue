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
const { data: collections } = await useFetch<Collection[]>("/api/collections");
const newCollection = ref({ name: "", description: "", key: "" });
const dialogVisible = ref(false);
const infoTextImport = ref("");

const deleteVisible = ref(false);
const deleteInfoText = ref("");
const deleteId = ref(0);

async function handleImportCollection() {
  const results = await fetch(`/api/collections`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      collectionName: newCollection.value.name,
      description: newCollection.value.description,
      key: newCollection.value.key,
    }),
  });

  if (results.status === 401) {
    infoTextImport.value = "You are not authorized for this action";
  } else if (!results.ok) {
    infoTextImport.value =
      "Something went wrong during Collection import. \r\n Status: " +
      results.status;
  } else {
    dialogVisible.value = false;
    const json = (await results.json()) as Collection;
    (collections.value ?? []).push(json);
  }
}

function handleOpenImportCollection() {
  dialogVisible.value = true;
  newCollection.value = { name: "", description: "", key: "" };
}

function handleOpenDeleteCollection(collection: Collection) {
  deleteId.value = collection.id;
  deleteVisible.value = true;
}

async function deleteCollection() {
  const result = await fetch(`/api/collections/${deleteId.value}`, {
    method: "DELETE",
  });

  if (result.status === 401) {
    deleteInfoText.value = "You are not authorized for this action";
  } else if (!result.ok) {
    deleteInfoText.value =
      "Something went wrong during Collection deletion. \r\n Status: " +
      result.status;
  } else {
    deleteVisible.value = false;
    collections.value = collections.value!.filter(
      (collection) => collection.id !== deleteId.value,
    );
  }
}
</script>

<template>
  <div>
    <h2>Catalog</h2>
    <div>
      <h3>Current Collections</h3>
      <div class="flex gap">
        <Button
          label="Import Collection"
          style="border: 1px solid transparent"
          class="upload-button button"
          @click="handleOpenImportCollection"
        />
        <!-- Dialog for importing collection -->
        <Dialog
          v-model:visible="dialogVisible"
          header="Import Collection"
          style="width: 30vw"
          modal
          :draggable="false"
        >
          <div class="p-fluid">
            <div class="field flex flex-column">
              <label for="name">Name</label>
              <InputText id="name" v-model="newCollection.name" />
            </div>
            <div class="field flex flex-column">
              <label for="description">Description</label>
              <InputText id="description" v-model="newCollection.description" />
            </div>
            <div class="field flex flex-column">
              <label for="description">FoxBase Key</label>
              <InputText id="description" v-model="newCollection.key" />
            </div>
          </div>
          <div class="p-dialog-footer">
            <div v-if="infoTextImport">{{ infoTextImport }}</div>
            <Button
              label="Cancel"
              style="border: 1px solid transparent"
              class="upload-button inversive-button"
              @click="dialogVisible = false"
            />
            <Button
              label="Import"
              style="border: 1px solid transparent"
              class="upload-button button"
              @click="handleImportCollection"
            />
          </div>
        </Dialog>
      </div>
      <!-- PrimeVue DataTable -->
      <DataTable
        :value="collections"
        striped-rows
        table-style="min-width: 50rem"
        selection-mode="single"
        @row-select="navigateTo(`/admin/catalog/${$event.data.id}`)"
      >
        <Column field="id" header="ID" style="font-weight: normal" />
        <Column
          field="collection_name"
          header="Name"
          style="font-weight: normal"
        />
        <Column
          field="collection_description"
          header="Description"
          style="font-weight: normal"
        />
        <Column
          field="collection_key"
          header="Key"
          style="font-weight: normal"
        />
        <Column>
          <template #body="slotProps">
            <Button
              icon="pi pi-eye"
              outlined
              rounded
              severity="info"
              class="column-button flex jc-ai-center"
              @click="navigateTo(`/admin/catalog/${slotProps.data.id}`)"
            />
          </template>
        </Column>
        <Column>
          <template #body="slotProps">
            <Button
              icon="pi pi-trash"
              outlined
              rounded
              severity="danger"
              class="column-button flex jc-ai-center"
              @click="handleOpenDeleteCollection(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
      <!-- Dialog for delete collection -->
      <Dialog
        v-model:visible="deleteVisible"
        :style="{ width: '450px' }"
        header="Delete Collection"
        :modal="true"
      >
        <div class="flex flex-column gap">
          <div class="flex items-center gap-4">
            <i class="pi pi-exclamation-triangle !text-3xl" />
            <span style="font-family: Inter, sans-serif; font-weight: normal">
              Are you sure you want to delete the collection?
            </span>
          </div>
          <div class="p-dialog-footer">
            <div v-if="deleteInfoText">{{ deleteInfoText }}</div>
            <Button
              label="No"
              icon="pi pi-times"
              class="flex gap p-button inversive-button"
              text
              @click="deleteVisible = false"
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              class="flex gap p-button button"
              @click="deleteCollection"
            />
          </div>
        </div>
      </Dialog>
    </div>
  </div>
</template>

<style scoped>
.column-button:not(:hover) {
  background-color: transparent;
}
</style>
