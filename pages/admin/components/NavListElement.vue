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

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <li class="nav-list-entry">
    <NuxtLink
      :to="link"
      class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
    >
      <i :class="['pi', icon, 'mr-2']"></i>
      <span class="font-medium">{{ title }}</span>
    </NuxtLink>
  </li>
</template>

<style>
.nav-list-entry {
  margin: 10px 0;
  border-radius: 8px;
}

.nav-list-entry:hover {
  background-color: #ecedf1;
}
</style>
