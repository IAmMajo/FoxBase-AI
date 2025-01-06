<script>

</script>

<template>
  <button class="flex jc-ai-center">
    <div class="preview-icon-container relative flex jc-ai-center">
      <div class="darkening-layer-secondary absolute full-size-percent"></div>
      <i :style="{ color: 'white' }" class="pi pi-sun"></i>
    </div>
  </button>
</template>

<style>
.preview-container-redesign nav button {
  height: 60%;
  border-radius: 6px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  background: none;
}

.preview-icon-container {
  height: 40px;
  width: 40px;
}

.preview-icon-container i {
  font-size: 22px;
  font-weight: 500;
}
</style>
