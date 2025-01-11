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
