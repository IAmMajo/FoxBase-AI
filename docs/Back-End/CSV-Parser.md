---
title: CSV-Parser
---
# Einleitung

In diesem Wiki Eintrag wird thematisiert, wie der CSV Parser der Anwendung funktioniert.

# Theorie

Im Grunde sind CSV Dateien Stringketten, die man unter Berücksichtigung von zwei wichtigen Regeln dazu nutzen einen Datensatz zu verwalten.

### Regel 1 - Trennen von Einträgen

Die einzelnen Einträge einer CSV Datei müssen in irgendeiner Form getrennt werden.

Beispiel: 1, 2, 3, 4 

Hier wird das `,` als Trennelement gewählt. Alternativ kann aber auch `;` oder `|` verwendet werden. Wichtig ist nur, dass entweder alle Varianten vom Converter abgedeckt werden können, oder im Vorfeld klar definiert ist, welches Trennelement von den CSV Dateien verwendet wird. Ersteres liefert Flexibilität, Zweiteres spart Zeit und im Zweifel Aufwand, der nicht nötig ist. 

### Regel 2 - Header oder kein Header?

CSV Dateien orientieren sich am Format von Tabellen, das bedeutet auch, dass eine CSV Datei einen Header haben könnte. Das Script muss darauf also reagieren können.

### Ziel des Skripts

Ziel ist es aus dieser ebenen genannten String Kette ein Sammlung an Objekten zu generieren, die über Key-Value Pairs effizient gefunden werden können, auch wenn die Datei groß werden sollte. 

# Implementierung

Unter den Gesichtspunkten der Theorie wurde dieses Skript programmiert:

```typescript
export function parseCSV<T = Record<string, string | null>>(
  csvString: string,
): T[] {

  // CSV-String in Zeilen unterteilen
  const rows = csvString.split("\n");
  // Die Header Zeile entfernen, wenn diese denn vorhanden ist
  const headers = rows[0]?.split(",");
  if (!headers) return []; // Wenn Header leer, gib leeres Array zurück

  // Geht jedes Zeichen durch und erstellt Value Objekte
  return rows.slice(1).map((row) => {
    const values: string[] = [];
    let current = "";
    let insideQuotes = false;

    for (const char of row) {
      // Start über " erkannt
      if (char === '"' && !insideQuotes) {
        insideQuotes = true;
      } 
      // Ende über weiteres " erkannt
      else if (char === '"' && insideQuotes) {
        insideQuotes = false;
      } 
      // Wenn ein Komma außerhalb von Anführungszeichen gefunden wird, ist der aktuelle Wert abgeschlossen
      else if (char === "," && !insideQuotes) {
        values.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    // Den aktuellen Wert in values pushen
    values.push(current.trim());

    // Objekte über Key-Value Pairs erstellen
    const obj: Record<string, string | null> = {};
    headers.forEach((header, index) => {
      obj[header.trim()] = values[index] || null;
    });
    // Die Elemente zurückliefern
    return obj as T;
  });
}
```