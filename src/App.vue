<script setup lang="ts">
import 'remixicon/fonts/remixicon.css'
import Navigation from "./components/navigation/navigation.vue";

</script>

<template>
  <div class="flex flex-col items-center justify-center w-screen min-h-screen text-slate-800 bg-gradient-to-r from-violet-200 to-pink-200">
    <Navigation />
    <router-view></router-view>
  </div>
</template>
