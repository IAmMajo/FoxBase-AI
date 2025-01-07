export function stringToBoolean(
  valueRef: Ref<string | undefined>,
): boolean | undefined {
  const value = valueRef.value; // Zugriff auf den Wert des Ref
  if (value === undefined) return undefined; // Falls der Wert undefined ist, gibt es undefined zurück

  const normalized = value.trim().toLowerCase();
  if (["true", "yes", "1"].includes(normalized)) return true;
  if (["false", "no", "0"].includes(normalized)) return false;

  throw new Error(`Ungültiger Wert: ${value}`); // Fehler für ungültige Strings
}

export function boolToString(boolean: boolean | undefined) {
  let result = "";

  if (boolean) {
    result = "true";
  } else {
    result = "false";
  }

  return result;
}
