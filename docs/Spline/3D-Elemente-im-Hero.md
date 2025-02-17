---
title: 3D Elemente im Hero
---
# Einleitung

In diesem Wikieintrag wird thematisiert, wie mit Hilfe von Spline leuchtende 3D Stripes entworfen werden, die dann im Hero der Seite verwendet werden können.

# Konzeption

### Planung

Angesetzt sind mehrere grüne Stripes, die eine Art "Kabelkombination" ergeben. Diese grünen Stripes reflektieren auf einen dunklen oder hellen Hintergrund (basierend darauf, ob Light oder Dark Mode verwendet wird).

### Erste Zeichnung

Eine erste Zeichnung zeigt ein sehr einfach gehaltenes Konzept. ![Sketch](uploads/47b6f23656242750c46e47cabcaa6467/Sketch.jpg)

# Spilne

Nach der ersten Konzeptionsphase wurde bereits eine erste Idee umgesetzt.

### Hintergrund

Damit die Stripes etwas mehr "Räumlichkeit" enthalten können, sollten sie eine Wand anstrahlen können. Hierfür wurde ein Würfelobjekt erstellt und in die Länge gezogen.

![image](uploads/28011804ae6bd3f3d95b4a7a7d3b845b/image.png){width="1059" height="603"}

Materialen und weitere Werte, werden zu einem späteren Zeitpunkt angepasst.

### Path Objekt

Ein "Kabel" ist ein sehr abstraktes Objekt und lässt sich in seiner vielseitigkeit nur schlecht mit einem Würfel oder einer Kugel darstellen. Deswegen wurde hier das Vektor-Path Tool verwendet, um so eine solche Form zu modellieren. Die Ecken des Vektors wurden stark geglättet, was dazu führt, dass sich eine "Wellenform" gebildet hat.

![image](uploads/4da2b35ecb91378fd15847def9e21f67/image.png){width="901" height="496"}

### Custom Shape

Im nächsten Schritt soll der Vektor seine Runde Form verlieren und in etwas abstrakteres übergehen. Hierfür muss eine Shape über einen weiteren, allerdings zweidimensionalen Vektor einfügt werden.

![image](uploads/8d675a8134ac829dd16775354e59a330/image.png){width="99" height="184"}

Diese Shape kann nun mit dem Ausgangsvektor verbunden werden. Danach sieht der Vektor wie folgt aus: ![image](uploads/d0334ae6e85b8383c7a670ee42295ab3/image.png){width="1138" height="657"}

An diesem Punkt wurde sich gegen "Kabel", aber für eine Erweiterung des aktuellen Standes entschieden. Nachdem der Vektorgrafik weitere "Zacken" hinzugefügt wurden, ergab sich dieses Ergebnis:

![image](uploads/e95862fb5f8b6de5f0ac5f48b63e1b98/image.png){width="1152" height="627"}

### Farben und Materialien

Nachdem die Farben aus dem Figma Identity Board importiert wurden, wurde der Wand ein weißlicher Hintergrund geben und die Lichtreflektionsempfindlichkeit erhöht. Vektor wurden insgesamt 8 unterschiedliche Gradiant Stufen verleiht. Dadurch ergab sich dieses Zwischenergebnis:

![Screenshot_2024-10-22_224655](uploads/6e660cbeb9b54feb04dc6a523b67111a/Screenshot_2024-10-22_224655.png)

### Bewegung

Damit sich der Vektor in einem bestimmten Intervall bewegen kann muss der Start und der Zielstate des Vektors festgelegt werden. Danach muss eine Frameanzahl bestimmt werden, die darüber entscheidet, wie viele Frames pro Sekunde gerendert werden, um vom einen State in den anderen zu gelangen. Was zu diesem Ergebnis geführt hat:

![2024-10-22_22-57-22](uploads/fd8df3e8d85e39ca5330e25caa25e337/2024-10-22_22-57-22.mp4)

### Platzieren einer Kamera

Damit die Illustration im Web angezeigt werden kann, muss übergeben werden aus welchem Blickwinkel die Kamera sichtbar sein soll. Hierfür kann ein neues Kamera Element hinzugefügt und konfiguriert werden.

Somit entsteht im Editor dieses Ergebnis:

**Light Mode**

![2024-10-26_09-42-56](uploads/d88a06c56051cdf9106fa4d739d7d9de/2024-10-26_09-42-56.mp4)

**Dark Mode**

![2024-10-26_09-44-01](uploads/02ea93814239f934cd44603579da7c61/2024-10-26_09-44-01.mp4)

# Import in Figma/VueJS

Spline stellt ein Script Tag bereit, welches die Illustration basierend auf der Kamera exportiert. Mit dem Anigma Plugin kann die Illustration in Figma eingebunden werden. Alternativ kann VueJS mit dem package vue-spline direkt mit diesem Script Tag umgehen.

### Anmerkung

Leider hat es diese Komponente nicht in das finale Projekt geschafft, was Einzig und allein daran gelegen hat, dass die Spline Views mit VueJS nicht customizable sind. In einer NEXTJS Umgebung wäre dies möglich gewesen, aber ich bin mir sicher, dass ich diesen View in einem anderen Projekt verwenden kann. 