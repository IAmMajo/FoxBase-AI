---
title: Benutzerhandbuch
---

# Einleitung

In dieser Sektion der Dokumentation werden die grundliegenden Fragen zu Nutzung der Software thematisiert. Dies geschieht nach einem problemorientierten Prinzip. Das bedeutet, dass die verschiedenen Bereiche der Anwendung über Fragen, die ein Nutzer initial stellen könnte thematisiert.

> ❗**Wichtig**
>
> Dieses Handbuch beschäftigt sich nicht mit dem **technischen Hintergrund** der Anwendung und auch nicht mit den **UI / UX Konzepten** der Anwendung. Hier ist sowohl die **Designdokumentation**, wie auch die **technische Dokumentation** der korrekte Anlaufpunkt.

# Organisation

Diese erste Sektion thematisiert allgemeine Fragen in Richtung der Anwendung.

## Was ist FoxBaseAI?

FoxBaseAI ist eine KI-gestützte Suchmaschine, die sich besonders an andere Unternehmen, nach dem klassischen B2B Prinzip orientiert. Unternehmen sollen die Suchmaschine in ihr eigenes Ökosystem einbinden können, um eine Suche nach den im Unternehmen existierenden Produkten anzubieten.

FoxBaseAI ensteht im Rahmen des Moduls _Webentwicklung_, der Studiengänge _Verwaltungsinformatik E-Gov_ bzw. _Medieninformatik_ an der Hochschule Rhein-Waal.

## Welche Probleme werden mit FoxBaseAI gelöst?

Neben einer intelligenten und promptgestützten Suche, die Zeit spart, wird der User durch eine Response unterstützt, die einer natürlichen Konversation ähnelt. Wie bei einem Gespräch mit einer Fachperson, kann der User beraten werden und Empfehlungen erhalten, die auf die im Prompt definierten Bedürfnisse eingehen.

# Suchmaschine (Front-End)

In dieser Sektion wird auf Suchmaschinen Oberfläche eingegangen.

## Wie kann nach einem Produkt gesucht werden?

Sobald die Website geladen ist, kann direkt im ersten Element auf drei unterschiedliche Wege nach einem Artikel gesucht werden.

![Suche](/docs/BilderVideos/Suche.png)

Über die **Suchleiste** kann ein Prompt definiert werden. Basierend auf den aktuellen Eingaben, werden **Prompt Empfehlungen** definiert, die angeklickt werden können und so eine Suche initialisieren. Des Weiteren ist eine eine **kleine Suchleiste** in die Navbar integriert worden, die über das _Lupen Icon_ geöffnet werden kann und so ein Prompt eingegeben werden kann, auch wenn sich der User gerade nicht im Viewport des Hero Elements befindet.

![Suche2](/docs/BilderVideos/Suche2.png)

Wird eine Suche abgeschickt scrollt die Website nach unten, gibt eine KI-Beratung aus und liefert die besten Ergebnisste basierend auf dem zuvor definierten Prompt.

## Wie kann mehr über ein Produkt erfahren werden?

!!!!BILD VON DER DETAILSEITE, DIE IST NOCH BUGGY!!!

Nachdem sich zuvor für ein Produkt entschieden wurde, kann die Karte angeklickt werden, was den User auf eine **Detailseite** weiterleitet. Dort wird eine weitere Response des KI-Beraters spezifisch für dieses Produkt definiert. Auf dieser Seite werden weitere Informationen zum entsprechenden Produkt angegeben.

# Admin Panel

In dieser Sektion geht es um die Steuerung der Suchmaschine über das Admin Panel. Die Vorraussetzung, um das Admin Panel über die Route `/admin` zu erreichen ist, dass ein User angelegt ist und der User den Namen, wie auch das Passwort für den Account kennt und sich nach gängigen Methoden einloggt.

## Wie kann der Text auf der Startseite verändert werden?

!!!!HIER MUSS EIN IMAGE HIN; WENN DIE PREVIEW FERTIG IST!!!!

Nach dem einloggen in das Admin Panel wird der User auf die erste Seite des Admin Panels navigiert. Der _Configuration_ Seite. Dort kann der User eine Preview der aktuellen Angaben zur Startseite sehen. Rechts befinden sich Textfelder. Die oberen beiden bestimmen über die erste Zeile des Heros, die unteren beiden über die Zeile darunter. Jede Zeile entsteht aus 2 Input-Felder, um den letzten Teil des Satzes farblich hervorheben zu können. Keines der Felder muss ausgefüllt werden, allerdings besteht für alle Inputfelder eine Zeichenbegrenzung.

!!!!HIER MUSS EIN IMAGE HIN; WENN DIE PREVIEW FERTIG IST!!!!

Mit einem Klick auf den Speicherbutton unten auf der Seite, können die Änderungen bestätigt und an die Datenbank gesendet werden.

Wird die Startseite nun wieder aufgerufen, hat sich der Text bereits verändert.

## Wie kann die Farbe der Anwendung verändert werden?

!!!!HIER MUSS EIN IMAGE HIN; WENN DIE PREVIEW FERTIG IST!!!!

Auf der selben Seite kann ein neus Farbthema über die entsprechenden Selektoren eingearbeitet und in der Preview eingesehen werden.

## Wie kann eine neue Collection verwaltet werden (neue hinzufügen, bestehende bearbeiten, löschen)?

![Catalog](/docs/BilderVideos/Catalog.png)

Navigiert der User auf die Seite _Catalog_, kann dieser in die aktuellem im System gepflegten Collections - tabellarisch organisiert - einsehen und verschieden mit ihr interagieren.

Mit einem Klick auf das _Mülltonnen-Icon_ wird die eingearbeitete Collection gelöscht.

![Catalog2](/docs/BilderVideos/Catalog2.png)

Klickt der User auf das _Augen-Icon_ kann er die entsprechende Collection einsehen.

![Catalog3](/docs/BilderVideos/Catalog3.png)

Klickt der User auf den _Import Collection Button_, öffnet sich dieses Pop, mit dem die neue Collection eingebunden werden kann.

## Wie können Prompts verwaltet werden (erstellen, löschen)?

![Prompts](/docs/BilderVideos/Prompts.png)

Navigiert der User auf die Seite _Prompt Templates_ werden nach ähnlichem Prinzip, wie bei den _Collections_ auch die aktuell verfügbaren Prompts angezeigt. Der Button mit dem _Mülltonnen Icon_ löscht den Prompt Eintrag.

![Prompts2](/docs/BilderVideos/Prompts2.png)

Sowohl bei einem Click auf den _New Template Button_, wie auch auf den _Bleistift Button_ öffnet sich ein Pop-Up, wo der Prompt erstellt, beziehungsweise bearbeitet werden kann.

## Wie können neue Nutzer verwaltet werden (erstellen, löschen, Daten bearbeiten)

![Users ](/docs/BilderVideos/Users.png)

Auf der Users Seite, hat der User zwei Button zur Auswahl.

![Users2](/docs/BilderVideos/Users2.png)

Mit einem Klick auf den _Add User Button_ öffnet sich ein Pop Up. Dort können Name, Rolle und Passwort definiert werden. Die verfügbaren Rollen sind **Admin, Curator oder** **Observer**.

> ❗**Wichtig**
>
> Rollen verändern den Aufbau des Admin Panels. So hat der Admin vollen Zugriff auf das erstellen neuer Nutzer und Collections. Der Curator kann die Farben, Texte und Collections bearbeiten. Ein Observer kann lediglich den aktuellen Stand einsehen.

---

@31699
