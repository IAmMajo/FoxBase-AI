<script lang="ts" setup>
function toggleDarkMode() {
  document.documentElement.classList.toggle("my-app-dark");
}
</script>

<template>
  <Card>
    <template #title>Hilfe</template>
    <template #content>
      <p class="m-0">
        Benötigen Sie Hilfe? Dann kontaktieren Sie uns doch über
        testmail@test.com.
      </p>
      <div><Button label="Toggle Dark Mode" @click="toggleDarkMode()" /></div>
    </template>
  </Card>
</template>
