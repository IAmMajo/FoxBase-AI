<script lang="ts" setup>
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import type { MenuItem } from "primevue/menuitem";
import { ref } from "vue";

const menuProfile = ref();
const menuMain = ref(false);
const menuMainMobile = ref(false);

const menuProfileItems = ref<MenuItem[]>([
  {
    label: "Profil",
    items: [
      {
        label: "Change password",
        icon: "pi pi-key",
        route: "/admin/change-password",
      },
      {
        label: "Logout",
        icon: "pi pi-sign-out",
        command: async () => {
          await useUserSession().clear();
          navigateTo("/admin/login");
        },
      },
    ],
  },
]);

onMounted(() => {
  if (window.innerWidth < 768) {
    menuMain.value = false;
  } else {
    menuMain.value = true;
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth < 768) {
      menuMain.value = false;
    } else {
      menuMain.value = true;
    }
  });
});

const toggleMenuProfile = (event: MouseEvent) => {
  menuProfile.value.toggle(event);
};
</script>

<template>
  <div>
    <Menubar>
      <template #start>
        <div class="hidden md:block">
          <div class="flex flex-row flex-wrap">
            <div class="w-15rem flex align-items-center flex-wrap">
              <img
                class="fox-find-logo"
                src="./../assets/FoxFindLogo.svg"
                alt="fox logo"
                width="35"
                heigt="40"
                viewBox="0 0 35 40"
              />
              <span class="font-semibold text-2xl text-primary">
                FoxBase AI
              </span>
            </div>

            <div class="flex jc-ai-center">
              <Button
                icon="pi pi-bars"
                severity="secondary"
                aria-label="Bookmark"
                text
                @click="menuMain = !menuMain"
              />
            </div>
          </div>
        </div>

        <div class="block md:hidden">
          <div class="grid">
            <div class="col-fixed" style="width: 35px">
              <Button
                icon="pi pi-bars"
                severity="secondary"
                aria-label="Bookmark"
                text
                @click="menuMainMobile = !menuMainMobile"
              />
            </div>

            <div class="col flex align-items-center justify-content-center">
              <img
                class="fox-find-logo"
                src="./../assets/FoxFindLogo.svg"
                alt="fox logo"
                width="35"
                heigt="40"
                viewBox="0 0 35 40"
              />
              <span class="font-semibold text-2xl text-primary">
                FoxBase AI
              </span>
            </div>
          </div>
        </div>
      </template>

      <template #end>
        <div class="flex align-items-center gap-2">
          <span
            class="pi pi-user"
            aria-haspopup="true"
            aria-controls="overlay_menu"
            @click="toggleMenuProfile"
          />
          <Menu
            id="overlay_menu"
            ref="menuProfile"
            :model="menuProfileItems"
            :popup="true"
          >
            <template #item="{ item, props }">
              <NuxtLink
                v-if="item.route"
                v-slot="{ href, navigate }"
                :to="item.route"
                custom
              >
                <Button
                  class="justify-content-start"
                  as="a"
                  link
                  v-ripple
                  :href="href"
                  v-bind="props.action"
                  @click="navigate"
                >
                  <span :class="item.icon" />
                  <span class="ml-2">{{ item.label }}</span>
                </Button>
              </NuxtLink>
              <Button v-if="!item.route" link v-ripple v-bind="props.action">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
              </Button>
            </template>
          </Menu>
        </div>
      </template>
    </Menubar>

    <Sidebar
      v-model:visible="menuMain"
      :modal="false"
      :dismissable="false"
      :base-z-index="100"
    >
      <div class="flex flex-column h-full">
        <mainMenu />
      </div>
    </Sidebar>

    <Sidebar v-model:visible="menuMainMobile" :base-z-index="1001">
      <template #container="{ closeCallback }">
        <div class="flex flex-column h-full">
          <div
            class="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0"
          >
            <span class="inline-flex align-items-center gap-2">
              <img
                class="fox-find-logo"
                src="./../assets/FoxFindLogo.svg"
                alt="fox logo"
                width="35"
                heigt="40"
                viewBox="0 0 35 40"
              />
              <span class="font-semibold text-2xl text-primary"
                >Foxbase AI</span
              >
              <Button
                type="button"
                icon="pi pi-times"
                rounded
                outlined
                class="h-2rem w-2rem"
                @click="closeCallback"
              ></Button>
            </span>
          </div>
          <mainMenu />
        </div>
      </template>
    </Sidebar>

    <div
      class="py-6 pr-3 md:pr-6"
      :class="menuMain ? 'container-main' : 'pl-3 md:pl-6'"
    >
      <NuxtPage />
    </div>
  </div>
</template>

<style>
html {
  font-size: 14px;
}

.p-drawer {
  font-family: "Asap", sans-serif;
  font-weight: 600;
}

.p-menubar {
  font-family: "Asap", sans-serif;
  font-weight: 600;
  padding: 0.5rem 2rem;
  position: sticky;
  z-index: 1000;
  background: var(--surface-100);
  border: none;
}

.p-sidebar {
  background: var(--surface-300);
  border: none;
}
.container-main {
  font-family: "Asap", sans-serif;
  font-weight: 600;
  padding-left: 22.5rem;
}

@media screen and (max-width: 768px) {
  .p-menubar {
    padding: 0.5rem 1rem;
  }
  .p-menubar-start {
    width: 90%;
  }
}
</style>
