<script>
export default {
  data() {
    return {
      primary: "#00DC82",
      backgroundPrimary: "#021025",
      backgroundSecondary: "#0F1F31",
      backgroundTertiary: "#020420",
      textPrimary: "#FFFFFF",
      textSecondary: "#CBD5E1",
      textTertiary: "#00DC82",
    };
  },
};
</script>

<template>
  <div>
    <h2>Konfiguration</h2>
    <p>
      Auf dieser Seite können Konfiguraiton über das Aussehen und Verhalten der
      Seite festgelegt werden.
    </p>

    <h3>Preview</h3>
    <div
      class="preview-container flex flex-column jc-ai-center"
      :style="{ backgroundColor: backgroundSecondary }"
    >
      <h2 :style="{ color: textPrimary }">Das ist der Titel</h2>
      <p :style="{ color: textSecondary }">Das ist Bottom Text</p>
      <button class="">Das ist ein Button</button>
    </div>
    <h3>Farbpalette</h3>
    <div class="flex jc-around-ai-center gap">
      <div class="flex flex-column jc-ai-center color-field">
        <ColorPicker v-model="primary" name="primaryColor" />
        <p>Primary</p>
      </div>

      <div class="flex flex-column jc-ai-center color-field">
        <ColorPicker v-model="backgroundPrimary" name="backgroundPrimary" />
        <p>Hintergrund 1</p>
      </div>

      <div class="flex flex-column jc-ai-center color-field">
        <ColorPicker v-model="backgroundSecondary" name="backgroundSecondary" />
        <p>Hintergrund 2</p>
      </div>

      <div class="flex flex-column jc-ai-center color-field">
        <ColorPicker v-model="backgroundTertiary" name="backgroundTertiary" />
        <p>Hintergrund 3</p>
      </div>

      <div class="flex flex-column jc-ai-center color-field">
        <ColorPicker v-model="textPrimary" name="textPrimary" />
        <p>Text 1</p>
      </div>

      <div class="flex flex-column jc-ai-center color-field">
        <ColorPicker v-model="textSecondary" name="textSecondary" />
        <p>Text 2</p>
      </div>

      <div class="flex flex-column jc-ai-center color-field">
        <ColorPicker v-model="textTertiary" name="textTertiary" />
        <p>Text 3</p>
      </div>
    </div>
  </div>
</template>

<style>
.preview-container {
  height: 70vh;
  width: 75%;
  border-radius: var(--border-radius-default);
  box-shadow: var(--box-shadow);
}

.p-colorpicker-preview {
  height: 50px !important;
  width: 50px !important;
  border-radius: 1000px !important;
  box-shadow: var(--box-shadow);
}

.color-field {
  width: 100px;
}
</style>
