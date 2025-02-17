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
  <form class="flex preview-form" action="">
    <input type="text" />
    <button class="preview-send-btn">
      <i class="pi pi-search"></i>
    </button>
  </form>
</template>

<style>
.preview-form * {
  background-color: rgb(65, 66, 66);
  color: white;
}

.preview-form button {
  width: 70px;
  border-top-right-radius: 1000px;
  border-bottom-right-radius: 1000px;
  border: none;
}

.preview-form input {
  height: 65px;
  font-size: 18px;
  padding-left: 20px;
  border-top-left-radius: 10000px;
  border-bottom-left-radius: 10000px;
  border: none;
}
.preview-form input:focus {
  outline: none;
}

.preview-form i {
  width: 100%;
  font-size: 20px;
}
</style>
