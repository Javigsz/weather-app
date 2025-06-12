<template>
  <div v-for="city in savedCities" :key="city.id">
    <CityCard :city="city" @click="goToCityView(city)" />
  </div>

  <p v-if="savedCities.length === 0" class="text-center text-gray-500">
    No saved cities. Add a city to track it.
  </p>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityCard from "./CityCard.vue";

const savedCities = ref([]);
const router = useRouter();

const getCities = async () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }

  const requests = [];
  savedCities.value.forEach((city) => {
    requests.push(
      axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${city.coords.lat}&longitude=${city.coords.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,precipitation,cloud_cover&timezone=auto`
      )
    );
  });

  const weatherData = await Promise.all(requests);
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading delay

  weatherData.forEach((response, index) => {
    savedCities.value[index].weather = response.data;
  });
  console.log(savedCities.value);
};
await getCities();
const goToCityView = (city) => {
  router.push({
    name: "cityView",
    params: {
      city: city.city,
      state: city.state,
    },
    query: {
      id: city.id,
      lat: city.coords.lat,
      lon: city.coords.lon,
    },
  });
};
</script>
