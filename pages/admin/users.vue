<script setup lang="ts">
await $fetch<User[]>("/api/users");
</script>

<template>
  <div>
    Page: admin/users
  </div>
</template>

<style scoped></style>
