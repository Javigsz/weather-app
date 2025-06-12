<template>
  <div class="flex py-6 px-3 bg-paragraph rounded-md shadow-md">
    <div class="flex flex-col flex-1 gap-2">
      <AnimatedPlaceholder class="max-w-1/2" />
      <AnimatedPlaceholder class="max-w-[40%]" />
    </div>
    <div class="flex flex-col items-end flex-1 gap-2">
      <AnimatedPlaceholder class="max-w-1/2 w-full" />
      <AnimatedPlaceholder class="max-w-[75%] w-full" />
    </div>
  </div>
</template>

<script setup>
import AnimatedPlaceholder from "./AnimatedPlaceholder.vue";
</script>
