# Einleitung

In diesem Wiki Eintrag wird thematisiert, wie ein Button geplant und implementiert werden kann, der zwischen Light und Dark Mode wechselt. Dies geschieht über die Rootklassen des HTML Tags.

# Theorie

Der Button soll, wenn auf diesen geklickt wird überprüfen, ob das HTML Tag (ansprechbar über `document.documentElement` die Klasse `dark` enthält oder nicht. Falls ja, soll die Klasse entfernt und die Klasse `light` hinzugefügt werden. 

# Implementierung

Nachdem das Sonnen Icon importiert wurde, kann über das `onMounted` Paradigma von VueJS der EventHandler geschrieben werden:

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
        } else {
            root.classList.remove("light");
            root.classList.add("dark");
        }
        });
    } else {
        console.error("Button not found!");
    }
    });
```

Im Template Bereich passiert recht wenig, es reicht ein Div mit dem entsprechenden Sonnen Icon drin:

```xml
<!--Light / Dark Button-->
    <div id="toggle-button" class="light-dark-switch flex jc-ai-center z-2">
        <div class="nav-icon-container flex jc-ai-center">
            <SunIcon />
        </div>
    </div>
```

Beim Styling wurde sich eine kleine Besonderheit ausgedacht, denn das Icon dreht sich, wenn über den Button gehovert wird:

```css

.light-dark-switch {
  margin-right: var(--gap);
  background-color: var(--dark-bg-secondary);
  height: 4vh;
  width: 4vh;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--box-shadow);
}

.light-dark-switch:hover .nav-icon-container {
  cursor: pointer;
  transform: rotate(160deg);
}

html.light .light-dark-switch {
  margin-right: var(--gap);
  background-color: var(--light-bg-secondary);
  height: 4vh;
  width: 4vh;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--box-shadow);
}
```

---

Dieser Wiki Eintrag entsteht im Rahmen eines weitern Eintrages über die [Generierung einer komplementären Farbpalette](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/wikis/Front-End/Generierung-einer-komplement%C3%A4ren-Palette).