<script setup lang="ts">
// Custom Layout, um nicht das Admin Layout zu erhalten
definePageMeta({
  layout: "custom",
});
</script>

<template>
  <div class="detail-container flex flex-column">
    <div class="py-3 flex jc-space-between-ai-center">
      <DetailBackButtonComponent />
      <LightDarkSwitchComponent />
    </div>

    <div>
      <div class="content-container-detail flex gap-lg jc-ai-center">
        <img src="@/assets/graphics/mock.webp" alt="Mock Image" />
        <div class="flex flex-column jc-ai-start gap">
          <div class="flex gap jc-start-ai-center">
            <h1>Titel des Produkts</h1>
            <div class="label-result asap">Best</div>
          </div>

          <div class="text-xl">
            <div class="mt-2 flex gap jc-start-ai-center">
              <div class="dot"></div>
              <div class="dot-element-text">Type: <b>Computers</b></div>
            </div>

            <div class="mt-1 flex gap jc-start-ai-center">
              <div class="dot"></div>
              <div class="dot-element-text">
                Processor:
                <b>AMD Ryzen 9</b> | RAM: <b>128GB</b> | Storage:
                <b>1TB HDD + 512GB SSD</b>
                | Graphics:
                <b>NVIDIA GeForce RTX 3080</b>
              </div>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </p>
          <div
            class="mt response-box-detail flex jc-ai-center dark-subheading relative"
          >
            <div class="shade-layer absolute full-size-percent"></div>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="dark-subheading color-response-card z-2 text-xl">
              Basierend auf dem angebebenen Prompt ist dieses Modell mit unter
              am besten geeignet, weil der Computer folgende Kritierien erfüllt:
              <br />
              <br />
              <b>Kriterium 1</b><br />
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
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
  font-family: "asap", sans-serif;
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
  overflow-y: scroll;
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
</style>
