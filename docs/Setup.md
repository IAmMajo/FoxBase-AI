---
title: Setup
---

## 1. Repository klonen

```sh
git clone https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche.git
cd foxbase-semantische-suche
```

## 2. `.dev.vars.example` zu `.dev.vars` kopieren

```sh
cp .dev.vars.example .dev.vars
```

Anschließend muss in der Datei `.dev.vars` das `API_TOKEN` für FoxBases API
ergänzt werden. Dieses ist als CI/CD-Variable im GitLab-Projekt hinterlegt und
kann
[von dort kopiert werden](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/settings/ci_cd#js-cicd-variables-settings).

## 3. Projekt starten

```sh
docker compose up
```

## Benutzerkonten für den Admin-Bereich

Nach dem Start des Projekts ist der Admin-Bereich unter
http://localhost:3000/admin erreichbar. Folgende Standard-Benutzerkonten sind
zum Einloggen verfügbar:

Benutzername | Passwort | Rolle
------------ | -------- | -------
admin        | admin    | admin
curator      | curator  | curator
observer     | observer | observer

Jedes Benutzerkonto hat die Rolle, die dem Benutzernamen entspricht. Über den
Admin-Bereich können Benutzerkonten in der lokalen Umgebung jederzeit erstellt,
bearbeitet und gelöscht werden.

## Manuelles Setup

Statt das Projekt über Docker zu starten, ist es auch möglich das Projekt
manuell direkt selbst mit npm-Befehlen zu starten und einzurichten.

Es wird empfohlen das Projekt über Docker zu starten, da die
Entwicklungsumgebung so besser reproduzierbar ist und beispielsweise automatisch
die richtige Version von Node verwendet wird.

Vorraussetzung für das manuelle Setup ist **Node Version 22**. Es kam bereits zu
Problemen mit anderen Node-Versionen.

Zuerst müssen die Abhängigkeiten installiert werden:

```sh
npm install
```

Anschließend müssen die Datenbank-Migrationen ausgeführt werden. Mehr
Informationen zu den Migrationen gibt es in der
[Datenbank-Dokumentation](./Back-End/Datenbank.md).

```sh
npm run migrate
```

Das Projekt kann anschließend gestartet werden:

```sh
npm run dev
```

Beim Start des Projekts über Docker wird hinterher automatisch ein Import der
Produkte aus der FoxBase API durchgeführt. Beim manuellen Start muss dieser
entweder selbst über den Admin-Bereich gestartet werden (Menüpunkt Catalog ->
Import Collection -> FoxBase Key `553BCD50-71D5-11EF-B48C-9BF348DF607F`) oder
manuell die Datei `import-products.sh` (liegt im Root der Repository) ausgeführt
werden.
