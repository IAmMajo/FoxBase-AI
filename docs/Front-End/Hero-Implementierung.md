---
title: Hero Implementierung
---

# Einleitung

In diesem Wiki Eintrag wird thematisiert, wie der Hero des Front Ends umgesetzt und implementiert wurde. Der Hero ist der Dreh- und Angelpunkt unserer Anwendung, der User soll hier die Kernfunktion der Seite verwenden. Entsprechend sollte diese Sektion auch die schönste und ansprechenste der Seite sein. Dieser Eintrag ist in drei Kernsektionen unterteilt. **Den Wellen**, der **Searchbar** und den **Prompt Templates**. Ich werde die Funktionalität nicht in diesem Eintrag thematisieren, das ist Teil der entsprechenden Back End Sektion. Des Weiteren baut dieser Artikel auf dem Design Artikel zum Thema[ Hero Design](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/wikis/Figma/Hero-Design) auf.

# Die Wellen

Die Wellen sollen für das gewisse Etwas des Heros sorgen. Der root Container des Heros ist `relativ positioniert`, so können die Wellen `absolut positioniert` werden und so kann über `top` und `bottom` die entsprechende Position der Welle gesetzt werden. Bewegen können sich die Wellen über `transform` und `transition` in Kombination mit Keyframes.

```xml
  <div class="relative">
    <div class="darkening-layer" />

    <div class="absolute z-negative-2 t-0 l-0 full-size">
      <div class="waves" />
    </div>
```

```css
.waves {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 400px;
  background: var(--dark-primary);
  box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.5);
  transition: 50ms;
}

@keyframes waves {
  0% {
    transform: translate(-50%, -75%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -75%) rotate(360deg);
  }
}
```

# Die Searchbar

Die Searchbar ist ein abgewandeltes Formular und leitet den Input an unser Back End weiter.

```xml
<form
    class="searchbar-container flex"
    action=""
    @submit.prevent="$emit('searchSubmit')"
  >
    <input
      class="searchbar-input"
      type="text"
      placeholder="Suche..."
      :value="query"
      @input="$emit('searchInput', $event)"
    />
    <button type="submit" class="submit-btn flex jc-ai-center">
      <MagnifyingGlassIcon class="searchbar-icon" />
    </button>
  </form>
```

# Prompt Templates

Mit den VueJS Paradigmen `v-for` und `v-if` lässt sich die Liste an Prompt Templates über der Searchbar rendern.

```vue
<script setup lang="ts">
const { prompts } = defineProps<{
  prompts: string[];
}>();
defineEmits(["promptClick"]);
</script>

<template>
  <div v-if="prompts.length" class="prompt-suggestions flex gap">
    <input
      v-for="(prompt, index) in prompts"
      :key="index"
      class="dark-subheading bg-secondary"
      type="button"
      :value="prompt"
      @click="$emit('promptClick', $event)"
    />
  </div>
</template>

<style scoped>
.prompt-suggestions {
  overflow: auto;
}
input {
  padding: 8px 16px;
  font-size: 16px;
  border-radius: var(--border-radius-full);
  white-space: nowrap;
  font-family: "asap", sans-serif;
  border-style: none;
}
</style>
```
