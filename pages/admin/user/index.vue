<script setup>
import { ref } from "vue";
import { parseCSV } from "../../../utils/csv-parser";
import { Dialog, InputText, Button } from "primevue";

const users = ref([]);
const dialogVisible = ref(false); // Steuert die Sichtbarkeit des Dialogs
const newUser = ref({ id: "", name: "", role: "" }); // Temporäre Daten für den neuen Eintrag

// Default CSV laden
loadDefaultCSV();

async function loadDefaultCSV() {
  try {
    const response = await fetch("/default.csv");
    if (!response.ok) throw new Error("Fehler beim Laden der Datei.");
    const csvData = await response.text();
    users.value = parseCSV(csvData);
  } catch (error) {
    console.error("Fehler beim Laden der Default-CSV:", error);
  }
}

// Datei hochladen
function onFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const csvData = e.target.result;
      users.value = parseCSV(csvData);
    };
    reader.readAsText(file);
  }
}

// Neuen Benutzer hinzufügen
function addUser() {
  if (newUser.value.id && newUser.value.name && newUser.value.role) {
    users.value.push({ ...newUser.value }); // Neuen Benutzer zur Liste hinzufügen
    newUser.value = { id: "", name: "", role: "" }; // Formular zurücksetzen
    dialogVisible.value = false; // Dialog schließen
  } else {
    alert("Bitte alle Felder ausfüllen!"); // Alternativ kann eine elegantere Validierung implementiert werden
  }
}
</script>

<template>
  <div>
    <!-- Titel -->
    <h2>Benutzerverwaltung</h2>

    <!-- Buttons für Upload und Hinzufügen -->
    <div style="margin-bottom: 1rem; display: flex; gap: 1rem">
      <label
        for="file-upload"
        style="border: 1px solid transparent"
        class="upload-button button"
        >Neue CSV hochladen</label
      >
      <input
        id="file-upload"
        type="file"
        accept=".csv"
        style="display: none"
        @change="onFileChange"
      />
      <Button
        label="Neuen Benutzer hinzufügen"
        style="border: 1px solid transparent"
        class="upload-button button"
        @click="dialogVisible = true"
      />
    </div>

    <!-- PrimeVue DataTable -->
    <DataTable :value="users" striped-rows table-style="min-width: 50rem">
      <Column field="id" header="ID"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="role" header="Rolle"></Column>
    </DataTable>

    <!-- Dialog für neuen Benutzer -->
    <Dialog
      v-model:visible="dialogVisible"
      header="Neuen Benutzer hinzufügen"
      style="width: 30vw"
      modal
      draggable="false"
    >
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
        <Button
          label="Abbrechen"
          class="p-button-text"
          @click="dialogVisible = false"
        />
        <Button label="Hinzufügen" class="p-button-primary" @click="addUser" />
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
