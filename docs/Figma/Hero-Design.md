---
title: Hero Design
---
# Einleitung

In diesem Wiki Eintrag wird thematisiert, wie der Hero des Projekts konzipiert wurde. In diesem Eintrag wird es ebenfalls über den bereits erstellten [3D Hintergrund](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/wikis/Spline/3D-Elemente-im-Hero) gehen.

# Warum ein Hero?

Ein Hero Element nimmt in der Regel so gut wie den gesamten ersten View der Seite ein und ist entweder dafür da, den User über das Produkt zu informieren oder eine für das Produkt notwendige Aktion hervorzuheben. Zweites ist für unser Projekt der Fall.er User muss einen Suchprompt eingeben. Vorher kann auch nichts passieren. Die API wird nachdem ein Prompt abgesendet wird angesprochen und erst danach erscheinen erste Resultate. Ein Hero macht also Sinn.

# Konzeption

Ein Hero ist meist sehr auffällig und enthält diverse Besonderheiten, um die Seite visuell hervorzuheben. In diesem Fall sind zwei Besonderheiten angesetzt. Das 3D Element im Hintergrund sorgt bereits dafür, dass die Aufmerksamkeit des Users geweckt wird. Des Weiteren wird eine gesonderte Schriftgröße verwendet für die Headline der Seite verwendet. Sie ist besonders groß und somit auffälliger (2rem größer, als das h1 Element).

Dieser Sketch zeigt das angesetzte Layout des Heros.

![HeroSketch](uploads/7e8bddb2fe6f97864b6567953f9c6c9c/HeroSketch.jpg)

Eine auf den ersten Moment sehr einfache Zeichnung, aber hier sind bereits diverse Informationen enthalten. Die Elemente sind zentriert. ganz oben steht ein besonders großer Header, darunter ein Subheader (h1), der über eine Call to Action dazu verleitet einen Prompt einzugeben. Darunter befindet sich eine recht prägnante Searchbar.

# Aufbau im Figma Board

Da sowohl das [3D Element](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/wikis/Spline/3D-Elemente-im-Hero), wie auch die [Farbpaletten](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/wikis/Figma/Aufbau-des-Figma-Projekts) bereits fertig sind, war das Zusammensetzen im Prototypen sehr leicht.

![image](uploads/a2c4159a1dba91b74f1fcdceb1354080/image.png){width="573" height="289"}

Hier entstand noch eine weitere Idee, seitens der Schriften im Hero. Alle Elemente im Hero haben einen Drop-Shadow, um sich ein bisschen abzuheben. Des Weiteren sind die Satzenden mit der entsprechenden Primary Farbe unterstützt.

# Responsive Design

Der Hero unterscheidet sich auf Mobilgeräten nicht vom Desktop Design.

![image](uploads/de9d76d2042add4183f8d997fbf3f112/image.png){width="163" height="338"}

## Nachtrag - Anderer Hintergrund

Wie auch bereits im Wiki Eintrag [3D Element](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/wikis/Spline/3D-Elemente-im-Hero) angeschnitten, lässt sich der Hero nicht so frei gestalten, wie wir uns für das Projekt gewünscht hätten. Also muss eine andere Idee entworfen werden, die primär auf CSS aufbaut, damit möglichst viel frei gestaltet werden kann.

Wichtig ist, dass sich im Hero etwas bewegt. Im späteren Verlauf der Arbeiten lassen sich variable Varianten implementieren, damit der User selbst entscheiden kann, ob er bewegliche Elemente auf dem Front End anzeigen möchte.

Als Auftakt des Heros soll ein Wellenmuster entstehen, das sich von rechts nach links bewegt. Eine Welle in der Primärfarbe kann dafür sorgen den Hero von den unteren Sektionen zu unterteilen.

Diese erste Zeichnung zeigt eine erste Idee:

![HeroWaveSketch.jpg](uploads/b11131b0b6344d4439854164a0bb39c4/HeroWaveSketch.jpg)

Die Zahlen symbolisieren verschiedene Ebenen. Wellen übereinander suggerieren mehr Tiefe.

In Figma umgesetzt sieht diese Idee so aus:

![image.png](uploads/c6a3e7ab6f90254176294d985e30085d/image.png){width="718" height="423"}

Die Implementierung des Heros kann im [entsprechenden Wiki Eintrag](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/wikis/Front-End/Hero-Implementierung) nachgelesen werden.