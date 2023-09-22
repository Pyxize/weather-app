<script setup lang="ts">
import CityView from "../../views/cityView.vue";
</script>

<template>
  <Suspense>
        <CityView />
        <template #fallback>
          <p>Chargement..</p>
        </template>
      </Suspense>
</template>

<style scoped>

</style>