<template>
  <div>
    <div class="mb-10">
      <h1 class="text-xl mb-6 dark:text-nord-white3 font-bold">
        Recently added
      </h1>
      <div class="overflow-x-auto">
        <div class="grid grid-cols-10 gap-x-2 w-max pb-2">
          <station-card
            v-for="station in store.state.recentStations"
            :key="station.stationuuid"
            @click="play(station)"
            :station="station"
          />
        </div>
      </div>
    </div>
    <div class="mb-10">
      <h1 class="text-xl mb-6 dark:text-nord-white3 font-bold">Popular</h1>
      <station-list
        v-for="station in store.state.mostPopular"
        :key="station.stationuuid"
        @click="play(station)"
        :station="station"
      />
    </div>
    <div class="mb-10">
      <h1 class="text-xl mb-6 dark:text-nord-white3 font-bold">Most rated</h1>
      <station-list
        v-for="station in store.state.mostRated"
        :key="station.stationuuid"
        @click="play(station)"
        :station="station"
      />
    </div>
  </div>
</template>

<script setup>
import StationCard from "../components/StationCard.vue";
import StationList from "../components/StationList.vue";
import { useStore } from "vuex";

const props = defineProps({
  baseUrl: String,
  config: Object,
});

const emit = defineEmits(["play"]);
const store = useStore();

function play(station) {
  emit("play", station);
}

async function initHome() {
  await fetch(props.baseUrl + store.state.urls.recentStations, {
    method: "GET",
    headers: { "User-Agent": "XRadio/" + props.config.version },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      store.dispatch("add", ["recentStations", res]);
    })
    .catch((err) => {
      console.error(err);
    });

  await fetch(props.baseUrl + store.state.urls.mostPopular, {
    method: "GET",
    headers: { "User-Agent": "XRadio/" + props.config.version },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      store.dispatch("add", ["mostPopular", res]);
    })
    .catch((err) => {
      console.error(err);
    });

  await fetch(props.baseUrl + store.state.urls.mostRated, {
    method: "GET",
    headers: { "User-Agent": "XRadio/" + props.config.version },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      store.dispatch("add", ["mostRated", res]);
    })
    .catch((err) => {
      console.error(err);
    });
}

if (!store.state.initialLoad) {
  initHome();
  store.dispatch("loaded");
}
</script>
