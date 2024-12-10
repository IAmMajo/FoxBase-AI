<script setup>
const newCatalog = ref({ name: "", description: "" });
const catalogs = ref([]);
const dialogVisible = ref(false);
const infoTextNew = ref("");

const updateVisible = ref(false);
const files = ref();
const updateInfoText = ref("");
const updateCatalog = ref({ name: "", description: "" });

const deleteVisible = ref(false);
const deleteInfoText = ref("");
const deleteName = ref("");

async function loadCatalogs() {
  console.log("Catalog loading");
  //for some reson it tries to load admin/api...
  const results = await fetch(`/api/catalog/table`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((body) => body);

  catalogs.value = results.results;
}

async function handleNewCollection() {
  //here it loads api... directly not admin/api...
  const results = await fetch(`/api/catalog/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      collectionName: newCatalog.value.name,
      collectionCreator: "mustermann",
      description: newCatalog.value.description,
    }),
  });

  if (results.status === 401) {
    infoTextNew.value = "You are not authorized for this action";
  } else if (!results.ok) {
    infoTextNew.value =
      "Something went wrong during Collection creation. \r\n Status: " +
      results.status;
  } else {
    dialogVisible.value = false;
    loadCatalogs();
  }
}

function handleOpenNewCollection() {
  dialogVisible.value = true;
  newCatalog.value = { name: "", description: "" };
}
function onFileChange(event) {
  // console.log(event.target);
  if (!event) {
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    const csvData = e.target?.result;
    files.value = csvData;
  };
  reader.readAsText(event.target.files[0]);
}
async function updateCollection() {
  const result = await fetch(`/api/catalog/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      collectionName: updateCatalog.value.name,
      updateDescription: updateCatalog.value.description,
      collectionContent: files.value,
    }),
  });

  if (result.status === 401) {
    infoTextNew.value = "You are not authorized for this action";
  } else if (!result.ok) {
    infoTextNew.value =
      "Something went wrong during Collection creation. \r\n Status: " +
      result.status;
  } else {
    updateVisible.value = false;
  }
}

function handleOpenUpdateCollection() {
  updateVisible.value = true;
  updateCatalog.value = { name: "", description: "" };
}
function handleOpenDeleteCollection() {
  deleteVisible.value = true;
}

async function deleteCollection() {
  const result = await fetch(`/api/catalog/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      collectionName: deleteName.value,
    }),
  });

  if (result.status === 401) {
    deleteInfoText.value = "You are not authorized for this action";
  } else if (!result.ok) {
    deleteInfoText.value =
      "Something went wrong during Collection creation. \r\n Status: " +
      result.status;
  } else {
    deleteVisible.value = false;
    loadCatalogs();
  }
}
//on load
loadCatalogs();
</script>

<template>
  <div>
    <h2>Catalog</h2>
    <div>
      <h3>Current Collections</h3>
      <!-- PrimeVue DataTable -->
      <DataTable :value="catalogs" striped-rows table-style="min-width: 50rem">
        <Column field="collection_name" header="Name" />
        <Column field="collection_description" header="Description" />
        <Column field="collection_creator" header="Creator" />
      </DataTable>
    </div>
    <div>
      <Button
        label="New Collection"
        class="p-button"
        @click="handleOpenNewCollection"
      />
      <!-- Dialog for new collection -->
      <Dialog
        v-model:visible="dialogVisible"
        header="Create new collection"
        style="width: 30vw"
        modal
        :draggable="false"
      >
        <div class="p-fluid">
          <div class="field flex flex-column">
            <label for="name">Name</label>
            <InputText id="name" v-model="newCatalog.name" />
          </div>
          <div class="field flex flex-column">
            <label for="description">Description</label>
            <InputText id="description" v-model="newCatalog.description" />
          </div>
        </div>
        <div class="p-dialog-footer">
          <div v-if="infoTextNew">{{ infoTextNew }}</div>
          <Button
            label="Cancel"
            class="p-button-text"
            @click="dialogVisible = false"
          />
          <Button
            label="Create"
            class="p-button-primary"
            @click="handleNewCollection"
          />
        </div>
      </Dialog>

      <Button
        label="Update Collection"
        class="p-button"
        @click="handleOpenUpdateCollection"
      />
      <!-- Dialog for update collection -->
      <Dialog
        v-model:visible="updateVisible"
        header="Update collection"
        style="width: 30vw"
        modal
        :draggable="false"
      >
        <div class="p-fluid">
          <div class="field flex flex-column">
            <label for="name">Name</label>
            <InputText id="name" v-model="updateCatalog.name" />
          </div>
          <div class="field flex flex-column">
            <label for="description">Description</label>
            <InputText id="description" v-model="updateCatalog.description" />
          </div>
        </div>
        <label for="file-upload" class="upload-button">Upload new CSV</label>
        <input
          id="file-upload"
          type="file"
          style="display: none"
          accept=".csv"
          @change="onFileChange"
        />
        <div class="p-dialog-footer">
          <div v-if="updateInfoText">{{ updateInfoText }}</div>
          <Button
            label="Cancel"
            class="p-button-text"
            @click="updateVisible = false"
          />
          <Button
            label="Update"
            class="p-button-primary"
            @click="updateCollection"
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
            <label for="name">Name</label>
            <InputText id="name" v-model="deleteName" />
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
  </div>
</template>

<style scoped>
.delete-button {
  background-color: rgb(162, 9, 9);
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  display: inline-block;
  border: 1px rgb(116, 52, 6);
}

.delete-button:hover {
  background-color: rgb(111, 7, 7);
}
</style>
