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
    titleHighlight: {
      type: String,
      required: false,
      default: "",
    },
    image: {
      type: String,
      required: true,
    },
    bottomText: {
      type: String,
      required: false,
      default: "",
    },
  },
};
</script>

<template>
  <div class="text-media-container flex">
    <div class="half-width flex jc-ai-center p-2vw">
      <img class="full-size" :src="image" alt="Image" />
    </div>
    <div class="half-width flex jc-start-ai-center p-2vw">
      <div>
        <h2 class="dark-heading">
          {{ title }} <span class="dark-highlight">{{ titleHighlight }}</span>
        </h2>
        <p class="dark-bottomtext">{{ bottomText }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.text-media-container {
  height: 90vh;
  width: 100%;
  background-color: var(--dark-bg-primary);
}

.text-media-container img {
  height: 80%;
  width: 80%;
}
</style>
