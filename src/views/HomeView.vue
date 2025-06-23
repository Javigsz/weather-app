<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a city..."
        class="py-2 px-1 w-full bf-transparent border-b focus:border-button focus:outline-none focus:shadow-lg"
      />
      <ul
        class="absolute bg-background text-paragraph border-2 border-paragraph border-t-transparent w-full shadow-md py-2 px-1 top[66px] z-10 rounded-md overflow-y-auto max-h-60"
        v-if="mapboxSearchResults"
      >
        <p v-if="searchError" class="text-red-500 text-sm mb-2">
          An error occurred while fetching search results. Please try again.
        </p>
        <p
          v-if="!searchError && !mapboxSearchResults.length"
          class="text-gray-500 text-sm mb-2"
        >
          No results found for "{{ searchQuery }}". Please try a different
          query.
        </p>
        <template v-else>
          <li
            v-for="searchResult in mapboxSearchResults"
            :key="searchResult.id"
            class="py-2 cursor-pointer border-2 hover:border-button rounded-md border-transparent"
            @click="previewCity(searchResult)"
          >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <CityCardSkeleton :dots="3" />
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityList from "../components/CityList.vue";
import CityCardSkeleton from "@/components/CityCardSkeleton.vue";

const searchQuery = ref("");
const queryTimeout = ref(null);
const mapboxAPIKey = import.meta.env.VITE_MAPBOX_API_KEY;
const mapboxSearchResults = ref(null);
const searchError = ref(false);
const router = useRouter();

const previewCity = (searchResult) => {
  const [city, state] = searchResult.place_name.split(", ");

  router.push({
    name: "cityView",
    params: {
      city: city,
      state: state,
    },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lon: searchResult.geometry.coordinates[0],
      preview: true,
    },
  });
};

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
        );
        mapboxSearchResults.value = result.data.features;
        console.log(mapboxSearchResults.value);
      } catch {
        searchError.value = true;
      }

      return;
    }
    mapboxSearchResults.value = null;
  }, 300);
};
</script>
