<script setup lang="ts">
const { data } = await useFetch<Record<string, string>>("/api/settings");
const primary = ref(data.value?.colorPrimary || "#00DC82");
const backgroundSecondary = ref(
  data.value?.colorBackgroundSecondary || "#0F1F31",
);
const textPrimary = ref(data.value?.colorTextPrimary || "#FFFFFF");
const textSecondary = ref(data.value?.colorTextSecondary || "#CBD5E1");

const saveStatus = ref<"sucess" | "error" | null>(null);

async function onSave() {
  const success = await patchSettings({
    colorPrimary: primary.value,
    colorBackgroundSecondary: backgroundSecondary.value,
    colorTextPrimary: textPrimary.value,
    colorTextSecondary: textSecondary.value,
  });

  saveStatus.value = success ? "sucess" : "error";

  setTimeout(() => {
    saveStatus.value = null;
  }, 3000);

  if (success) {
    console.log("Speichern erfolgreich");
  } else {
    console.log("Speichern fehlgeschlagen");
  }
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
          <div class="darkening-layer-secondary absolute full-size-percent"></div>
         
         
          <div>
            <div style="padding-left: 2vh;" class="flex" >
              <h5 :style="{color: textPrimary}">FoxSearch</h5>
              <h5 :style="{color: primary}">AI</h5>            
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
        </div>
        <div class="flex jc-ai-center w-100 mt">
          <button class="p-button bold-text" @click="onSave">Speichern</button>
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

.preview-container nav{
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
