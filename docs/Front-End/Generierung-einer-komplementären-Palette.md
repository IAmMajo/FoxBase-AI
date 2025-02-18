---
title: Generierung einer komplementären Palette
---

# Einleitung

In diesem Wiki-Eintrag wird thematisiert, nach welchen Prinzipien die drei Farbspektren **RGB**, **HEX** und **HSL** arbeiten und wie mit der Umrechnung dieser ein Algorithmus geschrieben werden kann, der basierend auf einer Palette die in der Helligkeit komplementäre Palette generiert.

# Theorie

### RGB

Beim `RGB-Modell` werden **drei Farbkanäle** mit jeweils einer Zahl versehen, die **maximal 1 Byte groß sein** kann. Die Zahl muss also zwischen **0** und **255** liegen. Jede Zahl umschreibt hier eine **andere Intensität** der Farbe. Umso höher der Wert, umso intensiver die Farbe. **RGB** steht hier für **Red, Green, Blue**. Zu diesem System lässt sich ein weiterer Kanal hinzufügen. Der Alphakanal, der darüber entscheidet, wie "sichtbar" die Farbe sein soll. Auch dieser kann maximal 1 Byte groß sein. Das Zusammenspiel aus diesen Kanälen kann also **255⁴** Farben darstellen.

### Warum dieses System unvorteilhaft ist

Relevante Faktoren einer Farbe, wie **Helligkeit** oder **Sättigung** der Farbe können nur sekundär konfiguriert werden, indem die Sättigung aller drei Farbkanäle angepasst wird.

> **Beim RGB System kann eine Farbe nur mit Farben (Alphakanal für den Moment irrelevant) generiert werden.**

Was sich im ersten Moment trivial anhört, kann zu einem Problem werden, besonders dann, wenn Programmierer Skripte schreiben müssen, die mit der Sättigung oder der Helligkeit arbeiten sollen und diese eine festen Wert benötigen.

### HSL

**HSL** ist ein alternatives System um Farben zu konvertieren. **HSL** steht für **Hue, Saturation, Luminance**. Die eigentliche Farbe wird hier nur noch über den `Hue Wert` angegeben. Saturation und Luminance sind **Prozentangaben** und so entstehen die entsprechenden Farben. `H` ist in **Grad** angegeben. Der Hue Wert orientiert sich an folgendem Farbkreis:

![image.png](uploads/8fe2bae3dd703fd71acd2146ac907938/image.png){width="457" height="407"}

_(Quelle: **idealo.de** )_

Dieser Grafik kann anschaulich entnommen werden, wie der `H Wert` funktioniert. Mit diesem Konzept lassen sich Farben also um Einiges leichter konfigurieren.

### Eine komplementäre Farbe bilden

Interessant für das Generieren einer komplementären Farbpalette ist einzig und allein das `L` des HSL Farbsystems, denn dieses entscheidet über die **Helligkeit** einer Farbe.

Betrachten wir hierfür klares Weiß: `rgb(255,255,255)` -\> `hsl(0, 0%, 100%)`

Betrachten wir hierfür auch klares Schwarz: `rgb(0,0,0)` -\> `hsl(0, 0%, 0%)`

Was sich verändert ist die Helligkeit und genau das ist der Punkt, warum sich HSL dafür eignet Farbpaletten zu erstellen. Dafür braucht es allerdings ein kleines Regelwerk. In diesem Fall beziehe ich jenes direkt auf unser Projekt. In unserem Projekt verwenden wir 4 verschiedene Farbtypen.

1. Primary - Die Primärfarbe der Seite
2. Background - Der Hintergrund der Seite
3. Text - Die Farbe für Überschriften
4. Text Secondary - Die Farbe für Texte, die keine Überschriften sind

Alle Abstufungen, wie `hover` oder eine Sektionsunterteilung werden bereits über das Front End selbst gerendert. Mehr dazu im entsprechenden [Wiki Eintrag zum Thema Theming](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/wikis/Front-End/Theming).

Für den Moment reicht es sich über zwei wichtige Punkte klar zu sein. Bei Dark Mode Paletten sind Texte meist nah an weiß orientiert, während der Hintergrund sich nah an schwarz bewegt. Bei Light Mode Paletten anders herum. Primärfarben hingegen können alle erdenklichen Farben sein. Um also alles abzudecken erschuf ich folgende Faustformel:

Alles was `L > 50%` entspricht geht Richtung weiß. Alles was `L <= 50%` geht Richtung schwarz. Die Frage ist dann nur noch "Wie weit denn?".

