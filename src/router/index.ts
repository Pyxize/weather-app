import {createRouter, createWebHistory} from "vue-router";
import Weather from "../views/weather.vue";
import City from "../components/city/city.vue";


const routes = [
    {path: '/', name: 'home', component: Weather },
    { path: "/weather/:state/:city", name: "city", component: City }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router;