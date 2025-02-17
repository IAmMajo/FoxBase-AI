<!---
Copyright 2025 Alina Marie Hartmann, Max Josef Overlack, Nils Paaßen,
Nico Puelacher, Hanna Steffen, Lena Weuste

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

<script setup lang="ts">
const { product } = defineProps<{
  product: Product;
  index: number;
}>();

const isLiked = ref(false);
const isDisliked = ref(false);

const query = new URLSearchParams();
const q = new URLSearchParams(location.search).get("q")!;
query.set("q", q);
query.set("label", getLabel(product.score!));

function onArrowUpClicked() {
  if (isLiked.value) {
    isLiked.value = false;
    sendFeedback(q, product, -1);
  } else {
    isLiked.value = true;
    isDisliked.value = false;
    sendFeedback(q, product, 1);
  }
}

function onArrowDownClicked() {
  if (isDisliked.value) {
    isDisliked.value = false;
    sendFeedback(q, product, 1);
  } else {
    isDisliked.value = true;
    isLiked.value = false;
    sendFeedback(q, product, -1);
  }
}

// Funktion, um das Label basierend auf dem Produkt-Score zu bestimmen
function getLabel(score: number): string {
  if (score > 0.8) return "Best";
  if (score > 0.5) return "Better";
  return "Good";
}
</script>

<template>
  <div data-aos="fade-up">
    <span v-if="index != 0" class="horizontal-line" />
    <NuxtLink
      :to="`/products/${product.id}?${query}`"
      class="result-card flex jc-ai-center gap"
      @click="sendFeedback(q, product, 1)"
    >
      <div class="left-mobile flex flex-column">
        <div class="img-container flex jc-ai-center">
          <img
            class="default-image"
            src="./../assets/defaultImage.svg"
            alt="default image"
          />
        </div>
        <div class="feedback-mobile flex">
          <svg
            class="arrowUp"
            :class="{ likedStyle: isLiked }"
            width="14"
            height="16"
            viewBox="0 0 13 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            @click.prevent="onArrowUpClicked"
          ></svg>
          <svg
            class="arrowDown"
            :class="{ dislikedStyle: isDisliked }"
            width="14"
            height="16"
            viewBox="0 0 13 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            @click.prevent="onArrowDownClicked"
          ></svg>
        </div>
      </div>
      <div class="info-card flex flex-column gap">
        <div class="flex jc-start-ai-center gap">
          <p class="title bold-sm-text dark-heading no-spacing">
            {{ product.name }}
          </p>

          <label class="label-result" for="">{{
            getLabel(product.score!)
          }}</label>
        </div>

        <div
          v-if="product.category || product.attributes"
          class="flex flex-column gapSmall"
        >
          <div v-if="product.category" class="category-attributes flex">
            <span class="dot" />
            <p class="dark-bottomtext no-spacing">
              Type: <span class="dark-heading">{{ product.category }}</span>
            </p>
          </div>
          <span
            v-if="product.category && product.attributes"
            class="line-mobile"
          />
          <div v-if="product.attributes" class="category-attributes flex">
            <span class="dot" />
            <div class="attributes flex gapSmall">
              <template
                v-for="(value, key, indexAttributes) in product.attributes"
                :key="key"
              >
                <span v-if="indexAttributes != 0" class="vertical-line" />
                <p class="dark-bottomtext no-spacing">
                  {{ key }}:
                  <span class="dark-heading">{{ value }}</span>
                </p>
              </template>
            </div>
          </div>
        </div>
        <div v-if="product.typicalUseCases" class="use-cases flex gap">
          <p
            v-for="(useCase, indexUseCase) in product.typicalUseCases"
            :key="indexUseCase"
            class="light-highlight no-spacing"
          >
            {{ useCase }}
          </p>
          <div class="feedback flex">
            <svg
              class="arrowUp"
              :class="{ likedStyle: isLiked }"
              width="14"
              height="16"
              viewBox="0 0 13 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              @click.prevent="onArrowUpClicked"
            >
              <path
                d="M4.0197 12.7831V7.57207C4.0197 7.05001 3.59649 6.62759 3.07443 6.62759H2.24752C1.39231 6.62759 0.976724 5.58236 1.59844 4.99512L6.06249 0.778662C6.42023 0.440767 6.97736 0.433845 7.34338 0.762746L12.0357 4.97921C12.6804 5.55849 12.2706 6.62759 11.4039 6.62759H10.0453C9.52325 6.62759 9.10003 7.05001 9.10003 7.57207V12.7831C9.10003 14.6465 4.0197 14.6465 4.0197 12.7831Z"
                stroke="#cbd5e1"
                stroke-width="1"
              />
            </svg>
            <svg
              class="arrowDown"
              :class="{ dislikedStyle: isDisliked }"
              width="14"
              height="16"
              viewBox="0 0 13 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              @click.prevent="onArrowDownClicked"
            >
              <path
                d="M9.72053 2.57819V7.78926C9.72053 8.31132 10.1437 8.73374 10.6658 8.73374H11.4927C12.3479 8.73374 12.7635 9.77897 12.1418 10.3662L7.67774 14.5827C7.32001 14.9206 6.76288 14.9275 6.39686 14.5986L1.70453 10.3821C1.05987 9.80284 1.46965 8.73374 2.33634 8.73374H3.69493C4.21699 8.73374 4.6402 8.31132 4.6402 7.78926V2.57819C4.6402 0.714822 9.72053 0.714822 9.72053 2.57819Z"
                stroke="#cbd5e1"
                stroke-width="1"
              />
            </svg>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<style>
