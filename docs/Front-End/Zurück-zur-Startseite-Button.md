---
title: Zurück zur Startseite Button
---
# Einleitung

In diesem Wiki Eintrag wird gezeigt, wie die `DetailBackButtonComponent.vue` erstellt und in die Navbar der [Detailseite](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/wikis/Front-End/Detailseite-Results) eingearbeitet wird.

# Theorie

In der Theorie soll der Button ein Pfeil Icon nach links haben und wenn der User über den Button hovert, soll über einen Fade-In Effekt der Text "Zurück zur Startseite" erscheinen. Mit einem Klick auf den Button soll der User dann zurück auf die Startseite navigiert werden.

# Implementierung

Um den oben beschriebenen Aufbau umzusetzen lässt sich folgender Code in die Template Sektion der Komponente einarbeiten:

```xml
<div>
        <div class="flex jc-ai-center">
            <a href="/">
                <i class="detail-back-button pi pi-angle-left"></i>
            </a>
            <p class="back-button-text">Zurück zur Startseite</p>
        </div>
    </div>
```

Dieser Code lässt sich mit diesem Styling dann zu einem finalen Ergebnis führen:

```css
.back-button-text {
    color: var(--dark-bg-secondary);
    white-space: nowrap;
    transition: 0.75s ease;
}

html.light .back-button-text {
    color: var(--light-bg-secondary);
    white-space: nowrap;
}

.detail-back-button {
    color: var(--dark-text-secondary);
    font-size: 26px;
}

html.light .detail-back-button {
    color: var(--light-text-primary);
    font-size: 26px;
}

a:hover + .back-button-text {
    color: var(--dark-text-secondary);
}

html.light a:hover + .back-button-text {
    color: var(--light-text-primary);
}
```

Die Integrationsklassen, um dynamisch auf Light und Dark Mode zu reagiert sind damit ebenfalls abgedeckt. Mehr zu Thema Light und Dark Mode im [entsprechenden Wiki Eintrag](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/wikis/Front-End/Generierung-einer-komplement%C3%A4ren-Palette).