<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Preview Banner -->
    <div
      v-if="route.query.preview"
      class="text-background p-4 bg-button w-full text-center"
    >
      <p>
        You are currently previewing this city, click the "+" icon to start
        tracking this city.
      </p>
    </div>
    <div class="flex flex-col items-center text-paragraph py-12">
      <h1 class="text-6xl mb-2 text-white">{{ route.params.city }}</h1>
      <p class="text-sm mb-12"></p>
      {{
        new Date(weatherData.current.time).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      }}
      {{
        new Date(weatherData.current.time).toLocaleTimeString("en-US", {
          timeStyle: "short",
        })
      }}
    </div>
    <WeatherIcon
      :code="weatherData.current.weather_code"
      :size="'100px'"
      class="py-6 text-button"
    />
    <p class="text-6xl mb-8 text-white">
      {{ weatherData.current.temperature_2m }}°
    </p>
    <div class="flex flex-col items-center gap-4 text-paragraph pb-10">
      <div class="flex gap-4">
        <div class="flex flex-col items-center">
          <p class="text-sm">Apparent temperature</p>
          <p class="text-lg">
            {{ Math.round(weatherData.current.apparent_temperature) }} °
          </p>
        </div>
        <div class="flex flex-col items-center">
          <p class="text-sm">Cloud cover</p>
          <p class="text-lg">
            {{ Math.round(weatherData.current.cloud_cover) }}%
          </p>
        </div>
      </div>
    </div>
    <hr class="border-white/30 w-full" />
    <!-- Hourly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-paragraph">
        <h2 class="mb-4 text-xl text-white">Hourly Weather</h2>
        <div class="flex gap-10 overflow-x-scroll pb-6">
          <div
            v-for="hour in next10Hours"
            :key="hour.time"
            class="flex flex-col gap-4 items-center"
          >
            <p class="whitespace-nowrap text-md">
              {{
                new Date(hour.time).toLocaleTimeString("en-US", {
                  timeStyle: "short",
                })
              }}
            </p>
            <WeatherIcon :code="hour.code" class="text-button" />
            <p class="text-xl">{{ Math.round(hour.temp) }}°</p>
          </div>
        </div>
      </div>
    </div>
    <hr class="border-white/30 w-full" />
    <!-- Weelky Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-paragraph">
        <h2 class="mb-4 text-xl text-white">Weekly Weather</h2>
        <div
          v-for="(day, index) in weatherData.daily.time"
          :key="day"
          class="flex items-center py-2"
        >
          <p class="flex-1">
            {{
              new Date(day).toLocaleDateString("en-US", {
                weekday: "long",
              })
            }}
          </p>
          <WeatherIcon
            :code="weatherData.daily.weather_code[index]"
            :size="'40px'"
            class="text-button"
          />
          <div class="flex gap-2 flex-1 justify-end">
            <p class="text-lg">
              {{ Math.round(weatherData.daily.temperature_2m_max[index]) }}° /
            </p>
            <p class="text-lg">
              {{ Math.round(weatherData.daily.temperature_2m_min[index]) }}°
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      @click="removeCity()"
      v-if="isCitySaved()"
      class="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500"
    >
      <i class="fa-solid fa-trash"></i>
      <p>Delete City</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import WeatherIcon from "./WeatherIcon.vue";

const route = useRoute();

const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      // `https://api.open-meteo.com/v1/forecast?latitude=${route.query.lat}&longitude=${route.query.lon}&hourly=temperature_2m,precipitation_probability,relative_humidity_2m,weathercode&current_weather=true&timezone=auto`
      `https://api.open-meteo.com/v1/forecast?latitude=${route.query.lat}&longitude=${route.query.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,precipitation,cloud_cover&timezone=auto`
    );

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading delay

    return weatherData.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const weatherData = await getWeatherData();
const now = new Date();
const next10Hours = [];

for (let i = 0; i < weatherData.hourly.time.length; i++) {
  const time = new Date(weatherData.hourly.time[i]);
  if (time >= now && next10Hours.length < 10) {
    next10Hours.push({
      time: weatherData.hourly.time[i],
      temp: weatherData.hourly.temperature_2m[i],
      code: weatherData.hourly.weather_code[i],
    });
  }
}

const isCitySaved = () => {
  const cities = JSON.parse(localStorage.getItem("savedCities")) || [];
  return cities.some((city) => city.id === route.query.id);
};

const router = useRouter();
const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem("savedCities")) || [];
  const updatedCities = cities.filter((city) => city.id !== route.query.id);
  localStorage.setItem("savedCities", JSON.stringify(updatedCities));
  router.push({ name: "home" });
};
</script>
