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
      (collection) => collection.id !== deleteId.value
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
        header="Delete collection"
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
              class="flex gap p-button cancel-button"
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

.p-dialog-header span {
  font-family: "Inter", sans-serif;
}

.field label {
  font-size: 16px;
}

.p-dialog-footer {
  font-family: "Inter", sans-serif;
}

.p-button {
  background-color: var(--dark-primary);
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  display: inline-block;
  border-color: var(--dark-primary);
}

.button:hover {
  background-color: color-mix(
    in srgb,
    var(--dark-primary),
    transparent 85%
  ) !important;
  color: var(--dark-primary) !important;
  border:
    1px,
    solid var(--dark-primary) !important;
}

.cancel-button {
  background-color: var(--light-bg-secondary) !important;
  border-color: color-mix(
    in srgb,
    var(--light-text-secondary),
    transparent 80%
  ) !important;
  color: var(--light-text-secondary) !important;
}

.cancel-button:hover {
  background-color: color-mix(
    in srgb,
    var(--p-message-error-simple-color),
    transparent 90%
  ) !important;
  color: var(--light-text-secondary) !important;
  border:
    1px,
    solid var(--p-message-error-simple-color) !important;
}
</style>
