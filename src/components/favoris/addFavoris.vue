<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {uid} from "uid";
import {useWeatherStore} from "../../store/weather.ts";

const weatherStore = useWeatherStore();
//console.log(weatherStore)

//const savedCities = ref([]);
//const state: String =  ref("")
//const city: String = ref("")
const route = useRoute();
const router = useRouter();

const addCity = () => {
  const weather = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  }

  weatherStore.saveWeather(weather)


  if (route.query.preview) {
    let query = { ...route.query };
    delete query.preview;
    router.replace({ query });
  }

}
  /*
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(
        localStorage.getItem("savedCities")
    );
  }
  const locationObj = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  };
  savedCities.value.push(locationObj);

  localStorage.setItem(
      "savedCities",
      JSON.stringify(savedCities.value)
  );

  let query = Object.assign({}, route.query);
  delete  query.preview;
  router.replace({query})
}

   */
//console.log('SAVE',savedCities.value)


</script>

<template>
  <div v-if="route.query.preview" class="flex flex-row justify-end">
    <button class="flex flex-row items-center text-white bg-violet-500 hover:bg-violet-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            @click="addCity">
      <p>Ajouter</p>
      <span class="text-2xl ml-2">
            <i class="ri-add-circle-line"></i>
          </span>
    </button>
  </div>
</template>
