---
title: Detailseite-Results
---

# Einleitung

In diesem Wiki Eintrag wird es um die Implementierung einer dynamischen Detailseite für die Results gehen, die dafür gedacht ist weitere Informationen über Produkte anzeigen zu können und die AI weiter in den Userflow zu integrieren, indem Für das einzelne Produkt ein weiterer Prompt generiert werden kann.

Der Arbeitsprozess für diese Komponente ist zweigeteilt. Den Anfang macht @31699 damit die UI der Detailseite zu implementieren. @31466 wird danach die Back End Integration übernehmen.

# UI

## Theorie

Um meine Vorstellung einer Detailseite erstmals zu visualisieren, habe ich eine einfache Zeichnung angelegt.

![Sketch.jpg](uploads/8dcf296fd3a7ce4f942c005618af5351/Sketch.jpg)

Dieses Beispiel verfolgt das klassische Shop Layout, wo das Produkt im Vordergrund steht und entsprechend etwas weniger als die Hälfte des Views einnimmt. Der Name des Produkts ist bold und in prominenter Schriftgröße. Darunter folgen Tags und eine kurze Beschreibung. Testhalber plane ich zwei Button mit ein, von denen ich nicht sicher bin, ob wir diese final verwenden werden oder nicht.

Darunter folgt dann die Produkt spezifische AI Response im gewohnten Container.

## Implementierung

Dadurch, dass wir nun eine weitere Unterseite im Front End haben, muss sich die Nutzerführung auf den entsprechenden Unterseiten anpassen. Das bedeutet konkret, dass die Navbar einen Zurück Button benötigt. Mehr zum "Zurück zur Startseite Button" im [entsprechenden Wiki Eintrag](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/wikis/Front-End/Zur%C3%BCck-zur-Startseite-Button).

Nachdem die angepasste Navbar also eingearbeitet wurde, kann damit begonnen werden das geplante Layout umzusetzen. Hierbei entstanden keine Besonderheiten, es handelt sich um ein gewöhnliches, mit Flexbox erstelltes Layout:

```xml
<div>
            <div class="content-container-detail flex gap-lg jc-ai-center">
                <img
                src="@/assets/graphics/mock.webp"
                alt="Mock Image"
                >
                <div class="flex flex-column jc-ai-start gap">
                    <div class="flex gap jc-start-ai-center">
                        <h1>Titel des Produkts</h1>
                        <div class="label-result">Best</div>
                    </div>

                    <div class="text-xl">
                        <div class="mt-2 flex gap jc-start-ai-center">
                            <div
                            class="dot"
                            ></div>
                            <div class="dot-element-text">
                            Type: <b>Computers</b>
                            </div>
                        </div>

                        <div class="mt-1 flex gap jc-start-ai-center">
                            <div
                            class="dot"
                            ></div>
                            <div class="dot-element-text">
                            Processor:
                            <b>AMD Ryzen 9</b> | RAM:
                            <b>128GB</b> | Storage:
                            <b>1TB HDD + 512GB SSD</b>
                            | Graphics:
                            <b
                                >NVIDIA GeForce RTX 3080</b
                            >
                            </div>
                        </div>
                    </div>
                    <p class="text-xl">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                    <div class="flex gap">
                        <button class="detail-button">Button 1</button>
                        <button class="detail-button">Button 2</button>
                    </div>
                    <div class="mt response-box-detail flex jc-ai-center dark-subheading relative">
                        <div class="shade-layer absolute full-size-percent"></div>
                        <!-- eslint-disable-next-line vue/no-v-html -->
                        <div class="dark-subheading color-response-card z-2 text-xl">
                            Basierend auf dem angebebenen Prompt ist dieses Modell mit unter am besten geeignet, weil der Computer folgende Kritierien erfüllt:
                            <br>
                            <br>
                            <b>Kriterium 1</b><br>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,                            <br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
```

Selbiges gilt auch für das Styling der Seite:

```css
.detail-button {
  font-size: 1.2rem;
  background-color: var(--dark-primary);
  color: var(--dark-text-primary);
  padding: 16px 100px;
  border-radius: 1000px;
  border: none;
}

html.light .detail-button {
  font-size: 1.2rem;
  background-color: var(--light-primary);
  color: var(--dark-text-primary);
  padding: 16px 100px;
  border-radius: 1000px;
  border: none;
}

.detail-button:hover {
  cursor: pointer;
}

.dot-element-text {
  color: var(--dark-text-secondary);
}

html.light .dot-element-text {
  color: var(--light-text-secondary);
}

.dot-element-text b {
  color: var(--dark-text-primary);
}

html.light .dot-element-text b {
  color: var(--light-text-primary);
}

.response-box-detail {
  border: 2px solid var(--dark-primary);
  padding: var(--gap);
  width: 80%;
  min-height: 12vh;
  border-radius: var(--border-radius-default);
}

.content-container-detail {
  padding-left: 20px;
}

.content-container-detail h1 {
  color: var(--dark-text-primary);
}

html.light .content-container-detail h1 {
  color: var(--light-text-primary);
}

.content-container-detail p {
  color: var(--dark-text-primary);
}

html.light .content-container-detail p {
  color: var(--light-text-primary);
}

.detail-container {
  height: 100vh;
  width: 100%;
  background-color: var(--dark-bg-secondary);
}

html.light .detail-container {
  height: 100vh;
  width: 100%;
  background-color: var(--light-bg-secondary);
}

.detail-container img {
  height: 70vh;
  width: 45vw;
}

.detail-container p {
  width: 70%;
}
```

@31699

# Back End

\[Text folgt\]
