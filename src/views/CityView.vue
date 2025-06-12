<template>
  <div>
    <Suspense>
      <AsyncCityView />
      <template #fallback>
        <p class="text-center text-gray-500 mt-4">
          <CityViewSkeleton />
        </p>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import AsyncCityView from "../components/AsyncCityView.vue";
import CityViewSkeleton from "../components/CityViewSkeleton.vue";
</script>
