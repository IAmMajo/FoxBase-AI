---
title: base.css Struktur
---

# Einleitung

In diesem Wiki Eintrag wird thematisiert, wie ein Stylesheet aussehen kann, dass sich am Identity Figma Board orientiert, um die Entwicklung des finalen Produkts zu erleichtern. Hier geht es zum entsprechenden Artikel über das [Figma Identity Board](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/wikis/Figma/Aufbau-des-Figma-Projekts).

# Dateiort

Die Datei `base.css` ist im Verzeichnis `src -> assets` des Projekts zu finden.

# Initiales Styling

Es gibt grundsätzliche Stylings bezüglich des `html` und des `body` Tags, die initial in einem Stylesheet, dass global verwendet werden kann, abgedeckt werden sollten. Der Margin und das Padding sollte für beide Tags 0 sein. Des Weiteren kann eine Standardschriftart festgelegt werden, was im Projektkontext nicht nötig sein wird.

```css
body,
html {
  margin: 0;
  padding: 0;
}
```

# Schriftarten importieren

Um die Performance der Seite zu erhöhen, werden die zwei Schriftarten, die im Projekt verwendet werden (Asap und Inter) lokal konfiguriert und nicht über fonts.google.com importiert.

```css
@font-face {
  font-family: "asap";
  src: url("fonts/Asap.ttf");
  font-style: normal;
}

@font-face {
  font-family: "Inter";
  src: url("fonts/inter.ttf");
  font-style: normal;
  font-weight: bold;
}
```

Die ttf Dateien der Schriftarten liegen im Verzeichnis `src -> assets -> fonts`.

# Root

Standardmäßig werden variable Werte zu z.B. Schriften, Farben, Abständen und Schriftgrößen in einer `:root` Klasse gespeichert. Hier wurden alle relevanten Werte des [Identity Boards](https://www.figma.com/design/kDtdJAlwppDFAL0fTpwsNM/FoxBase-AI-Platform?node-id=4-2&t=jBGeSWdLzKxoIOIp-1) in eine solche ``:root` Klasse übernommen.

```css
:root {
  /*Colors Light Mode*/

  /**Primary Colors**/
  --light-primary: #8deeac;
  --light-primary-hover: #00c16a;

  /**Background Colors**/
  --light-bg-primary: #ffffff;
  --light-bg-secondary: #f4f9fe;
  --light-bg-tertiary: #ffffff;

  /**Text Colors**/
  --light-text-primary: #0f172a;
  --light-text-secondary: #475569;
  --light-text-tertiary: #00c16a;

  /*Colors Dark Mode*/

  /**Primary Colors**/
  --dark-primary: #00dc82;
  --dark-primary-hover: #07b26d;

  /**Background Colors**/
  --dark-bg-primary: #021025;
  --dark-bg-secondary: #0f1f31;
  --dark-bg-tertiary: #020420;
  --dark-bg-search: #474d54;

  /**Text Colors**/
  --dark-text-primary: #ffffff;
  --dark-text-secondary: #cbd5e1;
  --dark-text-tertiary: #00dc82;

  /*Font Sizes */
  --fs-header: 6rem;
  --fs-h1: 4.5rem;
  --fs-h2: 3rem;
  --fs-h3: 2.5rem;
  --fs-paragraph: 1.125rem;

  /* Values */
  --border-radius-default: 12px;
  --border-radius-full: 10000px;
  --gap: 16px;

  --navbar-height: 8vh;
  --hero-height: 92vh;
}
```

# Standardklassen

Um die Lesbarkeit des geschriebenen Codes weiter zu verbessern, wurden Standardklassen für Überschriften (h1-h3), Paragraphen und Bilder (border-radius) definiert, wo Schriftart und Schriftgröße bereits abgedeckt sind.

```css
.header-title {
  font-family: "Inter", sans-serif;
  font-size: var(--fs-header);
}

h1 {
  font-family: "Inter", sans-serif;
  font-size: var(--fs-h1);
}

h2 {
  font-family: "Inter", sans-serif;
  font-size: var(--fs-h2);
}

h3 {
  font-family: "Inter", sans-serif;
  font-size: var(--fs-h3);
}

p {
  font-family: "asap", sans-serif;
  font-size: var(--fs-paragraph);
}

.light-heading {
  color: var(--light-text-primary);
}

.light-bottomtext {
  color: var(--light-text-secondary);
}

.light-highlight {
  color: var(--light-text-tertiary);
}

.dark-heading {
  color: var(--dark-text-primary);
}

.dark-bottomtext {
  color: var(--dark-text-secondary);
}

.dark-highlight {
  color: var(--dark-text-tertiary);
}

.text-shadow {
  text-shadow: 0 4px 20px rgba(0, 0, 0, 35%);
}

img {
  border-radius: var(--border-radius-default);
}

.no-spacing {
  margin: 0;
  padding: 0;
}
```

# Flexbox Klassen

Im Projekt wird mit dem Layout Konzept Flexbox gearbeitet. Auch dafür wurden Klassen in der `base.css` definiert, um unnötige Konfigurationen in einzelnen Komponenten zu vermeiden.

```css
.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.jc-ai-center {
  justify-content: center;
  align-items: center;
}

.gap {
  gap: var(--gap);
}
```

Stand: 29.10.2024 - Es ist gut möglich, dass diese Klassen erweitern werden, wenn Bedarf besteht.

# Debugging Klassen

Um die Entwicklung zu vereinfachen, wurden zwei debugging Klassen definiert. Eine Klasse, die den Hintergrund der Komponente rot färbt und eine Klasse, die ein Element mit einer grünen Border umrandet.

```css
.db-borders {
  border: 2px solid green;
}

.db-red {
  background-color: rgb(253, 142, 142);
}
```

# Media Queries

Das Endprodukt soll am Ende auf sämtlichen Bildschirmgrößen funktionieren. Da wir nicht nach dem Ansatz Mobile-First entwickeln, wird er Bildschirm mit jeder Media Query kleiner. Folgende Resolutionen werden berücksichtigt.

Große Desktops = >1279px width

Kleine Desktops = max-width: 1279px

Tablets = max-width: 768px

Handys = max-width: 480px

Kleine Handys = max-width: 400px

Die Schriftgrößen werden entsprechend angepasst.

```css
/* Kleine Desktops */
@media (max-width: 1279px) {
  p {
    font-size: 17px;
  }

  .header-title {
    font-size: 3em;
  }

  h1 {
    font-size: 2.8em;
  }

  h2 {
    font-size: 2.6em;
  }

  h3 {
    font-size: 2.4em;
  }
}

/* Tablets */
@media (max-width: 768px) {
  p {
    font-size: 16px;
  }

  .header-title {
    font-size: 2.2em;
  }
  h1 {
    font-size: 1.8em;
  }

  h2 {
    font-size: 1.6em;
  }

  h3 {
    font-size: 1.4em;
  }
}

/* Handys */
@media (max-width: 480px) {
  p {
    font-size: 15px;
  }

  .header-title {
    font-size: 2em;
  }

  h1 {
    font-size: 1.6em;
  }

  h2 {
    font-size: 1.4em;
  }

  h3 {
    font-size: 1.2em;
  }
}

/* kleine Handys */

@media (max-width: 400px) {
  p {
    font-size: 15px;
  }

  .header-title {
    font-size: 1.6em;
  }

  h1 {
    font-size: 1.4em;
  }

  h2 {
    font-size: 1.2em;
  }

  h3 {
    font-size: 1em;
  }
}
```
