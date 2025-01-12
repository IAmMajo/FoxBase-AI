<script setup lang="ts">
import { ref } from "vue";
import { Dialog, InputText, Button, Password, Select } from "primevue";

interface User {
  id: number;
  name: string;
  role: string;
}

const users = ref<User[]>([]);
const deleteDialogVis = ref(false);
const dialogVisible = ref(false); // Controlls dialog visibility
const newUser = ref({ name: "Max Musterman", role: "admin", password: "Password" }); // Temporary Data for new Entry
const selectedUser = ref<User | null>(null);


async function addUser() {
  if (newUser.value!.name && newUser.value!.role && newUser.value!.password) {

    const createdUser = await fetch(`/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: newUser.value.name, password: newUser.value.password, role: newUser.value.role }),
    }).then(json => json.json() as Promise<User>);
    console.log(createdUser);
    users.value = users.value!.filter(
      (p) => p.id !== createdUser.id,
    );
    users.value?.push({ ...createdUser });
    dialogVisible.value = false;
  } else {
    alert("Please fill all fields!");
  }
}

fillUserTable();

async function fillUserTable() {
  users.value = await fetch(`/api/users`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  }).then(json => json.json() as Promise<User[]>);

}

const confirmDeleteUser = (user: User) => {
  selectedUser.value = user;
  deleteDialogVis.value = true;
};

const deleteUser = async () => {
  await deleteUserDB(selectedUser.value!.id);
  users.value = users.value!.filter(
    (p) => p.id !== selectedUser.value!.id,
  );
  selectedUser.value = null;
  deleteDialogVis.value = false;
};

async function deleteUserDB
  (id: number) {
  const response = await fetch(`/api/users/`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id })
  });
  return response.ok;
}
</script>

<template>
  <div>
    <!-- Titel -->
    <h2>User Configuration</h2>

    <!-- Buttons für Upload und Hinzufügen -->
    <div style="margin-bottom: 1rem; display: flex; gap: 1rem">
      <Button label="Add or Edit User" style="border: 1px solid transparent" class="upload-button button"
        @click="dialogVisible = true" />
    </div>

    <!-- PrimeVue DataTable -->
    <DataTable :value="users" striped-rows table-style="min-width: 50rem">
      <Column field="id" header="ID"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="role" header="Role"></Column>
      <Column :exportable="false">
        <template #body="slotProps">
          <!-- <Button icon="pi pi-pencil" outlined rounded class="mr-2"  @click="editingRows.push(slotProps.data)" /> -->
          <Button icon="pi pi-trash" outlined rounded severity="danger" class="delete-button flex jc-ai-center"
            @click="confirmDeleteUser(slotProps.data)" />
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="deleteDialogVis" :style="{ width: '450px' }" header="Bestätigung" :modal="true">
      <div class="flex flex-column gap">
        <div class="flex items-center gap-4">
          <i class="pi pi-exclamation-triangle !text-3xl" />
          <span v-if="selectedUser" style="font-family: Inter, sans-serif; font-weight: normal">Are you sure that you
            want
            to delete the prompt template?</span>
        </div>
        <div class="p-dialog-footer">
          <Button label="No" icon="pi pi-times" class="flex gap p-button cancel-button" text
            @click="deleteDialogVis = false" />
          <Button label="Yes" icon="pi pi-check" class="flex gap p-button button" @click="deleteUser" />
        </div>
      </div>
    </Dialog>

    <!-- Dialog für neuen Benutzer -->
    <Dialog v-model:visible="dialogVisible" header="Add new User" style="width: 30vw" modal :draggable=false>
      <div class="p-fluid">
        <div class="field flex flex-column">
          <label for="name">Name</label>
          <InputText id="name" v-model="newUser.name" />
        </div>
        <div class="field flex flex-column">
          <label for="role">Role</label>
          <Select id="role" v-model="newUser.role" :options="['admin', 'curator', 'observer']">
          </Select>
        </div>
        <div class="field flex flex-column">
          <label for="password">Password</label>
          <InputText id="password" v-model="newUser.password" />
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
