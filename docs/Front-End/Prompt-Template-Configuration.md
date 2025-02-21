---
title: Prompt Template Configuration - index.vue
---

# Dokumentation der Datei `index.vue` (unter prompt-templates)

## Einleitung

Diese `index.vue`-Datei implementiert die Übersicht und Verwaltung der **Prompt Templates** (also die Prompt Template Configuration) innerhalb des Admin Panels. Die Prompt Templates dienen dazu, vorgefertigte Suchanfragen für Nutzer bereitzustellen, um relevante Produkte schneller zu finden.

Die **Prompt Template Configuration** ermöglicht:

- Die Anzeige einer Liste von vorhandenen Prompt Templates.
- Das Erstellen neuer Prompt Templates.
- Das Bearbeiten bestehender Prompt Templates.
- Das Löschen von Prompt Templates.

## Wichtige Bestandteile

### 1. **Template-Bereich (`<template>`)**

Die Datei verwendet **PrimeVue-UI-Komponenten**, um eine moderne und interaktive Oberfläche zu bieten. Dazu gehören:

- `DataTable`: Zeigt die Liste der Templates in tabellarischer Form an.
- `Dialog`: Wird genutzt, um Templates zu erstellen oder zu bearbeiten.
- `Button`: Fügt Funktionen für das Erstellen, Bearbeiten und Löschen hinzu.

Die UI-Interaktionen sind mit dem API-Status verknüpft: Beispielsweise wird das Löschen eines Templates erst nach einer Bestätigungsabfrage durchgeführt.

### 2. **Script-Bereich (`<script setup lang="ts">`)**

Wichtige Datenstrukturen sind:

- `prompts`: Enthält die Liste der existierenden Prompt Templates.
- `selectedPrompt`: Speichert den zu löschenden Prompt.
- `newPrompt`: Temporäre Daten für den neuen Prompt Template Eintrag.
- `editingRows`: Zu bearbeitende Prompts.
- `dialogVisible`: Steuert die Sichtbarkeit des Dialogs zum Erstellen von Templates.
- `deletePromptDialog`: Steuert die Sichtbarkeit des Dialogs zur Bestätigung zum Löschen eines Prompts.

Methoden, um die Daten über die API zu verwalten:

- `useFetch<Prompt[]>("/api/prompts?page=1")`: Die Liste der Prompt Templates von der API laden.
- `postPrompt(newPrompt.value)` in `addPrompt()`: Neue prompt Template hinzufügen.
- `putPrompt(newData)`: Bestehende Prompt Template aktualisieren.
- `deletePromptDb(selectedPrompt.value!.id)`: Prompt Template löschen.

### 3. **Style-Bereich (`<style>`)**

- Enthält **CSS-Anpassungen**, insbesondere:
  - Styling der Eingabefelder und Buttons.
  - Farbgestaltung im Einklang mit dem Design der Anwendung.
