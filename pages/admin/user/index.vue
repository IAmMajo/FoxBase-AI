<script setup>
import { ref } from "vue";
import { parseCSV } from "../../../utils/csv-parser";
import { Dialog, InputText, Button } from "primevue";

const users = ref([]);
const dialogVisible = ref(false); // Controlls dialog visibility
const newUser = ref({ id: "", name: "", role: "" }); // Temporary Data for new Entry


// Neuen Benutzer hinzufügen
function addUser() {
  if (newUser.value.id && newUser.value.name && newUser.value.role) {
    users.value.push({ ...newUser.value });
    newUser.value = { id: "", name: "", role: "" };
    dialogVisible.value = false;
  } else {
    alert("Please fill all fields!");
  }
}
</script>

<template>
  <div>
    <!-- Titel -->
    <h2>User Configuration</h2>

    <!-- Buttons für Upload und Hinzufügen -->
    <div style="margin-bottom: 1rem; display: flex; gap: 1rem">
      <Button label="Add new User" style="border: 1px solid transparent" class="upload-button button"
        @click="dialogVisible = true" />
    </div>

    <!-- PrimeVue DataTable -->
    <DataTable :value="users" striped-rows table-style="min-width: 50rem">
      <Column field="id" header="ID"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="role" header="Role"></Column>
    </DataTable>

    <!-- Dialog für neuen Benutzer -->
    <Dialog v-model:visible="dialogVisible" header="Add new User" style="width: 30vw" modal draggable="false">
      <div class="p-fluid">
        <div class="field flex flex-column">
          <label for="id">ID</label>
          <InputText id="id" v-model="newUser.id" />
        </div>
        <div class="field flex flex-column">
          <label for="name">Name</label>
          <InputText id="name" v-model="newUser.name" />
        </div>
        <div class="field flex flex-column">
          <label for="role">Rolle</label>
          <InputText id="role" v-model="newUser.role" />
        </div>
      </div>
      <div class="p-dialog-footer">
        <Button label="Cancel" class="p-button" @click="dialogVisible = false" />
        <Button label="Confirm" class="p-button-primary" @click="addUser" />
      </div>
    </Dialog>
  </div>
</template>

<style>
.p-dialog-header span {
  font-family: "Inter", sans-serif;
}

.p-button {
  background-color: var(--dark-primary);
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  display: inline-block;
  border: 1px solid var(--dark-primary);
}

.upload-button {
  background-color: var(--dark-primary);
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  display: inline-block;
}

.upload-button:hover {
  background-color: var(--dark-primary-hover);
}

.field {
  margin-bottom: 1rem;
}

.field label {
  font-size: 16px;
}

.p-dialog-footer {
  padding-right: 0;
  font-family: "Inter", sans-serif;
}
</style>
