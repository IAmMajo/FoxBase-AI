export function parseCSV<T = Record<string, string | null>>(csvString: string): T[] {
  const rows = csvString.split("\n");
  const headers = rows[0]?.split(",");
  if (!headers) return []; // Wenn Header leer, gib leeres Array zurück

  return rows.slice(1).map((row) => {
    const values: string[] = [];
    let current = "";
    let insideQuotes = false;

    for (const char of row) {
      if (char === '"' && !insideQuotes) {
        insideQuotes = true;
      } else if (char === '"' && insideQuotes) {
        insideQuotes = false;
      } else if (char === "," && !insideQuotes) {
        values.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    const obj: Record<string, string | null> = {};
    headers.forEach((header, index) => {
      obj[header.trim()] = values[index] || null;
    });
    return obj as T;
  });
}
