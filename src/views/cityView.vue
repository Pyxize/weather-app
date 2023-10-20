<script setup lang="ts">


import {useRoute} from "vue-router";
import axios from "axios";
import {ref} from "vue";
import AddFavoris from "../components/favoris/addFavoris.vue";

const forecastDay = ref([])
const route = useRoute();
const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(`http://api.weatherapi.com/v1/forecast.json?&days=7&key=${import.meta.env.VITE_KEY_WEATHER}&q=${route.params.city}`)
    return weatherData.data
  } catch(error) {
    console.error(error)
  }
};

const weatherData = await getWeatherData()
forecastDay.value = weatherData.forecast.forecastday

</script>

<template>
  <div class="flex flex-col items-center justify-center w-screen min-h-screen">
    <!-- WEATHER -->
    <div class="w-full max-w-screen-sm bg-white p-10 rounded-xl ring-8 ring-white ring-opacity-40 mb-10 text-center">
      <add-favoris></add-favoris>
      <div class="flex flex-col items-center text-slate-800 py-12">
        <h1 class="text-4xl mb-2">{{route.params.city}}</h1>
        <p class="text-7xl font-semibold mb-2">{{weatherData.current.temp_c}}&deg;</p>
        <img
            class="w-[100px] h-[100px] object-cover"
            :src="weatherData.current.condition.icon"
            :alt="weatherData.current.condition.text"
        />

        <p class="text-2xl mb-2">{{weatherData.current.condition.text}}</p>
      </div>
    </div>

    <div class="w-full max-w-screen-sm bg-white p-10 rounded-xl ring-8 ring-white ring-opacity-40">
      <div class="mx-8 text-slate-800">
        <h2 class="mb-4">Prévisions sur 7 jours</h2>
          <div v-for="weatherDays in forecastDay" key="weatherDays.date_epoch" class="flex items-center">
            <p class="flex-1">{{
                new Date(weatherDays.date_epoch * 1000).toLocaleDateString("fr-fr", {weekday: "long"})
              }}</p>
            <img class="w-[50px] h-[50px] object-cover" :src="weatherDays.day.condition.icon" alt="">
            <div class="flex gap-2 flex-1 justify-end">
              <p class="font-thin">{{weatherDays.day.mintemp_c}}&deg;</p>
              <div class="border-r-2 border-gray-100 "></div>
              <p class="font-semibold"> {{weatherDays.day.maxtemp_c}}&deg;</p>
            </div>
        </div>
      </div>
    </div>


  </div>

</template>
