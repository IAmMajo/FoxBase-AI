<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

// Props definieren
let props = defineProps<{ text: string }>();

// Reaktive Zustände
const displayedText = ref(''); // Der Text, der schrittweise angezeigt wird
const plainText = ref(''); // Nur der Textinhalt ohne HTML
const i = ref(0); // Index für die Animation
const speed = 100; // Geschwindigkeit der Animation in Millisekunden

// Funktion für die Typewriter-Animation
function typeWriter() {
  if (i.value < plainText.value.length) {
    displayedText.value += plainText.value.charAt(i.value);
    i.value++;
    setTimeout(typeWriter, speed);
  }
}

// Startet die Animation erst, wenn die Komponente gemountet wird
onMounted(() => {
  displayedText.value = ''; // Leeren, falls nötig
});

// Beobachtet Änderungen am übergebenen Text und startet die Animation neu
watch(
  () => props.text,
  (newText) => {
    plainText.value = newText.replace(/<[^>]*>?/gm, ''); // Nur der reine Text wird animiert
    displayedText.value = ''; // Anzeige zurücksetzen
    i.value = 0; // Index zurücksetzen
    typeWriter(); // Animation starten
  },
  { immediate: true } // Sofort starten
);
</script>

<template>
  <div class="response-container flex jc-ai-center relative">
    <div class="darkening-layer-secondary full-size-percent absolute z-0"></div>
    <div class="response-box flex jc-ai-center dark-subheading relative">
      <div class="shade-layer absolute full-size-percent"></div>
      <!-- Animierter Text mit HTML-Inhalt -->
      <div class="dark-subheading color-response-card z-2" v-html="displayedText" />
    </div>
  </div>
</template>

<style>
.response-box {
  border: 2px solid var(--dark-primary);
  padding: var(--gap);
  width: 65vw;
  min-height: 12vh;
  border-radius: var(--border-radius-default);
}

html.light .response-box {
  border: 2px solid var(--light-primary);
  padding: var(--gap);
  width: 65vw;
  min-height: 12vh;
  border-radius: var(--border-radius-default);
}

.shade-layer {
  background-color: var(--dark-primary);
  opacity: 5%;
}

html.light .shade-layer {
  background-color: var(--light-primary);
  opacity: 5%;
}

.response-container {
  height: auto;
  min-height: 12vh;
  padding: 5vh;
  background-color: var(--dark-bg-secondary);
}

html.light .response-container {
  height: auto;
  min-height: 12vh;
  padding: 5vh;
  background-color: var(--light-bg-secondary);
}

.response-header {
  background-color: var(--dark-bg-secondary);
}

html.light .response-header {
  background-color: var(--light-bg-secondary);
}

.color-response-card {
  font-family: "asap", sans-serif;
  color: var(--dark-text-secondary);
}

html.light .color-response-card {
  font-family: "asap", sans-serif;
  color: var(--light-text-secondary);
}

@media (max-width: 1000px) {
  .response-container {
    padding: 3vh;
  }

  .response-box {
    width: 95vw;
  }
}

@media (max-width: 746px) {
  .response-container {
    padding: 3vh;
  }

  .response-box {
    width: 95vw;
  }
}

@media (max-width: 360px) {
  .response-container {
    padding: 1vh;
  }
}

@media (max-width: 340px) {
}
</style>