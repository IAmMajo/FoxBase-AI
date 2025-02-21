---
title: Suchergebnisse - ResultCardsComponent.vue, ResultCardComponent.vue
---

# Dokumentation der Datei `ResultCardsComponent.vue`

## Einleitung

Die `ResultCardsComponent.vue` Datei beinhaltet eine Liste von `ResultCardComponent`-Komponenten, die jeweils ein Suchergebnis in der FoxSearchAI-Anwendung darstellen. Letztendlich werden alle Suchergebnisse angezeigt und auf der Seite durch ein responsive Design dynamisch auf die Bildschirmgröße angepasst.

## Wichtige Bestandteile

### 1. **Template-Bereich (`<template>`)**

In einem Result-Container wird eine Liste an `ResultCardComponent`-Komponenten dargestellt.
Jede `ResultCardComponent` stellt ein Produkt aus der `products`-Liste dar und gibt alle nötigen Informationen an die `ResultCardComponent` weiter, um die Produktinformationen zu visualisieren.

### 2. **Script-Bereich (`<script setup lang="ts">`)**

Hier wird die Produktliste mit `defineProps` definiert und in `products` gespeichert.

### 3. **Style-Bereich (`<style>`)**

- Enthält **CSS-Anpassungen** für das Layout, insbesondere:
  - Zentrierung der Suchergebnisliste.
  - Hintergrundfarbe der Seite

# Dokumentation der Datei `ResultCardComponent.vue`

## Einleitung

Die `ResultCardComponent.vue` Datei stellt ein Produkt (in einer Produktliste der übergeordneten Komponente) dar. Das Design ist responsive, beim Anklicken eines Produkts wird man zur dessen Detailseite weitergeleitet und mit den Pfeil-Buttons kann der Benutzer bewerten, wie gut das Produkt zu der Suchanfrage passt.

## Wichtige Bestandteile

### 1. **Template-Bereich (`<template>`)**

- Enthält die Struktur der Ergebnis-Card.
- Stellt Produktinformationen dar.
- Enthält Steuerungselemente für Benutzerinteraktionen (z. B. Up-/Downvotes).

**Besondere Aspekte:**

- Verwendung von Vue-Direktiven (v-if, v-bind, v-on), um Inhalte bedingt anzuzeigen und Interaktionen zu ermöglichen.
- Die Card ist interaktiv und ermöglicht Up- und Downvotes.
- Es wird sichergestellt, dass Labels basierend auf der score-Eigenschaft dynamisch aktualisiert werden.

### 2. **Script-Bereich (`<script setup lang="ts">`)**

- Definiert die Eigenschaften eines Produkts (`product`), die von der übergeordneten Komponente übergeben werden.
- Enthält reaktive Zustände (`ref`) für Benutzerinteraktionen.
  - `isLiked` und `isDisliked` werden verwendet, um den Zustand der Benutzerbewertung zu verfolgen.
- Funktionen wie `onArrowUpClicked()` und `onArrowDownClicked()` setzen gezielt Zustände und sorgen für eine reaktive UI-Aktualisierung.
- `query` und `q` sorgen dafür, dass die korrekte Benutzerbewertung für ein Produkt erfasst wird.

### 3. **Style-Bereich (`<style>`)**

- Enthält **CSS-Anpassungen** für das Layout, insbesondere:
  - Farbgestaltung im Einklang mit dem Design der Anwendung.
  - CSS-Klassen werden basierend auf den Zuständen (`isLiked`, `isDisliked`) dynamisch zugewiesen.
  - CSS-Klassen reagieren on `hover`, um das UI-Design optisch ansprechend, intuitiv und benutzerfreundlich zu gestalten
  - Das Design ist responsive, also es werden je nach Größe des Bildschirms verschiedene Informationen, verschieden angeordnet angezeigt.
