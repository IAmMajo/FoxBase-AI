# Einleitung

Mit diesem Wiki Eintrag soll die Arbeit mit Git bzw. GitLab strukturiert und organisiert werden. Unter Anderem werden Themen wie **Label,** **Boards**, **Milestones**, **Branches** und **Commits** ausgeführt.

# Issues

## Konvention

Jedes Issue, dass wir erstellen enthält mindestens einen **Titel und eine Beschreibung**.

Im Falle eines Bugs auch einen Screenshot / Codesnippet des Problems, damit eine gute Identifizierung und eine schnelle Problemlösung möglich ist.

## Änderungen

Bei neuen Anforderungen an ein bereits geschlossenes Ticket, soll ein related Issue unter dem Ausgangsticket erstellt werden.

# Boards

## General Board

Das General Board ist das Board, dass wir hauptsächlich zur Organisation verwenden. Erstellte Issues werden über die Label

- Identity (Farben, Schriftarten, Logos)
- Figma
- Front-End
- API
- Bug
- Dokumentation

in das Board sortiert. So entsteht auch bei vielen Issues eine Übersicht, für die verschiedenen Projektregionen.

## State Board

Unterstützend verwenden wir ein klassisches State Board, wo alle Tickets in die Kategorien

- Open
- In Progress
- Testing
- Closed

aufgeteilt werden.

**Wichtig:** Das Label _“Testing”_ bezieht sich im Projektkontext auf die Responsiveness von entwickelten Komponenten.

# Milestones

## Definierte Milestones

Für dieses Projekt wurden die Milestones

- **Prototype** (Ein abgestimmter Figma Prototyp)
- **Front-End** (Ein funktionsfähiges Front-End, dass dem zuvor definierten Design entspricht)
- **Finishing Touches** (Nach mehrfach eingeholtem Feedback werden letzte Korrekturen am Projekt vorgenommen)

definiert, um das Projekt in kleinere Abschnitte zu unterteilen.

# Branches

## Konvention

Um in einer IDE in einen anderen Branch zu wechseln, wird der Terminal Command

```bash
git checkout BranchName

#Beispiel
git checkout stage
```

verwendet.

## Ausgangssituation

Die geschützte main-Branch ist am Ende die Branch auf der das finale Endprodukt liegen wird. Darüber hinaus existiert ein stage-Branch auf den wir fertige Komponenten, die bereit zum Testing sind, pushen.

## Komponentenorientierte Sub-Branches

Des Weiteren wird für jede neue Komponente eine neue Branch erstellt, die dann am Ende ihrer Fertigstellung in stage gemerged und geschlossen wird.

# Commits

## Konvention

Wir verfolgen die klassischen Konventionen, die in dieser Form auch in der offiziellen Git Dokumentation zu finden sind. Hier ist eine Beispielsyntax für einen Commit Flow:

### Dateien in den Git Staging Bereich einfügen

```bash
git add * # Fügt alle Dateien in den Staging Bereich

############### oder ###############

git add . # Fügt alle veränderten Dateien in den Staging Bereich

############### oder ###############

git add Dateiname.css, Dateiname.html # Fügt einzelne Dateien in den Staging Bereich
```

### Dateien committen

```bash
git commit -m "Fix #<Issue Nummer> - <Commit Nachricht>"
# Schließt das entsprechende Issue
# FIX TAG

# Beispiel:
git commit -m "Fix #123 - Finished Layout of Navbar"

############### oder ###############

git commit -m "Connected to #<Issue Nummer> - <Commit Nachricht>"
# Bindet den Commit an das entsprechende Issue, schließt es aber nicht
# CONNECTED TO TAG

# Beispiel:
git commit -m "Connected to #123 - Started plotting of Navbar"

############### oder ###############

git commit -m "Reopen #<Issue Number> - <Commit Nachricht>"
# Öffnet ein geschlossenes Issue wieder
# REOPEN TAG

#Beispiel:
git commit -m "Reopen #123 - Color change"

############### oder ###############

git commit -m "Connected to #123 - Navbar zusammen mit @30110 fertiggestellt"
# Markiert einen anderen User in der Commit Message
# @USER
```

### Pushen von Dateien

```bash
git push # Pusht die Änderungen in die aktuelle Branch
```

## Merge

Ist eine Komponente bereit in die stage-Branch übertragen zu werden, wird über die GitLab Benutzeroberfläche eine Merge Request erstellt und die entsprechende Branch danach geschlossen.
