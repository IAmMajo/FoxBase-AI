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
const stringCheckState = stringToBoolean(checkState);
console.log("CheckState " + checkState.value);
console.log("StringCheckState " + stringCheckState);

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
  });

  saveStatus.value = success ? "sucess" : "error";

  setTimeout(() => {
    saveStatus.value = null;
  }, 3000);
}
</script>

<template>
  <div>
    <h2>Konfiguration</h2>
    <p>
      Auf dieser Seite können Konfigurationen über das Aussehen und Verhalten
      der Seite festgelegt werden.
    </p>

    <h3>Preview</h3>

    <div class="flex gap">
      <div
        class="preview-container flex flex-column jc-start-ai-center relative z-1"
        :style="{ backgroundColor: backgroundSecondary }"
      >
        <nav class="relative flex jc-space-between-ai-center relative t-0">
          <div
            class="darkening-layer-secondary absolute full-size-percent"
          ></div>

          <div>
            <div style="padding-left: 2vh" class="flex">
              <h5 :style="{ color: textPrimary }">FoxSearch</h5>
              <h5 :style="{ color: primary }">AI</h5>
            </div>
          </div>
          <button
            class="flex jc-ai-center"
            :style="{ backgroundColor: primary, height: '50%' }"
          >
            <p>Test</p>
          </button>
        </nav>

        <div
          class="nav-preview-content-container flex flex-column jc-ai-center"
        >
          <h2 :style="{ color: textPrimary }">Das ist der Titel</h2>
          <p :style="{ color: textSecondary }">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque,
            sequi eligendi modi minus veritatis quasi. Est veniam at laborum,
            excepturi eum natus dolorum velit repudiandae. Laudantium quas
            provident ab facilis quos culpa, impedit deleniti atque cupiditate
            eos iure, totam officia reprehenderit vitae sint odio quis qui aut
            pariatur consequatur placeat consequuntur, harum facere inventore.
            Ullam nihil unde corrupti quidem quo.
          </p>
          <div class="flex jc-ai-center gap">
            <button
              class="button-preview rounded"
              :style="{ backgroundColor: primary }"
            >
              Das ist ein runder Button
            </button>
            <button
              class="button-preview"
              :style="{ backgroundColor: primary }"
            >
              Das ist ein eckiger Button
            </button>
          </div>
        </div>
      </div>

      <div class="flex jc-ai-center flex-column" style="width: 22%">
        <h5>Farbpalette</h5>
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

            <label for="backgroundSecondary">Hintergrund</label>
          </div>

          <div class="flex flex-column jc-ai-center color-field">
            <input id="textPrimary" v-model="textPrimary" type="color" />
            <label for="textPrimary">Überschriften</label>
          </div>

          <div class="flex flex-column jc-ai-center color-field">
            <input id="textSecondary" v-model="textSecondary" type="color" />
            <label for="textSecondary">Texte</label>
          </div>

          <div class="flex flex-column jc-ai-center color-field">
            <input id="textSecondary" v-model="lightPrimary" type="color" />
            <label for="textSecondary">Light Primary</label>
          </div>

          <div class="flex flex-column jc-ai-center color-field">
            <input id="textSecondary" v-model="lightBackground" type="color" />
            <label for="textSecondary">Light Background</label>
          </div>

          <div class="flex flex-column jc-ai-center color-field">
            <input id="textSecondary" v-model="lightTextPrimary" type="color" />
            <label for="textSecondary">Light Überschriften</label>
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
              <label for="Lightmode">Wechselbutton</label>
            </div>
            <p>
              Wird diese Funktion aktiviert, haben die User die Möglichkeit über
              die Navbar die Farbpalette zu wechseln.
            </p>
          </div>
        </div>
        <div class="flex jc-ai-center w-100 mt">
          <button
            style="border: 1px solid transparent"
            class="upload-button button bold-text"
            @click="onSave"
          >
            Speichern
          </button>
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
            <p class="flex-grow text-center">Speichern erfolgreich</p>
          </div>

          <div
            v-if="saveStatus === 'error'"
            data-aos="fade-up"
            class="confirm-red flex jc-ai-center"
          >
            <div class="icon-container-red flex jc-ai-center">
              <div class="red-icon pi pi-times text-xl"></div>
            </div>
            <p class="flex-grow text-center">Speichern fehlgeschlagen</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
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
