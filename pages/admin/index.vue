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

<script setup lang="ts">
import { ref } from "vue";
const { data } = await useFetch<Record<string, string>>("/api/settings");

// Dark Mode Constants
const primary = ref(hslToHex(data.value?.colorPrimary) || "#00DC82");
const backgroundSecondary = ref(
  hslToHex(data.value?.colorBackgroundSecondary) || "#0F1F31",
);
const textPrimary = ref(hslToHex(data.value?.colorTextPrimary) || "#FFFFFF");
const textSecondary = ref(
  hslToHex(data.value?.colorTextSecondary) || "#CBD5E1",
);

// Light Mode Constants
const lightPrimary = ref(
  hslToHex(generateComplementaryColor(data.value?.colorPrimary)),
);
const lightBackground = ref(
  hslToHex(generateComplementaryColor(data.value?.colorBackgroundSecondary)),
);
const lightTextPrimary = ref(
  hslToHex(generateComplementaryColor(data.value?.colorTextPrimary)),
);
const lightTextSecondary = ref(
  hslToHex(generateComplementaryColor(data.value?.colorTextSecondary)),
);

// Checkbox State, um den Button im FE anzuzeigen, oder nicht
const checkState = ref(data.value?.showPaletteSwitch);
let stringCheckState = stringToBoolean(checkState); // eslint-disable-line

// Speichern der Hero Texte
const heroTextTop = ref(data.value?.heroTextTop || "");
const heroTextBottom = ref(data.value?.heroTextBottom || "");
const heroHighlightTop = ref(data.value?.heroHighlightTop || "");
const heroHighlightBottom = ref(data.value?.heroHighlightBottom || "");

// Speichern und pushen in die Datenbank
const saveStatus = ref<"sucess" | "error" | null>(null);

async function onSave() {
  const success = await patchSettings({
    // Dark Mode Colors
    colorPrimary: hexToHsl(primary.value),
    colorBackgroundSecondary: hexToHsl(backgroundSecondary.value),
    colorTextPrimary: hexToHsl(textPrimary.value),
    colorTextSecondary: hexToHsl(textSecondary.value),

    // Light Mode Colors
    colorLightPrimary: hexToHsl(lightPrimary.value),
    colorLightBackground: hexToHsl(lightBackground.value),
    colorLightTextPrimary: hexToHsl(lightTextPrimary.value),
    colorlightTextSecondary: hexToHsl(lightTextSecondary.value),

    // Check, ob der Button im FE angezeigt werden soll
    showPaletteSwitch: boolToString(stringCheckState),

    // Hero Texts
    heroTextTop: heroTextTop?.value,
    heroHighlightTop: heroHighlightTop?.value,
    heroTextBottom: heroTextBottom?.value,
    heroHighlightBottom: heroHighlightBottom?.value,
  });

  saveStatus.value = success ? "sucess" : "error";

  setTimeout(() => {
    saveStatus.value = null;
  }, 3000);

  location.reload();
}
</script>

