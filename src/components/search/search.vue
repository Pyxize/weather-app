<script setup lang="ts">
import {ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";


const querySearch = ref("")
const queryTimeout = ref(null)
const resultSearch = ref(null)
const searchError = ref(false)


const router = useRouter()
const viewCity = (result) => {
  router.push({
    name: 'city',
    params: {state: result.region, city: result.name},
    query: {
      lat: result.lat,
      lng: result.lon,
      preview: 'true'
    }
  })
}

const getSearchResult = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (querySearch.value !== '') {
      try {
        const result = await axios.get(`https://api.weatherapi.com/v1/search.json?key=caab8f3d7152469aa78113103232109&q=${querySearch.value}`);
        resultSearch.value = result.data;
      } catch {
        searchError.value = true;
      }
      return;
    }
    resultSearch.value = null
  }, 300)
}

</script>


<template>
  <div class="container">
    <form>
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
               fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input @input="getSearchResult" v-model="querySearch" type="search"
               class="block w-full p-4 pl-10 text-sm shadow text-gray-900 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
               placeholder="Chercher une ville.." required>
      </div>
    </form>
    <div v-if="resultSearch" class="bg-white w-full rounded-lg shadow-xl overflow-hidden mt-3">
      <ul>
        <p v-if="searchError">Désolé, quelque chose s'est mal passé, veuillez réessayer</p>
        <p v-if="!searchError && resultSearch.length === 0">
          aucun résultat ne correspond à votre requête
        </p>
        <template v-else>
          <li v-for="result in resultSearch" :key="result.id"
              class="py-2 p-3 cursor-pointer hover:bg-violet-200 transition-colors" @click="viewCity(result)">
            {{ result.name }}, {{ result.region }}
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>


<style scoped>

</style>