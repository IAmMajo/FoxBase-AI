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

// Add new prompt
async function addPrompt() {
  dialogVisible.value = false;
  if (newPrompt.value) {
    const result = await postPrompt(newPrompt.value);
    if (!result.ok) {
      return;
    }
    const prompt = result.json() as Promise<Prompt>;
    prompts.value?.push(await prompt);
    newPrompt.value = "";
  } else {
    alert("Please fill all fields!");
  }
}

const confirmDeletePrompt = (prompt: Prompt) => {
  selectedPrompt.value = prompt;
  deletePromptDialog.value = true;
};

const deletePrompt = async () => {
  deletePromptDialog.value = false;
  if (!(await deletePromptDb(selectedPrompt.value!.id))) {
    return;
  }
  prompts.value = prompts.value!.filter(
    (p) => p.id !== selectedPrompt.value!.id,
  );
  selectedPrompt.value = null;
};
</script>

<template>
  <div>
    <!-- Titel -->
    <h2>Prompt Template Configuration</h2>

    <Toolbar class="mb-6">
      <template #start>
        <Button
          label="New Template"
          icon="pi pi-plus"
          class="flex gap p-button button"
          @click="dialogVisible = true"
        />
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
      <Column field="user" header="User" style="font-weight: normal"></Column>
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
      :style="{ width: '450px' }"
      header="Bestätigung"
      :modal="true"
    >
      <div class="flex flex-column gap">
        <div class="flex items-center gap-4">
          <i class="pi pi-exclamation-triangle !text-3xl" />
          <span
            v-if="selectedPrompt"
            style="font-family: Inter, sans-serif; font-weight: normal"
            >Are you sure that you want to delete the prompt template?</span
          >
        </div>
        <div class="p-dialog-footer">
          <Button
            label="No"
            icon="pi pi-times"
            class="flex gap p-button inversive-button"
            text
            @click="deletePromptDialog = false"
          />
          <Button
            label="Yes"
            icon="pi pi-check"
            class="flex gap p-button button"
            @click="deletePrompt"
          />
        </div>
      </div>
    </Dialog>

    <Dialog
      v-model:visible="dialogVisible"
      header="Create new Prompt-Template"
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
            class="prompt-textarea"
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
            label="Cancel"
            class="p-button-text inversive-button"
            @click="dialogVisible = false"
          />
          <Button
            label="Confirm creation"
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

.p-button-icon-only {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  padding: 0 !important;
}

.p-textarea:focus {
  border: 1px solid var(--dark-primary) !important;
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

.inversive-button {
  background-color: transparent;
  color: var(--dark-primary);
  border: 1px solid white;
}

.inversive-button:hover {
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
