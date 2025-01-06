<script></script>

<template>
  <div
    class="redesign-nav-preview-content-container flex flex-column jc-ai-center"
  >
    <h2 :style="{ color: headingColor }">
      Das ist der <span :style="{ color: primaryColor }">Titel</span>
    </h2>
    <p :style="{ color: textColor }">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, sequi
      eligendi modi minus veritatis quasi. Est veniam at laborum, excepturi eum
      natus dolorum velit repudiandae. Laudantium quas provident ab facilis quos
      culpa, impedit deleniti atque cupiditate eos iure, totam officia
      reprehenderit vitae sint odio quis qui aut pariatur consequatur placeat
      consequuntur, harum facere inventore. Ullam nihil unde corrupti quidem
      quo.
    </p>
    <div class="flex jc-ai-center gap">
      <button
        class="button-preview rounded"
        :style="{ backgroundColor: 'white' }"
      >
        Das ist ein runder Button
      </button>
      <button class="button-preview" :style="{ backgroundColor: 'white' }">
        Das ist ein eckiger Button
      </button>
    </div>
  </div>
</template>

<style>
.redesign-nav-preview-content-container {
  background-color: var(--dark-bg-secondary);
  flex-grow: 1;
  text-align: center;
}
.redesign-nav-preview-content-container p {
  width: 80%;
}
</style>
