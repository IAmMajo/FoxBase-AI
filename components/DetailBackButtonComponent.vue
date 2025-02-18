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

<script></script>

<template>
  <div>
    <div class="flex jc-ai-center">
      <NuxtLink to="/">
        <i class="detail-back-button pi pi-angle-left"></i>
      </NuxtLink>
      <p class="back-button-text">Zurück zur Startseite</p>
    </div>
  </div>
</template>

<style>
.back-button-text {
  color: var(--dark-bg-secondary);
  white-space: nowrap;
  transition: 0.5s ease;
}

html.light .back-button-text {
  color: var(--light-bg-secondary);
  white-space: nowrap;
}

.detail-back-button {
  color: var(--dark-text-secondary);
  font-size: 26px;
}

html.light .detail-back-button {
  color: var(--light-text-primary);
  font-size: 26px;
}

a:hover + .back-button-text {
  color: var(--dark-text-secondary);
}

html.light a:hover + .back-button-text {
  color: var(--light-text-primary);
}
</style>
