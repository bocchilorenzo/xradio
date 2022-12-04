<template>
  <div>
    <div class="mb-10">
      <h1 class="text-xl mb-6 dark:text-nord-white3 font-bold">
        Favorites
      </h1>
      <div v-if="Object.keys(favorites).length != 0">
        <div
          class="flex content-center items-center gap-x-2"
          v-for="station in favorites"
          :key="station.stationuuid"
        >
          <station-list @click="play(station)" :station="station" />
          <button
            @click="$emit('removeFav', station.stationuuid)"
            class="
              h-full
              p-2
              mb-4
              rounded
              hover:bg-nord-white2
              dark:hover:bg-nord-gray3
              transition-colors
              duration-100
              ease-out
            "
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

<script>
import StationList from "../components/StationList.vue";
export default {
  components: { StationList },
  name: "favorites",
  props: {
    baseUrl: String,
    favorites: Object,
  },
  data() {
    return {};
  },
  methods: {
    play(station) {
      this.$emit("play", station);
    },
  },
};
</script>