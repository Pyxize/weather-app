<script setup lang="ts">

import axios from "axios";
import {useWeatherStore} from "../store/weather.ts";
import router from "../router";
import {storeToRefs} from "pinia";

const weatherStore = useWeatherStore()
const {savedCities} = storeToRefs(weatherStore)


const getCities = async () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(
        localStorage.getItem("savedCities")
    );
  }

  const requests = [];
  savedCities.value.forEach((city) => {
    requests.push(
        axios.get(`http://api.weatherapi.com/v1/current.json?key=caab8f3d7152469aa78113103232109&q=${city.city}\`);`)
    );
  });
  const weatherData = await Promise.all(requests);

  weatherData.forEach((value, index) => {
    savedCities.value[index].data = value.data;
  });
}
await getCities();

const goToCityView = (city) => {
  router.push({
    name: "city",
    params: {state: city.state, city: city.city},
    query: {
      id: city.id,
      lat: city.coords.lat,
      lng: city.coords.lng,
    },
  });
};


</script>

<template>
  <div class="flex flex-row">
    <div @click="goToCityView(city)" v-for="city in savedCities" :key="city.id"
         class="flex flex-col items-center p-8 m-6 rounded-md w-60 sm:px-12 bg-white shadow  text-slate-800 cursor-pointer">
      <div class="text-center">
        <h2 class="text-xl font-semibold">{{ city.city }}</h2>
        <p class="text-sm dark:text-gray-400">
          {{
            new Date(city.data.location.localtime_epoch * 1000).toLocaleDateString("fr-fr", {weekday: "long"})
          }}
        </p>
      </div>
      <img class="w-[50px] h-[50px] object-cover" :src="city.data.current.condition.icon" alt="">
      <div class="mb-2 text-3xl font-semibold">
        <span>{{ city.data.current.temp_c }}&deg;</span>
      </div>
      <p class="dark:text-gray-400 text-center">{{ city.data.current.condition.text }}</p>
    </div>
  </div>
  <p class="mt-6" v-if="savedCities.length === 0">
    Aucune ville en favoris. Pour ajouter une ville, recherchez dans le champs ci-dessus.
  </p>
</template>
