<script>
export default {
  data() {
    return {
      primary: "#00DC82",
      backgroundSecondary: "#0F1F31",
      textPrimary: "#FFFFFF",
      textSecondary: "#CBD5E1",
    };
  },
};
</script>

<template>
  <div>
    <h2>Konfiguration</h2>
    <p>
      Auf dieser Seite können Konfigurationen über das Aussehen und Verhalten der
      Seite festgelegt werden.
    </p>

    <h3>Preview</h3>


    <div class="flex gap">


      <div
      class="preview-container flex flex-column jc-ai-center"
      :style="{ backgroundColor: backgroundSecondary }"
    >
      <h2 :style="{ color: textPrimary }">Das ist der Titel</h2>
      <p :style="{ color: textSecondary }">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, sequi
        eligendi modi minus veritatis quasi. Est veniam at laborum, excepturi
        eum natus dolorum velit repudiandae. Laudantium quas provident ab
        facilis quos culpa, impedit deleniti atque cupiditate eos iure, totam
        officia reprehenderit vitae sint odio quis qui aut pariatur consequatur
        placeat consequuntur, harum facere inventore. Ullam nihil unde corrupti
        quidem quo.
      </p>
      <div class="flex jc-ai-center gap">
        <button
          class="button-preview rounded"
          :style="{ backgroundColor: primary }"
        >
          Das ist ein runder Button
        </button>
        <button class="button-preview" :style="{ backgroundColor: primary }">
          Das ist ein eckiger Button
        </button>
      </div>
    </div>


    <div class="flex flex-column" style="width: 22%;">
      <h5>Farbpalette</h5>
      <div class="flex jc-around-ai-center gap flex-wrap">
        <div class="flex flex-column jc-ai-center color-field">
          <input
          type="color"
          id="primary"
          v-model="primary"
          />
          <label for="primary">Primary</label>
        </div>
  
        <div class="flex flex-column jc-ai-center color-field">
          <input
          type="color"
          id="backgroundSecondary"
          v-model="backgroundSecondary"
          />
          <label for="backgroundSecondary">Hintergrund</label>
        </div>
  
        <div class="flex flex-column jc-ai-center color-field">
          <input
          type="color"
          id="textPrimary"
          v-model="textPrimary"
          />
          <label for="textPrimary">Überschriften</label>
        </div>
  
        <div class="flex flex-column jc-ai-center color-field">
          <input
          type="color"
          id="textSecondary"
          v-model="textSecondary"
          />
          <label for="textSecondary">Texte</label>
        </div>
      </div>

    </div>

    </div>



    

    
  </div>
</template>

<style>
.button-preview {
  margin-top: 20px;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  color: var(--light-text-primary);
  cursor: pointer;
}

.rounded {
  border-radius: var(--border-radius-full);
}

.preview-container {
  height: 70vh;
  width: 75%;
  padding: 0 10%;
  border-radius: var(--border-radius-default);
  box-shadow: var(--box-shadow);
}

.color-field {
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.color-field label{
  font-size: 16px;
}

input[type="color"] {
  width: 50px;
  height: 50px;
  border: none;
  cursor: pointer;
}
</style>
