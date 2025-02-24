<script setup lang=ts>
import SearchbarComponent from './SearchbarComponent.vue';
import { ref } from "vue";

defineProps<{
  prompts: string[];
  query: string;
}>();
defineEmits(["promptClick", "searchInput", "searchSubmit"]);

const { data } = await useFetch<Record<string, string>>("/api/settings");

const settings = ref<Record<string, string>>({});
if (data.value) {
  settings.value = data.value;
}

</script>

<template>
    <div class="flex flex-column bg-secondary jc-ai-center">
        <div class="text-format-center">
            <h5 class="dark-heading text-align-center" style="margin: 0">Nicht das Richtige gefunden?</h5>
            <h5 class="dark-heading text-align-center" style="margin: 0">Sag mir was du suchst...</h5>
        </div>
        <div class="second-search"><SearchbarComponent
          :query="query"
          @search-input="(event) => $emit('searchInput', event)"
          @search-submit="$emit('searchSubmit')"
        />
        </div>
    </div>
</template>

<style>

.second-search{
    width: 40%;
    padding: 0 0 25px 0,
}

.text-format-center{
    text-align: center;
    padding: 25px 0px;
}
</style>