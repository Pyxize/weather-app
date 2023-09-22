<script setup lang="ts">
import FavoriteCity from "./favoriteCity.vue";
import Search from "../components/search/search.vue";

</script>



<template>
  <Search />
      <Suspense>
        <FavoriteCity />
        <template #fallback>
          <p>Chargement..</p>
        </template>
      </Suspense>
</template>