:root {
  --color-line: color-mix(in srgb, var(--dark-bg-search), transparent 30%);
  --result-card-width: 50vw;
  --result-card-height: 22vh;
  --padding-result-card: 4vh 0;
}

html.light :root {
  --color-line: color-mix(in srgb, var(--light-bg-search), transparent 30%);
  --result-card-width: 50vw;
  --result-card-height: 22vh;
  --padding-result-card: 4vh 0;
}

.gapSmall {
  gap: 8px;
}

.label-result {
  background-color: var(--dark-primary);
  color: var(--dark-text-primary);
  padding: 6px 16px;
  font-size: 16px;
  border-radius: 1000px;
}

html.light .label-result {
  background-color: var(--light-primary);
  color: var(--dark-text-primary);
  padding: 6px 16px;
  font-size: 16px;
  border-radius: 1000px;
}

/*////////////////////////////////////////*/

.vertical-line {
  height: auto;
  border-right: 1.5px solid var(--dark-bg-search);
}

html.light .vertical-line {
  height: auto;
  border-right: 1.5px solid var(--light-bg-search);
}

.horizontal-line {
  width: var(--result-card-width);
  border-bottom: 1.5px solid var(--color-line);
}

.dot {
  aspect-ratio: 1 / 1;
  height: 10px;
  margin: 5px;
  border-radius: var(--border-radius-full);
  background-color: var(--dark-primary);
}

html.light .dot {
  aspect-ratio: 1 / 1;
  height: 10px;
  margin: 5px;
  border-radius: var(--border-radius-full);
  background-color: var(--light-primary);
}

.line-mobile {
  display: none;
}

/*////////////////////////////////////////*/

.result-card {
  width: var(--result-card-width);
  height: var(--result-card-height);
  padding: var(--gap);
  border-left: 1.5px solid var(--color-line);
  border-right: 1.5px solid var(--color-line);
  text-decoration: none;
}
.result-card:hover {
  border-radius: var(--border-radius-default);
  box-shadow: 0px 0px 0px 1px var(--dark-primary) inset;
  background-color: color-mix(in srgb, var(--dark-primary), transparent 95%);
}

.img-container {
  aspect-ratio: 1 / 1;
  height: calc(var(--result-card-height) - 3vh);
  border-radius: var(--border-radius-default);
  background-color: var(--light-bg-primary);
}
.default-image {
  height: 100%;
}

.info-card {
  position: relative;
  justify-content: start;
  width: 100%;
  height: 100%;
}

.title {
  font-size: 1.5rem;
}

.category-attributes {
  align-items: start;
  gap: 8px;
}
.category-attributes p {
  font-weight: lighter;
}
.category-attributes p span {
  font-weight: normal;
}

.attributes {
  justify-content: start;
  flex-flow: row wrap;
}

.use-cases {
  justify-content: start;
  flex-flow: row wrap;
  margin-top: auto;
}
.use-cases p {
  font-weight: 600;
  color: color-mix(in srgb, var(--dark-primary), transparent 20%);
}

/*////////////////////////////////////////*/

.feedback {
  /* position: absolute;
    bottom: 0;
    right: 0; */
  justify-content: space-evenly;
  align-items: center;
  aspect-ratio: 2.22 / 1;
  width: 55px;
  margin-left: auto;
  border-radius: var(--border-radius-default);
  background-color: color-mix(in srgb, var(--dark-bg-search), transparent 40%);
}

.arrowUp:hover path {
  stroke: var(--dark-primary);
  /* fill: color-mix(in srgb, var(--dark-primary), transparent 80%); */
}
.arrowDown:hover path {
  stroke: var(--dark-text-primary);
  /* fill: color-mix(in srgb, var(--dark-text-secondary), transparent 80%); */
}
.likedStyle path {
  stroke: var(--dark-primary);
  fill: var(--dark-primary);
}
.dislikedStyle path {
  fill: var(--dark-text-secondary);
}

/*////////////////////////////////////////*/

@media (max-width: 1930px) {
  :root {
    --result-card-width: 65vw;
  }
}

/* Kleine Desktops */
@media (max-width: 1279px) {
  .result-card {
    height: fit-content;
  }
  .img-container {
    aspect-ratio: 1 / 1;
    height: var(--result-card-height);
  }
}

/* Tablets */
@media (max-width: 768px) {
  :root {
    --result-card-width: 90vw;
  }

  .result-card {
    /* height: 215px; */
    height: max-content;
    padding: 0px;
    border: none;
    flex-direction: column;
    margin: 100px 0;
  }
}

/* Handys */
@media (max-width: 480px) {
  .root {
    /* --result-card-width: 50vw; */
    --result-card-height: 200px;
  }

  .result-card {
    /* height: 215px; */
    height: max-content;
    padding: 0px;
    border: none;
    flex-direction: column;
    margin: 100px 0;
  }

  .title {
    font-size: 1.25rem;
  }

  .line-mobile {
    display: block;
    border-bottom: 1.5px solid
      color-mix(in srgb, var(--dark-primary), transparent 30%);
  }

  .attributes {
    flex-flow: nowrap;
    flex-direction: column;
  }
  .vertical-line {
    display: none;
  }

  .left-mobile {
    height: 215px;
    /* height: max-content; */
  }
}
</style>
