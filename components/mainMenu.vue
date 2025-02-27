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
