<script setup lang="ts">
const { data: collections } = await useFetch<Collection[]>("/api/collections");
const newCollection = ref({ name: "", description: "", key: "" });
const dialogVisible = ref(false);
const infoTextImport = ref("");
const selectedCollection = ref<Collection | null>(null);

const deleteVisible = ref(false);
const deleteInfoText = ref("");
const deleteId = ref(0);

async function loadCollections() {
  const results = await fetch(`/api/collections`, {
    method: "GET",
  })
    .then((response) => response.json() as Promise<Collection[]>)
    .then((body) => body);

  collections.value = results;
}

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

function handleOpenDeleteCollection() {
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
    loadCollections();
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
              class="upload-button button"
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

        <Button
          label="Delete Collection"
          class="delete-button"
          @click="handleOpenDeleteCollection"
        />
        <!-- Dialog for delete collection -->
        <Dialog
          v-model:visible="deleteVisible"
          header="Delete collection"
          style="width: 30vw"
          modal
          :draggable="false"
        >
          <div class="p-fluid">
            <div class="field flex flex-column">
              <label for="name">ID</label>
              <InputNumber id="name" v-model="deleteId" />
            </div>
          </div>
          <div class="p-dialog-footer">
            <div v-if="deleteInfoText">{{ deleteInfoText }}</div>
            <Button
              label="Cancel"
              class="p-button-text"
              @click="deleteVisible = false"
            />
            <Button
              label="Delete"
              class="delete-button"
              @click="deleteCollection"
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
        <Column field="id" header="ID" />
        <Column field="collection_name" header="Name" />
        <Column field="collection_description" header="Description" />
        <Column field="collection_key" header="Key" />
        <Column>
          <template #body="{ data }">
            <Button
              icon="pi pi-trash"
              outlined
              rounded
              severity="danger"
              class="delete-button flex jc-ai-center"
              @click="confirmDeletePrompt(data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<style scoped>
.delete-button:not(:hover) {
  background-color: transparent;
}
</style>
