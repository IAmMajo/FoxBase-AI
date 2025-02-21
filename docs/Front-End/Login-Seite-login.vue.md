---
title: Login-Seite - login.vue
---

# Dokumentation der Datei `login.vue`

## Einleitung

Die `login.vue` Datei ist die Login-Komponente für das Admin Panel. Sie stellt das Anmeldeformular für Benutzer bereit und verarbeitet die Authentifizierung.

## Wichtige Bestandteile

### 1. **Template-Bereich (`<template>`)**

- Enthält das **Login-Formular**, bestehend aus:
  - Zwei Eingabefeldern für **Benutzername** und **Passwort**.
  - Einem **"Anmelden"**-Button zur Authentifizierung.
  - Einem **Link für "Passwort vergessen?"**.
- Das Layout nutzt eine zentrale Komponente zur Anzeige des Formulars.

### 2. **Script-Bereich (`<script lang="ts" setup>`)**

- **Datenmodell (reactive state)**
  - Verwaltet die Eingaben für **Benutzername** und **Passwort** mithilfe von `ref()`.
- **Login-Funktion**
  - Wird beim Klicken auf den **"Anmelden"**-Button ausgeführt.
  - Sendet die Anmeldeinformationen an das Backend.
    - Falls erfolgreich: Benutzer wird weitergeleitet.
    - Falls fehlerhaft: Fehlermeldung wird angezeigt.
- **Fehlermanagement**
  - Es wird überprüft, ob die API-Anfrage fehlschlägt (z. B. falsche Anmeldeinformationen).
  - Eine entsprechende Fehlermeldung wird ausgegeben.

### 3. **Style-Bereich (`<style>`)**

- Enthält **CSS-Anpassungen** für das Layout, insbesondere:
  - Zentrierung des Login-Containers.
  - Styling der Eingabefelder und Buttons und Fehlermeldung.
  - Farbgestaltung im Einklang mit dem Design der Anwendung.
