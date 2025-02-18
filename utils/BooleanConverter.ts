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
