<script setup lang="ts">
import NavListElement from "~/pages/admin/components/NavListElement.vue";
</script>

<template>
  <div class="overflow-y-auto">
    <ul class="list-none p-3 m-0">
      <ul class="list-none p-0 m-0 overflow-hidden">
        <NavListElement title="Configuration" link="/admin" icon="pi-cog" />
        <NavListElement title="Catalog" link="/admin/catalog" icon="pi-shop" />
        <NavListElement title="Users" link="/admin/user" icon="pi-user" />
        <NavListElement
          title="Prompt Templates"
          link="/admin/prompt-templates"
          icon="pi-code"
        />
      </ul>
    </ul>
  </div>

  <AuthState v-slot="{ user }">
    <div class="mt-auto">
      <hr class="mb-3 mx-3 border-top-1 border-none surface-border" />
      <div class="m-3 p-3">
        <span class="font-bold">{{ user.username }}</span>
      </div>
    </div>
  </AuthState>
</template>

<style>
a:link {
  text-decoration: none;
}
</style>
