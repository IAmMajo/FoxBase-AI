<script setup lang="ts">
import { ref } from "vue";
import { Dialog, InputText, Button, Select } from "primevue";

interface User {
  id: number;
  name: string;
  role: string;
}

const errorMessage = ref<string | null>(null);

const users = ref<User[]>([]);
const deleteDialogVis = ref(false);
const updateDialogVis = ref(false);
const dialogVisible = ref(false); // Controlls dialog visibility
const newUser = ref({
  name: "Max Musterman",
  role: "admin",
  password: "Password",
}); // Temporary Data for new Entry
const selectedUser = ref<User | null>(null);

const changeRole = ref(false);
const changeUsername = ref(false);
const changePassword = ref(false);
const updateUser = ref({
  name: "Max Musterman",
  role: "admin",
  password: "Password",
});
const updateID = ref(0);
const changeErrorMessage = ref("");

async function addUser() {
  if (newUser.value!.name && newUser.value!.role && newUser.value!.password) {
    const fetchResult = await fetch(`/api/users`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: newUser.value.name,
        password: newUser.value.password,
        role: newUser.value.role,
      }),
    });
    if (!fetchResult.ok) {
      errorMessage.value = fetchResult.statusText;
      return;
    }
    const createdUser = fetchResult.json() as Promise<User>;
    users.value = users.value!.filter(
      async (p) => p.id !== (await createdUser).id,
    );
    users.value?.push(await { ...createdUser });
    dialogVisible.value = false;
    errorMessage.value = null;
  } else {
    errorMessage.value = ("Please fill all fields!");
  }
}

fillUserTable();

async function fillUserTable() {
  users.value = await fetch(`/api/users`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((json) => json.json() as Promise<User[]>);
}

const confirmDeleteUser = (user: User) => {
  selectedUser.value = user;
  deleteDialogVis.value = true;
};



const deleteUser = async () => {
  deleteDialogVis.value = false;
  if (!(await deleteUserDB(selectedUser.value!.id))) {
    return;
  }
  users.value = users.value!.filter((p) => p.id !== selectedUser.value!.id);
  selectedUser.value = null;
};
async function deleteUserDB(id: number) {
  const response = await fetch(`/api/users/`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id }),
  });
  return response.ok;
}

const editUser = async () => {
  changeErrorMessage.value = "";
  if (changeUsername.value) {
    const response = await fetch(`/api/users/admin/change-name`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: updateID.value,
        newName: updateUser.value.name
      }),
    });

    
    if (!response.ok) {
      changeErrorMessage.value += response.statusText + "\n";
    }
  }

  if (changeRole.value) {

    const response = await fetch(`/api/users/admin/change-role`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: updateID.value,
        newRole: updateUser.value.role
      }),
    });
    if (!response.ok) {
      changeErrorMessage.value += response.statusText + "\n";
    }
  }

  if (changePassword.value) {
    const response = await fetch(`/api/users/admin/change-password`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: updateID.value,
        newPassword: updateUser.value.password
      }),
    });

    if (!response.ok) {
      changeErrorMessage.value += response.statusText;
    }

  }
  if (changeErrorMessage.value == "") {
    updateDialogVis.value = false;
  }
}

</script>

<template>
  <div>
    <!-- Titel -->
    <h2>User Configuration</h2>

    <!-- Buttons für Upload und Hinzufügen -->
    <div style="margin-bottom: 1rem; display: flex; gap: 1rem">
      <Button label="Add User" style="border: 1px solid transparent" class="upload-button button"
        @click="dialogVisible = true" />
      <Button label="Update User" style="border: 1px solid transparent" class="upload-button button"
        @click="updateDialogVis = true" />
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

    <!--- Dialog to update users --->
    <Dialog v-model:visible="updateDialogVis" :style="{ width: '450px' }" header="What do you want to change?"
      :modal="true">
      <div class="flex flex-column gap">
        <label for="chID">Username</label>
        <InputNumber id="chID" v-model="updateID" :style="{ width: '20px' }" />
        <div class="field flex flex-column">
          <div class=" flex flex-row">
            <label for="chName">Username</label>
            <input type="checkbox" v-model="changeUsername" />
          </div>
          <InputText v-if="changeUsername" id="chName" v-model="updateUser.name" />
        </div>
        <div class="field flex flex-column">
          <div class=" flex flex-row">
            <label for="chRole">Role</label>
            <input type="checkbox" v-model="changeRole" />
          </div>
          <Select v-if="changeRole" id="chRole" v-model="updateUser.role" :options="['admin', 'curator', 'observer']">
          </Select>
        </div>
        <div class="field flex flex-column">
          <div class=" flex flex-row">
            <label for="chName">Password</label>
            <input type="checkbox" v-model="changePassword" />
          </div>
          <Password v-if="changePassword" id="password" v-model="updateUser.password" :toggle-mask="true" />
        </div>
        <p v-if="changeErrorMessage" class="error">{{ changeErrorMessage }}</p>
        <div class="p-dialog-footer">
          <Button label="Cancel" icon="pi pi-times" class="flex gap p-button cancel-button" text
            @click="updateDialogVis = false" />
          <Button label="Confirm" icon="pi pi-check" class="flex gap p-button button" @click="editUser" />
        </div>
      </div>
    </Dialog>

    <!-- Dialog to delete User-->
    <Dialog v-model:visible="deleteDialogVis" :style="{ width: '450px' }" header="Confirm" :modal="true">
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
    <Dialog v-model:visible="dialogVisible" header="Add new User" style="width: 30vw" modal :draggable="false">
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
          <Password id="password" v-model="newUser.password" :toggle-mask="true" />
        </div>
      </div>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <div class="p-dialog-footer">
        <Button label="Cancel" icon="pi pi-times" class="flex gap p-button cancel-button" text
          @click="dialogVisible = false" />
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
