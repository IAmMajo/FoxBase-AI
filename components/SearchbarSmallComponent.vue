<script setup>
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";

// Searchprompt Set Up
defineEmits(["searchInput", "searchSubmit"]);
const query = ref("");

// Front-End JavaScript
onMounted(() => {

  // Erfassen von IDs
  const inputContainerSm = document.getElementById("search-input-navsmall");
  const searchButtonSm = document.getElementById("search-btn-sm");
  let searchNavSmallBool = false;


  // Klick Eventlistener für den Searchbutton
  searchButtonSm.addEventListener("click", function(event){
    event.preventDefault();
    //Basierend auf SearchBool wird dann das Input Feld ein- oder ausgefahren
    if(!searchNavSmallBool){
      inputContainerSm.style.width = "15vw";
      inputContainerSm.style.borderBottom = "1.5px solid var(--dark-text-secondary)";
      searchNavSmallBool = true;
    } else{
      inputContainerSm.style.width = "0vw";
      inputContainerSm.style.borderBottom = "none";
      searchNavSmallBool = false;
    }
  });


});
</script>

<template>
  <form id="search-container-sm" action="" class="flex" @submit.prevent="$emit('searchSubmit', query)">
    <input id="search-input-navsmall" class="search-input-sm" type="text" placeholder="Suche..." v-model="query" @input="$emit('searchInput', query)"/>
    <button
      id="search-btn-sm"
      type="submit"
      class="submit-btn-sm flex jc-ai-center"
    >
      <MagnifyingGlassIcon class="searchbar-icon-sm" />
    </button>
  </form>
</template>

<style>

/* Standardzustand vor dem ersten Click auf den Searchbtn */
.search-input-sm {
  color: var(--dark-text-secondary);
  font-size: 14px;
  width: 0vw; 
  background-color: transparent;
  border: none;
  transition: 0.75s ease;
}
.search-input-sm:focus{
  outline: none;
  border-bottom: 1.5px solid var(--dark-text-secondary);
}
.submit-btn-sm {
  width: 35px;
  height: 35px;
  padding: 0;
  border: none;
  background-color: transparent;
}

.searchbar-icon-sm {
  height: 25px;
  width: 25px;
  color: var(--dark-text-secondary);
}

.submit-btn-sm:hover {
  cursor: pointer;
}
</style>
