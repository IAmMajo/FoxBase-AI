---
title: Suchergebnisse - Result Cards Design
---
# Einleitung

Im Folgenden wird das Design der **Result Cards** beschrieben. 
Die Result Cards zeigen die Suchergebnisse auf der FoxSearchAI-Website an. Sie sind für **Darkmode und Lightmode**, sowie **Mobile und Desktop** optimiert.

Es ist zu beachten, dass das Design mit Figma erstellt wurde und die hier genutzten Farben im finalen, implementierten Produkt dynamisch geändert werden können.

## Allgemeines Design
Jede Result Card zeigt relevante Produktinformationen in einer kompakten, aber informativen Struktur. Das Design ist responsive, also für Desktop und Mobile vorhanden und enthält Darkmode, sowie Lightmode.
### Desktop-Version
![ResultCardsDark](/docs/BilderVideos/ResultCards_DetailView_Logo/ResultCardsDark.png)
![ResultCardsLight](/docs/BilderVideos/ResultCards_DetailView_Logo/ResultCardsLight.png)

### Struktur der Result Cards
- **Produktbild**:  
  - Links oben positioniert, ca. 1/3 der Kartenbreite.
  - Bilder für schnelle visuelle Erkennung.
- **Produkttitel**:  
  - Groß und fett gedruckt.
  - Enthält den vollständigen Namen des Produkts.
- **Produkttyp**:  
  - Mit grünem Punkt als Indikator.
- **Technische Spezifikationen**:  
  - Labels in **hellgrau**, Werte in **fetter Schrift**.
- **Tags für Verwendungszweck (nur Desktop-Version)**:  
  - Beispiele: `Remote Work`, `Portability`, `Office Use`
  - In kleinen, farbigen Labels.
- **Interaktionsbuttons (Upvote/Downvote)**:  
  - Pfeil-Symbole zum Bewerten der Ergebnisse (wie gut das Ergebnis zur Suche passt).
  - Minimalistisches Design mit Hover-Effekt.

---

## Design-Details nach Modus

### **Darkmode**
- **Hintergrund**: Sehr dunkles Blau.
- **Textfarben**:  
  - **Weiß für Produkttitel**.  
  - **Hellgrau für Labels der technischen Spezifikationen**.  
  - **Fettgedruckt weiß für Werte (z. B. `16 GB RAM`, `Apple M3 Chip`)**.
- **Linien & Trennungen**: Dezente graue Linien zur Abgrenzung zwischen Produkten.
- **Tags**:  
  - Grüne, blaue und graue Labels mit weißer Schrift für verschiedene Verwendungszwecke.
- **Buttons**:  
  - Transparente Upvote/Downvote-Symbole mit Hover-Effekt.

### **Lightmode**
- **Hintergrund**: Sehr helles Grau/Weiß.
- **Textfarben**:  
  - **Dunkelgrau für Produkttitel**.  
  - **Hellgrau für Labels**.  
  - **Dunkler für Werte (RAM, Speicher, Prozessor)**.
- **Linien & Trennungen**: Dezente graue Linien für eine bessere Struktur.
- **Tags**:  
  - Farbschema wie im Darkmode, aber an den hellen Hintergrund angepasst.
- **Buttons**:  
  - Gleiche Funktionalität wie im Darkmode, mit dunkleren Icons.

---

## Unterschiede zwischen Desktop und Mobile

| Merkmal | Mobile | Desktop |
|---------|--------|---------|
| **Anordnung** | Karten sind vertikal gestapelt | Karten sind horizontal ausgerichtet |
| **Bildgröße** | Größer für bessere Erkennung | Kleiner mit mehr Textinformationen |
| **Tags für Verwendungszweck** | Nicht vorhanden | Tags unter den Spezifikationen |
| **Platzierung der Buttons** | Unterhalb der Produktdetails | Rechtsbündig |

| Mobile Darkmode | Mobile Lightmode |
| ------ | ------ |
|    ![ResultCardsMobileDark](/docs/BilderVideos/ResultCards_DetailView_Logo/ResultCardsMobileDark.png)    |   ![ResultCardsMobileLight](/docs/BilderVideos/ResultCards_DetailView_Logo/ResultCardsMobileLight.png)     |
