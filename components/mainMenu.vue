<script setup lang="ts">
import NavListElement from "~/pages/admin/components/NavListElement.vue";
</script>

<template>
  <div class="overflow-y-auto">
    <ul class="list-none p-3 m-0">
      <ul class="list-none p-0 m-0 overflow-hidden">
        <NavListElement title="Dashboard" link="/admin" icon="pi-home" />
        <NavListElement
          title="Konfiguration"
          link="/admin/konfiguration"
          icon="pi-cog"
        />
        <NavListElement title="Katalog" link="/admin/katalog" icon="pi-shop" />
        <NavListElement title="Users" link="/admin/user" icon="pi-user" />
        <NavListElement title="Prompt-Templates" link="/admin/prompt-templates" icon="pi-code" />
        <NavListElement title="Hilfe" link="/admin/help" icon="pi-question" />
      </ul>
    </ul>
  </div>

  <div class="mt-auto">
    <hr class="mb-3 mx-3 border-top-1 border-none surface-border" />
    <a
      v-ripple
      class="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
    >
      <span class="font-bold">Maxine Mustermann</span>
    </a>
  </div>
</template>

<style>
a:link {
  text-decoration: none;
}
</style>