<template>
  <div class="no-y-scroll">
    <div>
      <h2>Configuration</h2>
      <p>
        On this page changes about the content of the hero and the color palette
        can be made.
      </p>

      <h3>Preview</h3>
      <div class="flex jc-center-ai-start gap">
        <PreviewContainer
          :primary="primary"
          :background="backgroundSecondary"
          :text="textPrimary"
          :text-secondary="textSecondary"
          :button-state="stringCheckState"
          :top-text="heroTextTop"
          :bottom-text="heroTextBottom"
          :top-highlight="heroHighlightTop"
          :bottom-highlight="heroHighlightBottom"
        />

        <div class="flex jc-ai-center flex-column" style="width: 22%">
          <h5>Text in Hero Component</h5>
          <form action="" style="width: 100%">
            <div class="heroset-input-container">
              <FloatLabel variant="in">
                <InputText
                  id="in_label1"
                  v-model="heroTextTop"
                  class="heroset-input"
                  variant="filled"
                  maxlength="46"
                />
                <label for="in_label1">Hero Top</label>
              </FloatLabel>

              <FloatLabel variant="in">
                <InputText
                  id="in_label4"
                  v-model="heroHighlightTop"
                  class="heroset-input"
                  variant="filled"
                  maxlength="18"
                />
                <label for="in_label4">Hero Highlight Top</label>
              </FloatLabel>
            </div>

            <div class="mt heroset-input-container">
              <FloatLabel variant="in">
                <InputText
                  id="in_label2"
                  v-model="heroTextBottom"
                  class="heroset-input"
                  variant="filled"
                  maxlength="56"
                />
                <label for="in_label2">Hero Bottom</label>
              </FloatLabel>

              <FloatLabel variant="in">
                <InputText
                  id="in_label3"
                  v-model="heroHighlightBottom"
                  class="heroset-input"
                  variant="filled"
                  maxlength="22"
                />
                <label for="in_label3">Hero Highlight Bottom</label>
              </FloatLabel>
            </div>
          </form>

          <h5>Color Palette</h5>
          <div class="flex jc-ai-center gap flex-wrap">
            <div class="flex flex-column jc-ai-center color-field">
              <input id="primary" v-model="primary" type="color" />
              <label for="primary">Primary</label>
            </div>

            <div class="flex flex-column jc-ai-center color-field">
              <input
                id="backgroundSecondary"
                v-model="backgroundSecondary"
                type="color"
              />

              <label for="backgroundSecondary">Background</label>
            </div>

            <div class="flex flex-column jc-ai-center color-field">
              <input id="textPrimary" v-model="textPrimary" type="color" />
              <label for="textPrimary">Headings</label>
            </div>

            <div class="flex flex-column jc-ai-center color-field">
              <input id="textSecondary" v-model="textSecondary" type="color" />
              <label for="textSecondary">Text</label>
            </div>

            <div class="flex flex-column jc-ai-center color-field">
              <input id="textSecondary" v-model="lightPrimary" type="color" />
              <label for="textSecondary">Light Primary</label>
            </div>

            <div class="flex flex-column jc-ai-center color-field">
              <input
                id="textSecondary"
                v-model="lightBackground"
                type="color"
              />
              <label for="textSecondary">Light Background</label>
            </div>

            <div class="flex flex-column jc-ai-center color-field">
              <input
                id="textSecondary"
                v-model="lightTextPrimary"
                type="color"
              />
              <label for="textSecondary">Light Heading</label>
            </div>

            <div class="flex flex-column jc-ai-center color-field">
              <input
                id="textSecondary"
                v-model="lightTextSecondary"
                type="color"
              />
              <label for="textSecondary">Light Text</label>
            </div>

            <div class="full-width checkbox-container">
              <div class="flex gap jc-start-ai-center">
                <input
                  v-model="stringCheckState"
                  name="Lightmode"
                  type="checkbox"
                />
                <label for="Lightmode">Switch Button</label>
              </div>
              <p>
                When enabled, the user can switch between the generated Light
                and Dark Palette over a button inside of the Navbar.
              </p>
            </div>
          </div>
          <div class="flex jc-ai-center w-100 mt">
            <button
              style="border: 1px solid transparent"
              class="upload-button button bold-text"
              @click="onSave"
            >
              Save changes
            </button>
          </div>
          <div>
            <p>
              In the current version "Save Changes" has to be clicked twice, due
              to database issues.
            </p>
          </div>
          <div class="confirm-container mt">
            <div
              v-if="saveStatus === 'sucess'"
              data-aos="fade-up"
              class="confirm-green flex jc-ai-center"
            >
              <div class="icon-container flex jc-ai-center">
                <div class="green-icon pi pi-check text-xl"></div>
              </div>
              <p class="flex-grow text-center">Saving Successful</p>
            </div>

            <div
              v-if="saveStatus === 'error'"
              data-aos="fade-up"
              class="confirm-red flex jc-ai-center"
            >
              <div class="icon-container-red flex jc-ai-center">
                <div class="red-icon pi pi-times text-xl"></div>
              </div>
              <p class="flex-grow text-center">Error while Saving</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.no-y-scroll {
  overflow-x: hidden;
}

.p-floatlabel {
  width: 100%;
}

.heroset-input-container {
  width: 100%;
}

.heroset-input-container label {
  font-size: 16px;
}

.heroset-input {
  width: 100%;
}

input[type="checkbox"] {
  width: 20px;
  height: 20px;
}

input[type="checkbox"]:hover {
  cursor: pointer;
}

.checkbox-container label {
  font-size: 18px;
}

.dot {
  height: 10px;
  width: 10px;
}

.green-icon {
  color: #00dc82;
}
.red-icon {
  color: #dc0025;
}

.icon-container-red {
  width: 3rem;
  height: 3rem;
  background-color: #dc002520;
  border-radius: 8px;
}

.confirm-green {
  background-color: #00dc802c;
  height: 50%;
  width: 100%;
  border: 1px solid #00dc80;
  padding: 14px 12px;
  border-radius: var(--border-radius-default);
}

.confirm-red {
  background-color: #dc00252c;
  height: 50%;
  width: 100%;
  border: 1px solid #dc0025;
  padding: 14px 12px;
  border-radius: var(--border-radius-default);
}

.confirm-container {
  height: 15vh;
  width: 100%;
}

.nav-preview-content-container {
  flex-grow: 1;
  text-align: center;
}

.nav-preview-content-container p {
  width: 80%;
}

.button-preview {
  margin-top: 20px;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  color: var(--light-text-primary);
  cursor: pointer;
}

.rounded {
  border-radius: var(--border-radius-full);
}

.preview-container {
  height: 70vh;
  width: 75%;
  border-radius: var(--border-radius-default);
  box-shadow: var(--box-shadow);
}

.preview-container nav {
  width: 100%;
  height: 10%;
  background-color: var(--dark-bg-seconndary);
}

.preview-container nav button {
  height: 60%;
  padding: 0 22px;
  margin-right: 2vh;
  border-radius: 6px;
  border: none;
  font-weight: 500;
  cursor: pointer;
}

.color-field {
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.color-field label {
  font-size: 16px;
}

input[type="color"] {
  width: 50px;
  height: 50px;
  border: none;
  cursor: pointer;
}
</style>
