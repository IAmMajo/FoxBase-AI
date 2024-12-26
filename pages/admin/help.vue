<script lang="ts" setup>
function toggleDarkMode() {
  document.documentElement.classList.toggle("my-app-dark");
}
</script>

<template>
  <h1>Hilfe</h1>
  <p>Hier könnten Datenschutz und Impressum unseres Produkts stehen</p>
  <!--
      <Card>
        <template #title>Hilfe</template>
        <template #content>

          <div><Button label="Toggle Dark Mode" @click="toggleDarkMode()" /></div>
        </template>
      </Card>
  -->
</template>