![image.png](uploads/91ed078dca61ce4a094133488e187dd7/image.png){width="938" height="220"}

In diesem Beispiel geht es um eine Hintergrundfarbe.

Für beide Varianten gibt es 50 mögliche Schritte, die die Helligkeit gehen kann. Hat eine Farbe ein `L=25%` fällt Sie in das Spektrum Richtung schwarz. Um den komplementären Ton zu erhalten muss sich L auf `L = 75%` erhöhen. 35 Schritte von der 50% weg.

So kann jeder Case an Differenzen abgedeckt werden und sowohl große Kontraste, wie Textfarben aber auch kleinere, wie jene in Primärfarben angepasst werden.

# Implementierung

Damit ich einen solchen Algorithmus einarbeiten kann, müssen ein paar Vorbereitungen getroffen werden.

### Ändern des Farbformats in root von HEX zu HSL

Zu aller Erst ändere ich das Farbsystem in der `base.css` Datei von HEX zu HSL, damit ist es aber noch nicht getan, denn auch die Farben in der Datenbank müssen entsprechend aktualisiert werden.

```css
/* base.css */

.root {
  /**Primary Colors**/
  --dark-primary: hsl(154, 100%, 43%);
  --dark-primary-hover: hsl(154, 94%, 38%);

  /**Background Colors**/
  --dark-bg-primary: hsl(213, 92%, 7%);
  --dark-bg-secondary: hsl(211, 45%, 12%);
  --dark-bg-tertiary: hsl(240, 86%, 7%);
  --dark-bg-search: hsl(210, 9%, 30%);

  /**Text Colors**/
  --dark-text-primary: hsl(0, 0%, 100%);
  --dark-text-secondary: hsl(210, 27%, 83%);
  --dark-text-tertiary: hsl(154, 100%, 43%);

  /** Weitere nicht relevante Werte **/
}
```

### Konvertieren von HEX zu HSL

Für die Datenbank muss eine Konvertierungs-Funktion geschrieben werden, da HTML Color Picker ihre Werte per Default in `HEX` übergeben und z.B. `colorPrimary: primary.value` eine Hexadezimalzahl speichert. Somit setze ich die Funktion `hexToHsl()` auf, welche wie folgt funktioniert:

```javascript
//light-mode-generator.ts

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
```

Hier der mathematische Hintergrund von mir in Photoshop erstellt, da GitLab keinen LaTeX Support hat:

**Schritt 01: Konvertieren von HEX zu RGB**

![image.png](uploads/9dc8ed6ee97fe521d8b1dc6f030c87b7/image.png){width="372" height="441"}

Auch Hex Codes haben drei verschiedene Werte für RGB, auch wenn man das auf den ersten Blick nicht sieht.

Wie im ersten Semester in GDI bereits thematisiert lassen sich hexadezimale Zahlen über ihre Position mit einer entsprechenden 16er Potenz versehen und so multiplizieren. So kann eine hexadezimale Zahl in eine dezimal Zahl umgewandelt werden.

**Schritt 02: Errechnen des Minimums, des Maximums und des Deltas**

Im nächsten Schritt muss ermittelt werden welcher Farbkanal den höchsten Wert, welcher Farbkanal den niedrigsten Wert hat und das entsprechende Delta gebildet werden.

**Schritt 03: Errechnen von H**

Die Formel für h ist abhängig davon welcher Farbkanal im Maximum gelandet ist. Hier sind die drei Möglichkeiten aufgelistet.

![image.png](uploads/a814247b07ac905fa45714b96d925d5a/image.png){width="594" height="306"}

**Schritt 04: Errechnen von L**

![image.png](uploads/046b61e79f3f75c7682a58486b62d0b8/image.png){width="315" height="152"}

**Schritt 05: Errechnen von S**

![image.png](uploads/66fbf8bc778ae49169d6ed386891fa8a/image.png)

Hier muss gewährleistet werden, dass keine negative Zahl entsteht, daher wird hier die Funktion `Math.abs()` verwendet.

Mit dieser Funktion lässt sich ein Hexwert also konvertieren. Rufe ich diese Funktion im Push auf die Datenbank hoch werden also von nun an HSL Werte in die Datenbank gepusht. Beim fetchen der Farben entsteht hier kein Problem, da `NAME.style.backgroundColor` jedes Farbspektrum erkennt und verwalten kann.

### Komplementäre Palette generieren

Jetzt zum eigentlichen Teil der Aufgabe. Nun geht es darum die gesammelten Erkenntnisse in eine Funktion zu packen. Diese sieht folgt aus:

