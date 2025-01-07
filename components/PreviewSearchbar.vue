<script></script>

<template>
  <form class="flex preview-form" action="">
    <input type="text" />
    <button class="preview-send-btn">
      <i class="pi pi-search"></i>
    </button>
  </form>
</template>

<style>
.preview-form * {
  background-color: rgb(65, 66, 66);
  color: white;
}

.preview-form button {
  width: 70px;
  border-top-right-radius: 1000px;
  border-bottom-right-radius: 1000px;
  border: none;
}

.preview-form input {
  height: 65px;
  font-size: 18px;
  padding-left: 20px;
  border-top-left-radius: 10000px;
  border-bottom-left-radius: 10000px;
  border: none;
}
.preview-form input:focus {
  outline: none;
}

.preview-form i {
  width: 100%;
  font-size: 20px;
}
</style>
