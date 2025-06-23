<template>
  <div class="flex py-6 px-3 bg-button rounded-md shadow-md">
    <div class="flex flex-col flex-1 gap-2">
      <AnimatedPlaceholder class="max-w-1/2" />
      <AnimatedPlaceholder class="max-w-[40%]" />
    </div>
    <div class="flex flex-col items-end flex-1 gap-2">
      <AnimatedPlaceholder class="max-w-1/2 w-full" />
      <AnimatedPlaceholder class="max-w-[75%] w-full" />
    </div>
  </div>
  <!-- Dots -->
  <div class="flex flex-col items-center gap-3 mt-2">
    <span
      v-for="n in dots"
      :key="n"
      class="w-5 h-5 rounded-full bg-gray-500 inline-block"
    ></span>
  </div>
</template>

<script setup>
import AnimatedPlaceholder from "./AnimatedPlaceholder.vue";
defineProps({
  dots: {
    type: Number,
    default: 3, // Show 3 dots by default
  },
});
</script>
