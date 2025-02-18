/*
 * Copyright 2025 Alina Marie Hartmann, Max Josef Overlack, Nils Paaßen,
 * Nico Puelacher, Hanna Steffen, Lena Weuste
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
