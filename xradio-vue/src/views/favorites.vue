<template>
  <div>
    <div class="mb-10">
      <header class="flex justify-between content-center items-center">
        <h1 class="text-xl mb-6 dark:text-nord-white3 font-bold">Favorites</h1>
        <!-- <button
          @click="$emit('emptyFav')"
          class="h-full p-2 mb-4 rounded hover:bg-nord-white2 dark:hover:bg-nord-gray3 transition-colors duration-100 ease-out"
          title="Empty favorites"
        >
          <svg
            class="h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"
            />
          </svg>
        </button> -->
        <div>
          <button
            @click="emit('exportFavorites')"
            class="h-full p-2 mb-4 rounded hover:bg-nord-white2 dark:hover:bg-nord-gray3 transition-colors duration-100 ease-out"
            title="Export"
          >
            <svg
              class="h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <title>Export</title>
              <path
                d="M23,12L19,8V11H10V13H19V16M1,18V6C1,4.89 1.9,4 3,4H15A2,2 0 0,1 17,6V9H15V6H3V18H15V15H17V18A2,2 0 0,1 15,20H3A2,2 0 0,1 1,18Z"
              />
            </svg>
          </button>
          <button
            @click="emit('importFavorites')"
            class="h-full p-2 mb-4 rounded hover:bg-nord-white2 dark:hover:bg-nord-gray3 transition-colors duration-100 ease-out"
            title="Import"
          >
            <svg
              class="h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <title>Import</title>
              <path
                d="M14,12L10,8V11H2V13H10V16M20,18V6C20,4.89 19.1,4 18,4H6A2,2 0 0,0 4,6V9H6V6H18V18H6V15H4V18A2,2 0 0,0 6,20H18A2,2 0 0,0 20,18Z"
              />
            </svg>
          </button>
        </div>
      </header>
      <div v-if="Object.keys(props.favorites).length != 0">
        <div
          class="flex content-center items-center gap-x-2"
          v-for="station in props.favorites"
          :key="station.stationuuid"
        >
          <station-list @click="play(station)" :station="station" />
          <button
            @click="emit('removeFav', station.stationuuid)"
            class="h-full p-2 mb-4 rounded hover:bg-nord-white2 dark:hover:bg-nord-gray3 transition-colors duration-100 ease-out"
          >
            <svg class="h-6" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div v-else>
        <h2 class="text-lg dark:text-nord-white3 text-center">
          No favorites added yet
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import StationList from "../components/StationList.vue";

const props = defineProps({
  baseUrl: String,
  favorites: Object,
});

const emit = defineEmits(["removeFav", "emptyFav", "exportFavorites", "importFavorites", "play"]);

const play = (station) => {
  emit("play", station);
};
</script>
