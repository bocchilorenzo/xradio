<template>
  <div class="mx-auto w-auto">
    <div class="mb-10">
      <h1 class="text-xl mb-6 dark:text-nord-white3 font-bold">
        Most recent stations
      </h1>
      <div class="overflow-x-auto">
        <div class="grid grid-cols-10 gap-x-2 w-max pb-2">
          <station-card
            v-for="station in $store.state.recentStations"
            :key="station.stationuuid"
            @click.native="play(station)"
            :station="station"
          />
        </div>
      </div>
    </div>
    <div class="mb-10">
      <h1 class="text-xl mb-6 dark:text-nord-white3 font-bold">
        Most popular stations
      </h1>
      <station-list
        v-for="station in $store.state.mostPopular"
        :key="station.stationuuid"
        @click.native="play(station)"
        :station="station"
      />
    </div>
    <div class="mb-10">
      <h1 class="text-xl mb-6 dark:text-nord-white3 font-bold">
        Best rated stations
      </h1>
      <station-list
        v-for="station in $store.state.higherRated"
        :key="station.stationuuid"
        @click.native="play(station)"
        :station="station"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import stationCard from "../components/stationCard.vue";
import StationList from "../components/stationList.vue";
export default {
  components: { stationCard, StationList },
  name: "home",
  props: {
    baseUrl: String,
  },
  created() {
    if (!this.$store.state.initialLoad) {
      this.initHome();
      this.$store.dispatch("loaded");
    }
  },
  methods: {
    play(station) {
      this.$emit("play", station);
    },
    async initHome() {
      await axios({
        mode: "get",
        url: this.baseUrl + this.$store.state.urls.recentStations,
      })
        .then((res) => {
          this.$store.dispatch("add", ["recentStations", res.data]);
        })
        .catch((err) => {
          console.err(err);
        });

      await axios({
        mode: "get",
        url: this.baseUrl + this.$store.state.urls.mostPopular,
      })
        .then((res) => {
          this.$store.dispatch("add", ["mostPopular", res.data]);
        })
        .catch((err) => {
          console.err(err);
        });

      await axios({
        mode: "get",
        url: this.baseUrl + this.$store.state.urls.higherRated,
      })
        .then((res) => {
          this.$store.dispatch("add", ["higherRated", res.data]);
        })
        .catch((err) => {
          console.err(err);
        });
    },
  },
};
</script>