<script setup lang="ts">
import type { DataTableRowEditSaveEvent } from "primevue";
import deletePromptDb from "~/utils/deletePrompt";

const { data: prompts } = await useFetch<Prompt[]>("/api/prompts?page=1");

const dialogVisible = ref(false); // Steuert die Sichtbarkeit des Dialogs
const deletePromptDialog = ref(false); // For confirming deletion
const selectedPrompt = ref<Prompt | null>(null); // Stores the prompt to be deleted

const newPrompt = ref(""); // Temporäre Daten für den neuen Eintrag

const editingRows = ref([]);
const onRowEditSave = async (event: DataTableRowEditSaveEvent) => {
  const { newData, index } = event;

  prompts.value![index] = await putPrompt(newData);
};

// Datei hochladen
function onFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) {
    return;
  }
}

// Neuen text hinzufügen
async function addPrompt() {
  if (newPrompt.value) {
    const prompt = await postPrompt(newPrompt.value);
    prompts.value?.push(prompt); // Neuen text zur Liste hinzufügen
    newPrompt.value = ""; // Formular zurücksetzen
    dialogVisible.value = false; // Dialog schließen
  } else {
    alert("Bitte alle Felder ausfüllen!"); // Alternativ kann eine elegantere Validierung implementiert werden
  }
}

const confirmDeletePrompt = (prompt: Prompt) => {
  selectedPrompt.value = prompt;
  deletePromptDialog.value = true;
};

const deletePrompt = async () => {
  await deletePromptDb(selectedPrompt.value!.id);
  prompts.value = prompts.value!.filter(
    (p) => p.id !== selectedPrompt.value!.id,
  );
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
        <label for="file-upload" class="upload-button button"
          >CSV hochladen</label
        >
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
      v-if="prompts"
      v-model:editing-rows="editingRows"
      :value="prompts"
      edit-mode="row"
      data-key="id"
      :pt="{
        table: { style: 'min-width: 50rem' },
        column: {
          // @ts-expect-error
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
      <Column field="id" header="ID" style="font-weight: normal"></Column>
      <Column field="text" header="Prompt" style="font-weight: normal">
        <template #editor="{ data, field }">
          <Textarea v-model="data[field]" rows="4" cols="80" fluid />
        </template>
      </Column>
      <Column
        field="user"
        header="Benutzer"
        style="font-weight: normal"
      ></Column>
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
            class="delete-button flex jc-ai-center"
            @click="confirmDeletePrompt(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="deletePromptDialog"
      :style="{ width: '450px'}"
      header="Bestätigung"
      :modal="true"
    >
      <div class="flex flex-column gap">
        <div class="flex items-center gap-4">
          <i class="pi pi-exclamation-triangle !text-3xl" />
          <span
            v-if="selectedPrompt"
            style="font-family: Inter, sans-serif; font-weight: normal"
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
          <Button
            label="Ja"
            icon="pi pi-check"
            class="flex gap p-button button"
            @click="deletePrompt"
          />
        </div>
      </div>
    </Dialog>

    <Dialog
      v-model:visible="dialogVisible"
      header="Neue Prompt-Template hinzufügen"
      style="width: 30vw"
      modal
      :draggable="false"
    >
      <div class="flex flex-column gap">
        <div class="field">
          <label for="text" class="block font-bold mb-3">Prompt</label>
          <Textarea
            id="text"
            v-model="newPrompt"
            required="true"
            rows="4"
            cols="20"
            style="font-family: Inter, sans-serif; font-weight: normal"
            autofocus
            fluid
          />
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
  background-color: var(--dark-primary);
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  display: inline-block;
  border-color: var(--dark-primary);
}

.delete-button:not(:hover) {
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
  background-color: var(--dark-primary);
}

.button {
  background-color: var(--dark-primary) !important;
  border-color: var(--dark-primary) !important;
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
