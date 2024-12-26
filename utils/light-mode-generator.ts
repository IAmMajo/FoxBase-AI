
export function rgbToHsl(r: number, g: number, b: number): { h: number, s: number, l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (delta !== 0) {
    if (max === r) {
      h = (g - b) / delta;
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }
    s = delta / (1 - Math.abs(2 * l - 1));
  }

  h = (h * 60) % 360;
  if (h < 0) h += 360;

  s = isNaN(s) ? 0 : s;

  return { h, s, l };
}
export function hslToRgb(h: number, s: number, l: number): { r: number, g: number, b: number } {
  h /= 360;
  s /= 100;
  l /= 100;

  let r = 0, g = 0, b = 0;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 3) return q;
      if (t < 1 / 2) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

export function getLightModeColor(color: string): string {
  const rgb = hexToRgb(color);
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);

  let newH = h; // Farbton bleibt gleich
  let newL = l;
  let newS = s;

  if (l <= 0.2) {
    // Sehr dunkle Farben: Aufhellung forcieren
    newL = Math.min(l + 0.5, 0.9); // Starke Aufhellung
    newS = Math.max(s, 0.5); // Sättigung erhöhen, um lebendige Farben zu erzeugen
    newH = (h < 30 || h > 330) ? 210 : h; // Farbton Richtung Blau verschieben, falls zu nah an Rot
  } else if (l > 0.2 && l <= 0.5) {
    // Mittel-dunkle Farben: Moderate Aufhellung
    newL = Math.min(l + 0.3, 0.85);
    newS = Math.max(s, 0.4); // Sättigung sichern
  } else if (l > 0.5) {
    // Helle Farben: Leichte Änderungen
    newL = Math.min(l + 0.2, 1.0);
    newS = Math.max(s, 0.6); // Kräftigere Farben
  }

  // Textfarben (nahe Schwarz oder Weiß)
  if (s <= 0.1) {
    if (l < 0.1) {
      // Fast Schwarz → Helles Grau
      newL = 0.85;
      newS = 0;
    } else if (l > 0.9) {
      // Fast Weiß → Mittleres Grau
      newL = 0.15;
      newS = 0;
    }
  }

  const { r, g, b } = hslToRgb(newH, newS * 100, newL * 100);
  return rgbToHex(r, g, b);
}





function hexToRgb(hex: string): { r: number, g: number, b: number } {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!match) throw new Error("Invalid hex color format");
  return {
    r: parseInt(match[1], 16),
    g: parseInt(match[2], 16),
    b: parseInt(match[3], 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
}
