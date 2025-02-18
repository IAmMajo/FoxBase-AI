---
title: Variable Texte im Hero
---

# Einleitung

In diesem Wiki Eintrag soll es darum gehen, wie im Admin Panel auf der Konfigurationsseite das Feature eingebunden werden kann, die Texte im Hero selbst zu konfigurieren.

# Theorie

Das große Problem, was hier gelöst werden soll, lässt sich in drei Unterpunkte unterteilen. **Text entgegen nehmen und in die Datenbank setzen**, **Text im Front End wieder anzeigen** und **Text live auf der Preview aktuell halten**. Gehen wir diese Punkte nacheinander, in der Implementierung durch. Viele der hier thematisierten Konzepte wurden bereits in ihrer Gänze in anderen Einträgen thematisiert. An den entsprechenden Punkten in diesem Artikel, wird die entsprechende Referenz kurz wiedergeben.

# Implementierung

### Text entgegen nehmen und in die Datenbank pushen

Die Konfigurationsseite wurde um Inputfelder erweitert, die es möglich machen den **Top Text** des Heros und den **Bottom Text** des Heros zu konfigurieren. Hierfür wurden die FloatLable Tags aus der [Prime Vue Library ](https://primevue.org/floatlabel/)verwendet.

```xml
<FloatLabel variant="in">
   <InputText
     id="in_label4"
     v-model="heroHighlightTop"
     class="heroset-input"
     variant="filled"
     />
   <label for="in_label4">Hero Highlight Top</label>
</FloatLabel>
```

Da der Großteil des Admin Panels bereits aus Prime Vue Komponenten besteht hat es sich nur angeboten das Designsystem beizubehalten.

Die Texte werden auf dem selben Weg in die Datenbank geladen, wie auch Farben und Booleans. Näheres dazu ist im Eintrag [Datenbank](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/wikis/Back-End/Datenbank) nachzulesen.

### Texte im Front End anzeigen

Im Eintrag [Generierung einer komplementären Farbpalette](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/wikis/Front-End/Generierung-einer-komplement%C3%A4ren-Palette) wird weitreichend thematisiert wie die Daten vom Front End gefetcht werden. Am Beispiel der Inputs werden die Texte über die Komponente `HeroComponent.vue` gefetcht und gesetzt.

```javascript
const { data } = await useFetch<Record<string, string>>("/api/settings");

const settings = ref<Record<string, string>>({});
if (data.value) {
  settings.value = data.value;
}

const heroTextTop = data.value?.heroTextTop;
const heroHighlightTop = data.value?.heroHighlightTop;
const heroTextBottom = data.value?.heroTextBottom;
const heroHighlightBottom = data.value?.heroHighlightBottom;
```

```vue
<p
  id="hero-headline-content"
  class="dark-heading text-shadow header-title no-spacing"
>
   {{ heroTextTop }}
   <span id="hero-headline-highlight" class="dark-highlight">
     {{ heroHighlightTop }}
  </span>
</p>
```

### Live Preview der Demo

Im Wiki Eintrag [Preview der Konfigurationsseite](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/wikis/Front-End/Preview-in-Konfigurationsseite) wurde weitreichend thematisiert, wie das Arbeiten mit Atomen, Molekülen und Organismen funktioniert. Der `value` des Inputs auf der Konfigurationsseite wird bis nach unten zur `PreviewContentComponent.vue` geschoben und dort eingesetzt. So entsteht eine Live Preview für den gesetzten Text.
