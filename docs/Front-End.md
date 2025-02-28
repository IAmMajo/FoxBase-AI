---
title: Front-End
---

# Ordnerstruktur

Das Front-End der Anwendung lässt sich in zwei Kategorien aufteilen. In **Clientseite** und **Admin Panel**. Folgende Dateien sind in dieser Struktur enthalten. Wirklich wichtig zu erwähnen ist allerdings, dass genauere Hintergründe zum erstellten Code in den individuellen Dokumentation des Teams `docs/Front-End/` zu finden ist. Dieses Dokument geht lediglich kurz auf jede Datei des Front Ends ein.

## Assets

Im Verzeichnis `assets/` werden sowohl Schriftarten (unter `assets/fonts`), wie auch Images und SVGs gespeichert.

## Components

Dieses Projekt ist nach einer komponentenorientierten Struktur aufgebaut. Diese Components werden im Verzeichnis `/components` gespeichert, damit diese im Verzeichnis `/pages` wiederverwendet werden können.

### [CallToSpecification.vue](../components/CallToSpecification.vue)

Diese Komponente wird dazu verwendet, den User erneut auf der [pages/index.vue](../pages/index.vue) dazu aufzuvordern den Prompt, der definiert wurde zu verändern, wenn das gewünschte Resultat nicht dabei war (In dieser Komponente aufgerufen: [SearchbarComponent.vue](../components/SearchbarComponent.vue)).

### [DetailBackButtonComponent.vue](../components/DetailBackButtonComponent.vue)

Ein Zurückbutton mit Hover Event, um in der [../pages/products/[productId]/index.vue](../pages/products/[productId]/index.vue) verwendet zu werden.

### [FooterComponent.vue](../components/FooterComponent.vue)

Der Footer dient auf der Startseite [pages/index.vue](../pages/index.vue) dazu verschiedene Quick Links zu erreichen, ein Impressum zu verlinken und den User über Copyright zu informieren.

### [HeroComponent.vue](../components/HeroComponent.vue)

Der Hero ist der Kernpunkt der Anwendung und enthält sowohl die [Navbar](../components/NavbarComponent.vue), die [Prompttempates](../components/PromptSuggestionsComponent.vue) und die [Searchbar](../components/SearchbarComponent.vue). Diese Komponente enthält eine Wellen Animation.
Weitere Hintergründe zur Komponente: [Hero Implementierung](./Front-End/Hero-Implementierung).

### [LightDarkSwitchComponent.vue](../components/LightDarkSwitchComponent.vue)

Diese Komponente wird in der [Navbar](../components/NavbarComponent.vue) verwendet, um zwischen Light und Dark Mode zu wechseln. Weitere Hintergründe zur Komponente: [Light Dark Switch Implementierung](./Front-End/Light-Dark-Switch-Button).

### [mainMenu.vue](../components/mainMenu.vue)

Das Main Menu ist eine Komponente, die Lena aus der Prime Vue Library importiert hat, um diese unter [pages/admin/](../pages/admin/) aufzurufen.

### [NavbarComponent.vue](../components/NavbarComponent.vue)

Die Navbar ist dazu da das Logo anzuzeigen, eine [Suchalternative](../components/SearchbarSmallComponent.vue) zur Verfügung zu stellen und den [Light Dark Switch](../components/LightDarkSwitchComponent.vue) zu platzieren und wird in der page/index aufgerufen.

### [NavListElement.vue](../components/NavListElement.vue)

Die Unterpunkte im [Admin Panel](../pages/admin/index.vue) wurden ebenfalls in eine gesonderte Komponente ausgelagert.

### [PreviewContainer.vue](../components/PreviewContainer.vue)

Der Preview Container ist der Sammelort für alle anderen Elemente der Preview, um Props, ausgehend von der [Konfigurationsseite des Adminpanels](../pages/admin/index.vue) weiter nach unten zu den anderen Elementen zu routen.

> **WICHTIG**
>
> Weitere Information zur Preview sind unter [docs/Front-End/Preview-in-Konfigurationsseite](./Front-End/Preview-in-Konfigurationsseite) zu finden. Dort wird ebenfalls erläutert, wie das Routing genau funktioniert.

### [PreviewContent.vue](../components/PreviewContent.vue)

Hier werden die Texte aus den Inputs der [Konfigurationsseite](../pages/admin/index.vue) gelesen.

### [PreviewLightSwitch.vue](../components/PreviewLightSwitch.vue)

Eine Mockdarstellung des Light Dark Switches für die Preview.

### [PreviewNavbar.vue](../components/PreviewNavbar.vue)

Eine Mockdarstellung der Navbar für die Preview.

### [PreviewResponse.vue](../components/PreviewResponse.vue)

Eine Mockdarstellung der Response für die Preview.

### [PreviewResult.vue](../components/PreviewResult.vue)

Eine Mockdarstellung der Results für die Preview.

### [PreviewSearchbar.vue](../components/PreviewSearchbar.vue)

Eine Mockdarstellung der Searchbar für die Preview.

### [PromptSuggestionsComponent.vue](../components/PromptSuggestionsComponent.vue)

Eine Auflistung der Prompts gezogen aus der Datenbank, die dann in Form von Pills auf der Startseite angezeigt werden.

### [ResponseCardComponent.vue](../components/ResponseCardComponent.vue)

Die Rückgabe der FoxBaseAPI wird in einer semitransparenten Box im Front End ausgegeben.

### [ResultCardComponent.vue](../components/ResultCardComponent.vue)

Die ResultCards, sind die Cards der Suchanfragen, die dann über eine Fade-In Animation einanimert werden.

### [ResultCardsComponent.vue](../components/ResultCardsComponent.vue)

Die Resultcards werden in einer übergeordneten Komponente in einer Liste ausgegeben.

### [SearchbarComponent.vue](../components/SearchbarComponent.vue)

Die Suchleiste, die Anfragen an unsere Datenbankschickt, um basierend auf der Eingabe eine Liste an Results zurückzugeben oder neue Prompts anzuzeigen.

### [SearchbarSmallComponent.vue](../components/SearchbarSmallComponent.vue)

Eine kleine Searchbar, die unterstützend in der Navbar anzeiget wird und über eine Animation verfügt.

### [TextmediaComponent.vue](../components/TextmediaComponent.vue)

Eine über Flexbox aufgeteilte Komponente. Links ist ein Bild, rechts eine Überschrift und Untertext.

## Pages Front End

### [pages/index.vue](../pages/index.vue)

Die Startseite der Anwendung, wo eine Suche über die Searchbar getätigt, Prompt Templates ausgewählt oder zwischen Light und Dark Mode geswitcht werden kann.

### [pages/products/[productId]/index.vue](../pages/products/[productId]/index.vue)

Jenachdem welchen Artikel der User angeklickt hat, gelangt er auf eine Detailseite, wo er weitere Informationen über die KI von FoxBase erhalten kann.

## Pages Admin

### [Konfigurationsseite](../pages/admin/index.vue)

Auf der Konfigurationsseite können Texte im Hero und die Farben bearbeitet werden.

### [Katalog](../pages/admin/catalog/index.vue)

Auf der Katalogseite können diverse Collections an Produkten eingepflegt werden.

### [Prompt Templates](../pages/admin/prompt-templates/index.vue)

Auf der Prompt Templates Seite können Prompt Templates bearbeitet werden, die dann über die Suche erreichbar sind.

### [User](../pages/admin/user/index.vue)

Auf der User Seite können neue User angelegt und die Privilegien der User über Rollen angepasst werden.
