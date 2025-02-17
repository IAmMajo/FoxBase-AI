---
title: Preview in Konfigurationsseite
---

# Einleitung

Damit die gewählten Farben vor dem abschicken an unsere Datenbank überprüft werden können, macht es Sinn eine Preview zu etablieren, die sich live aktualisiert, um so ein erstes Gefühl für das Ergebnis im Front-End zu liefern.

Dieser Wiki Eintrag hängt zusammen mit den Einträgen über die [Generierung einer komplementären Farbpalette](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/wikis/Front-End/Generierung-einer-komplement%C3%A4ren-Palette) und [Theming](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/wikis/Front-End/Theming) , daher ist es ratsam diese Einträge ebenfalls zu lesen, um ein weitreichendes Verständnis erlangen zu können.

# Theorie

### Warum es Sinn macht die Preview auszulagern und in Komponenten zu unterteilen

In unserem Fall ist die Live Preview eine heruntergebrochene Ansicht des finalen Front Ends. Diese Preview in Komponenten zu unterteilen macht Sinn, weil hierbei sehr viel Code geschrieben werden muss und A um diesen wartbar zu halten und B variable tauschbar zu halten sind Komponenten essenziell.

### Verwenden von Props - Organismen, Moleküle, Atome

Damit die Farben dennoch aus der `konfiguration/index.vue` Datei verwendet werden können, werden Props verwendet. Variablen in einer Komponente, wenn man so will. Hierbei gehe ich nach einem besonderen Modell vor. Die Preview soll aus drei Ebenen bestehen, die über ihre jeweiligen Props miteinander verbunden sind, um so die Farbpalette "zu jedem Element zu tragen". Zur Veranschaulichung nenne ich die drei Ebenen Atome, Moleküle und Organismen. Der Organismus schickt die Farben aus der Palette (Primary, Background, Heading, Text) runter zu den Molekülen, welche auch "Abschnitte" genannt werden könnten (Navbar, ResultCard etc.) und die Moleküle bauen sich aus den Atomen zusammen. Zwar besteht ein Molekül hier nicht zwangsläufig immer aus zwei Atomen, aber der Vergleich reicht aus.

# Implementierung

Ich zeige die Implementierung am Beispiel `PreviewNavbar.vue` .

Die Datei `PreviewNavbar.vue` ist in diesem Fall das Atom und ist wie folgt aufgebaut:

```xml
<script setup lang="ts">
defineProps<{

//// HIER SIND DIE PROPS DEFINIERT
  textColor: string;
  primaryColor: string;
  backgroundColor: string;
  navState: boolean | undefined;
}>();

</script>

<template>
  <nav :style="{backgroundColor: backgroundColor}" class="relative flex t-0">
    <div
      class="darkening-layer-secondary absolute full-size-percent flex jc-space-between-ai-center"
    >
      <div>
        <div style="padding-left: 2vh" class="flex jc-ai-center gap-sm">
          <img class="fox-find-logo-sm" src="./../assets/FoxFindLogo.svg" alt="FoxFind Logo">
          <div class="flex jc-ai-center">
            <h5 :style="{ color: textColor }">FoxSearch</h5>
            <h5 :style="{ color: primaryColor }">AI</h5>
          </div>
        </div>
      </div>
      <div style="padding-right: 2vh">
        <PreviewLightSwitch :navState = navState :primaryColor="primaryColor"/>
      </div>
    </div>
  </nav>
</template>

<style>

.fox-find-logo-sm{
  height: 50px;
  width: 50px;
}
.preview-container-redesign nav {
  width: 100%;
  height: 8vh;
}
</style>
```

Dieses "Atom" wird mit seinen Props dann abermals im "Molekül" `PreviewContainer.vue` aufgerufen und erhält dort das allgemeine Set an Props für die Farben:

```xml
<script setup lang="ts">

/////// HIER SIND DIE PROPS DEFINIERT
  defineProps<{
  Primary: string;
  Background: string;
  Text: string;
  TextSecondary: string;
  buttonState: boolean | undefined;
}>();

</script>

<template>
  <div class="preview-container-redesign relative">
    <PreviewNavbar :navState = buttonState :backgroundColor = "Background" :textColor = "TextSecondary" :primaryColor = "Primary"/>
    <PreviewContent :backgroundColor = "Background" :textColor = "Text" :primaryColor = "Primary"/>
    <PreviewResponse :backgroundColor = "Background" :textColor = "Text" :primaryColor ="Primary"/>
    <PreviewResult :textColor = "Text" :primaryColor="Primary" :textSecondaryColor="TextSecondary" :backgroundColor="Background"/>
    <PreviewResult :textColor = "Text" :primaryColor="Primary" :textSecondaryColor="TextSecondary" :backgroundColor="Background"/>
    <PreviewResult :textColor = "Text" :primaryColor="Primary" :textSecondaryColor="TextSecondary" :backgroundColor="Background"/>
  </div>
</template>

<style>
.preview-container-redesign {
  flex-grow: 1;
  border-radius: 8px;
}
</style>
```

In der `konfiguration/index.vue` muss dem "Molekül" dann nur noch der entsprechende Farbwert vergeben werden. Hier der entsprechende Code Schnipsel dazu (die gesamte Datei ist zu lang):

```xml
 <PreviewContainer
          :Primary="primary"
          :Background="backgroundSecondary"
          :Text="textPrimary"
          :TextSecondary="textSecondary"
          :buttonState = "stringCheckState"
        />
```

Somit entsteht die Logik um Farbwerte und Booleans "nach unten" weiterzugeben.
