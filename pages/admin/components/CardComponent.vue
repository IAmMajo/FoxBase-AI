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
    value: {
      type: String,
      required: true,
    },
    bottomValue: {
      type: String,
      required: true,
    },
    bottomText: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: false,
      default: "pi-shopping-cart",
    },
  },
};
</script>

<template>
  <div class="surface-card box-shadow p-3 br-default">
    <div class="flex jc-space-between-ai-start mb-3">
      <div>
        <span class="block text-lg font-semibold mb-3">
          <b>{{ title }}</b></span
        >
        <div class="text-xl">{{ value }}</div>
      </div>
      <div class="icon-container flex jc-ai-center">
        <i :class="['pi', icon, 'text-xl']"></i>
      </div>
    </div>
    <span>{{ bottomValue }}</span>
    <span>{{ bottomText }}</span>
  </div>
</template>

<style>
.surface-card {
  min-width: 18vw;
}

.icon-container {
  width: 3rem;
  height: 3rem;
  background-color: #00dc8020;
  color: var(--dark-primary);
  border-radius: 8px;
}
</style>
