import {defineStore} from "pinia";

export const useWeatherStore = defineStore('weathers', {
    state() {
        return {
            savedCities: []
        }
    },
    getters: {
        getCityData(city) {
            return this.savedCities.find((c) => c.city === city);
        }
    },
    actions: {
        saveWeather(weather) {
            this.savedCities.push(weather)
            localStorage.setItem('savedCities', JSON.stringify(this.savedCities));
        }
    }
})