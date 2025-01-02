export function hexToHsl(hex: string): string {
  // Konvertieren des Hexstrings zu RGB Werten
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  // Den Farbkanal mit dem höchsten Wert speichern (max)
  // Den Farbkanal mit dem geringsten Wert speichern (min)
  // Das Delta der beiden Werte um H und S zu ermitteln
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  // Errechnen von H mittels delta und den erfassten rgb Werten
  let h = 0;
  if (delta !== 0) {
    if (max === r) {
      h = ((g - b) / delta + (g < b ? 6 : 0)) % 6;
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }
    h = Math.round(h * 60);
  }

  // Errechnen von L
  const l = (max + min) / 2;

  // Errechnen von S
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  const result = `hsl(${h}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  return result;
}

////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

export function hslToHex(hsl: string | undefined): string {
  // HSL in der Form "hsl(h, s%, l%)"
  const match = hsl?.match(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/);
  const noLightColors = "hsl(0, 100%, 100%)";
  if (!match) {
    return noLightColors;
  }

  const [h, s, l] = match.slice(1).map(Number);

  const saturation = s / 100;
  const lightness = l / 100;

  const c = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lightness - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  const result = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
  console.log("Neue Light HEX Wert: " + result);
  return result;
}

////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

// Komplementäre Farbpalette generieren
export function generateComplementaryColor(color: string | undefined) {
  // Sicherheitscheck, ob eine Farbe im HSL Format übergeben wurde
  const match = color?.match(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/);
  if (!match) {
    throw new Error("Ungültiges HSL-Format. Erwartet: 'hsl(h, s%, l%)'");
  }

  // In die Bestandteile aufteilen
  const [h, s, l] = match.slice(1).map(Number);

  // Initialisieren eines Vergleichswerts für die Abfrage danach
  let compare; // Wenn l <= 50, dann 50 | Wenn l > 50, dann 100
  let result; // Resultat initialisieren

  // Wenn l kleiner / gleich 50 ist, dann geht die Farbe Richtung schwarz
  if (l <= 50) {
    compare = 50;
    result = Math.abs(l - compare);
    result = result + compare;
  }
  // Wenn l größer als 50 ist, geht die Farbe Richtung weiß
  else if (l > 50) {
    compare = 100;
    result = Math.abs(l - compare);
    result = result + 25; // Helle Farben etwas heller machen

    //Wenn die Helligkeit dadurch über 100 steigt, dann muss diese gecappt werden
    if (result > 100) {
      result = 100;
    }
  }

  //Neuen L Wert in HSL einsortieren einsortieren
  const newHSL = `hsl(${h}, ${s}%, ${result}%)`;
  console.log("Neuer Light HSL Wert: " + newHSL);

  // Ergebnis ausgeben
  return newHSL;
}
