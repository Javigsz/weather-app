<template>
  <i
    :class="['wi', iconClass]"
    :title="description"
    :style="{ fontSize: size }"
  />
</template>

<script setup>
const props = defineProps({
  code: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    default: "50px",
  },
});

const weatherMap = {
  0: ["wi-day-sunny", "Soleado"],
  1: ["wi-day-sunny-overcast", "Mayormente soleado"],
  2: ["wi-day-cloudy", "Parcialmente nublado"],
  3: ["wi-cloudy", "Nublado"],
  45: ["wi-fog", "Niebla"],
  48: ["wi-fog", "Niebla con escarcha"],
  51: ["wi-sprinkle", "Llovizna ligera"],
  53: ["wi-showers", "Llovizna moderada"],
  55: ["wi-rain", "Llovizna intensa"],
  56: ["wi-rain-mix", "Llovizna congelante ligera"],
  57: ["wi-rain-mix", "Llovizna congelante fuerte"],
  61: ["wi-rain", "Lluvia ligera"],
  63: ["wi-rain", "Lluvia moderada"],
  65: ["wi-rain", "Lluvia fuerte"],
  66: ["wi-sleet", "Lluvia congelante ligera"],
  67: ["wi-sleet", "Lluvia congelante fuerte"],
  71: ["wi-snow", "Nieve ligera"],
  73: ["wi-snow", "Nieve moderada"],
  75: ["wi-snow", "Nieve fuerte"],
  77: ["wi-snowflake-cold", "Granos de nieve"],
  80: ["wi-showers", "Chaparrones ligeros"],
  81: ["wi-showers", "Chaparrones moderados"],
  82: ["wi-showers", "Chaparrones fuertes"],
  85: ["wi-snow-wind", "Nevadas ligeras"],
  86: ["wi-snow-wind", "Nevadas fuertes"],
  95: ["wi-thunderstorm", "Tormenta"],
  96: ["wi-thunderstorm", "Tormenta con granizo ligero"],
  99: ["wi-thunderstorm", "Tormenta con granizo fuerte"],
};

const [iconClass, description] = weatherMap[props.code] || [
  "wi-na",
  "Desconocido",
];
</script>

<style scoped>
/* Puedes agregar estilos aquí si lo deseas */
</style>