```javascript
//light-mode-generator.ts

// Komplementäre Farbpalette generieren
export function generateComplementaryColor(color:string | undefined) {

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
  if(l <= 50){
    compare = 50;
    result = Math.abs(l - compare);
    result = result + compare;
  }
  // Wenn l größer als 50 ist, geht die Farbe Richtung weiß
  else if (l > 50){
    compare = 100;
    result = Math.abs(l - compare);
  }

  //Neuen L Wert in HSL einsortieren einsortieren
  const newHSL = `hsl(${h}, ${s}%, ${result}%)`
  console.log(newHSL);

  // Ergebnis ausgeben
  return newHSL;
}
```

Das Zusammenspiel aus beiden Funktionen kann nun auf der Konfigurationsseite des Admin Panels aufgerufen werden.

```javascript
//konfiguration/index.vue

// Light Mode Constants
const lightPrimary = ref(
  hslToHex(generateComplementaryColor(data.value?.colorPrimary)),
);
const lightBackground = ref(
  hslToHex(generateComplementaryColor(data.value?.colorBackgroundSecondary)),
);
const lightTextPrimary = ref(
  hslToHex(generateComplementaryColor(data.value?.colorTextPrimary)),
);
const lightTextSecondary = ref(
  hslToHex(generateComplementaryColor(data.value?.colorTextSecondary)),
);
```

Auf der Website sieht das Ergebnis dann so aus:

![image.png](uploads/e060bbe0a39fed4e35ad0c93ef703cdb/image.png){width="247" height="325"}

Wie man sehen kann, geht die Rechnung auf und die Gegenpalette wird generiert.

Über die bereits bestehende `onSave()` Funktion lassen sich die neuen Farben nun auch in die Datenbank pushen.

```javascript
//konfiguration/index.vue

async function onSave() {
  const success = await patchSettings({
    // Dark Mode Colors
    colorPrimary: hexToHsl(primary.value),
    colorBackgroundSecondary: hexToHsl(backgroundSecondary.value),
    colorTextPrimary: hexToHsl(textPrimary.value),
    colorTextSecondary: hexToHsl(textSecondary.value),

    // Light Mode Colors
    colorLightPrimary: hexToHsl(lightPrimary.value),
    colorLightBackground: hexToHsl(lightBackground.value),
    colorLightTextPrimary: hexToHsl(lightTextPrimary.value),
    colorlightTextSecondary: hexToHsl(lightTextSecondary.value),
  });

  // Weiterer Code //
}
```

### Das Front End abstimmen

Als letzten Schritt muss dem Front End nur noch übergeben werden, ob gerade der Light oder der Dark Mode aktiv ist und dann das entsprechende Color Theme geladen werden. Der bereits designte `Light-Dark-Switch Button` muss mit einer Logik versehen, die den Mode wechselt. Hierfür kann die entsprechende root Klasse des Browser Fensters angesprochen werden.

```javascript
onMounted(() => {
  const toggleBtn = document.getElementById("toggle-button");
  const root = document.documentElement; // Das <html>-Tag

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      // Prüfen, ob der Dark Mode aktiv ist
      const isDarkMode = root.classList.contains("dark");

      if (isDarkMode) {
        root.classList.remove("dark");
        root.classList.add("light");
        console.log("Switched to Light Mode");
      } else {
        root.classList.remove("light");
        root.classList.add("dark");
        console.log("Switched to Dark Mode");
      }
    });
  } else {
    console.error("Button not found!");
  }
});
```

Das es funktioniert sehe ich daran, dass in der Konsole der richtige Output ausgegeben wird und daran, dass sich die Vue Dev Tools von Dark zu Light ändern.

Nun bei jedem Element im Front abgefragt werden ob das html Tag die Klasse `light` enthält und so kann der Modus gewechselt werden.

Hier noch ein Beispiel zwischen einer Dark Mode Palette und der dazu generierten Light Mode Palette:

### Dark Mode Palette

![image.png](uploads/40ae9ecd840bf8e1aff2b840c63a19cf/image.png){width="925" height="469"}

### Light Mode Palette

![image.png](uploads/344aa9c194d603d255c8fb8292557a6a/image.png){width="1395" height="714"}

---

**Nachtrag:** Im weiteren Verlauf der Entwicklung wurde der Light Dark Switch Button in eine gesonderte Komponente ausgelagert. Entsprechend verdient dieser seinen [eigenen Wiki Eintrag](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/wikis/Front-End/Light-Dark-Switch-Button).
