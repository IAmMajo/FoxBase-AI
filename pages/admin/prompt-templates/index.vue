<script setup>
import { ref } from "vue";
import { parseCSV } from "../../../utils/csv-parser";
import { Dialog, Button, Textarea } from "primevue";

// const prompts = ref([]);
const prompts = ref([
  {
    id: 0,
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!",
    user: "Max Mustermann"
  },
]);

const dialogVisible = ref(false); // Steuert die Sichtbarkeit des Dialogs
const deletePromptDialog = ref(false); // For confirming deletion
const selectedPrompt = ref(null); // Stores the prompt to be deleted

const newPrompt = ref({ id: "", text: "", user: "" }); // Temporäre Daten für den neuen Eintrag

const editingRows = ref([]);
const onRowEditSave = (event) => {
  const { newData, index } = event;

  prompts.value[index] = newData;
};

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

// Neuen text hinzufügen
function addPrompt() {
  if (newPrompt.value.text) {
    prompts.value.push({ ...newPrompt.value }); // Neuen text zur Liste hinzufügen
    newPrompt.value = { id: "", text: "", user: "" }; // Formular zurücksetzen
    dialogVisible.value = false; // Dialog schließen
  } else {
    alert("Bitte alle Felder ausfüllen!"); // Alternativ kann eine elegantere Validierung implementiert werden
  }
}

const confirmDeletePrompt = (prompt) => {
  selectedPrompt.value = prompt;
  deletePromptDialog.value = true;
};

const deletePrompt = () => {
  prompts.value = prompts.value.filter((p) => p.id !== selectedPrompt.value.id);
  selectedPrompt.value = null;
  deletePromptDialog.value = false;
};
</script>

<template>
  <div>
    <!-- Titel -->
    <h2>Prompt-Templates Konfiguration</h2>

    <Toolbar class="mb-6">
      <template #start>
        <Button
          label="Neue Template"
          icon="pi pi-plus"
          class="flex gap p-button button"
          @click="dialogVisible = true"
        />
      </template>

      <template #end>
        <label for="file-upload" class="upload-button button">CSV hochladen</label>
        <input
          id="file-upload"
          type="file"
          accept=".csv"
          style="display: none"
          @change="onFileChange"
        />
        <!-- <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="CSV hochladen" customUpload
          chooseLabel="CSV hochladen" class="mr-2 flex gap p-button" auto
          :chooseButtonProps="{ severity: 'secondary' }" /> -->
      </template>
    </Toolbar>

    <!-- PrimeVue DataTable -->
    <DataTable
      v-model:editing-rows="editingRows"
      :value="prompts"
      edit-mode="row"
      data-key="id"
      :pt="{
        table: { style: 'min-width: 50rem' },
        column: {
          bodycell: ({ state }) => ({
            style:
              state['d_editing'] &&
              'padding-top: 0.75rem; padding-bottom: 0.75rem',
          }),
        },
      }"
      striped-rows
      table-style="min-width: 50rem"
      @row-edit-save="onRowEditSave"
    >
      <Column field="id" header="ID" style="font-weight: normal;"></Column>
      <Column field="text" header="Prompt" style="font-weight: normal;">
        <template #editor="{ data, field }">
          <Textarea v-model="data[field]" rows="4" cols="80" fluid />
        </template>
      </Column>
      <Column field="user" header="Benutzer" style="font-weight: normal;"></Column>
      <Column
        :row-editor="true"
        style="width: 10%; min-width: 8rem"
        body-style="text-align:center"
      ></Column>
      <Column :exportable="false">
        <template #body="slotProps">
          <!-- <Button icon="pi pi-pencil" outlined rounded class="mr-2"  @click="editingRows.push(slotProps.data)" /> -->
          <Button
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click="confirmDeletePrompt(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="deletePromptDialog"
      :style="{ width: '450px' }"
      header="Bestätigung"
      :modal="true"
    >
      <div class="flex flex-column gap">
        <div class="flex items-center gap-4">
          <i class="pi pi-exclamation-triangle !text-3xl" />
          <span v-if="selectedPrompt" style="font-family:Inter, sans-serif; font-weight: normal;"
            >Bist du sicher, dass du die Prompt-Template löschen möchtest?</span
          >
        </div>
        <div class="p-dialog-footer">
          <Button
            label="Nein"
            icon="pi pi-times"
            class="flex gap p-button cancel-button"
            text
            @click="deletePromptDialog = false"
          />
          <Button label="Ja" icon="pi pi-check" class="flex gap p-button button" @click="deletePrompt" />
        </div>
      </div>
    </Dialog>

    <Dialog
      v-model:visible="dialogVisible"
      header="Neue Prompt-Template hinzufügen"
      style="width: 30vw"
      modal
      draggable="false"
    >
      <div class="flex flex-column gap">
        <div class="field">
          <label for="text" class="block font-bold mb-3">Prompt</label>
          <Textarea
            id="text"
            v-model="newPrompt.text"
            required="true"
            rows="4"
            cols="20"
            style="font-family:Inter, sans-serif; font-weight: normal;"
            autofocus
            :invalid="submitted && !newPrompt.text"
            fluid
          />
          <small v-if="submitted && !newPrompt.text" class="text-red-500"
            >Prompt wird benötigt.</small
          >
        </div>

        <div class="p-dialog-footer">
          <Button
            label="Abbrechen"
            class="p-button-text cancel-button"
            @click="dialogVisible = false"
          />
          <Button
            label="Hinzufügen"
            class="p-button-primary button"
            @click="addPrompt"
          />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<style>
:root {
  --p-message-error-simple-color: #dc2626;
}

.p-dialog-header span {
  font-family: "Inter", sans-serif;
}

.p-button {
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  display: inline-block;
}

.p-button:not(:hover) {
  background-color: transparent;
}

.upload-button {
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

.button {
  background-color: var(--light-primary-hover) !important;
  border-color: var(--light-primary-hover) !important;
}

.button:hover {
  background-color: color-mix(
    in srgb,
    var(--light-primary),
    transparent 60%
  ) !important;
  color: var(--light-primary-hover) !important;
  border: 1px, solid var(--light-primary-hover) !important;
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
  border: 1px, solid var(--p-message-error-simple-color) !important;
}

.field {
  margin-bottom: 1rem;
}

.field label {
  font-size: 16px;
}

.p-dialog-footer {
  /* padding-right: 0; */
  /* margin: auto; */
  font-family: "Inter", sans-serif;
}
</style>
