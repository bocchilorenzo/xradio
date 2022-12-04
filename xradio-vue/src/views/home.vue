<template>
  <div>
    <div class="mb-10">
      <h1 class="text-xl mb-6 dark:text-nord-white3 font-bold">
        Recently added
      </h1>
      <div class="overflow-x-auto">
        <div class="grid grid-cols-10 gap-x-2 w-max pb-2">
          <station-card
            v-for="station in $store.state.recentStations"
            :key="station.stationuuid"
            @click="play(station)"
            :station="station"
          />
        </div>
      </div>
    </div>
    <div class="mb-10">
      <h1 class="text-xl mb-6 dark:text-nord-white3 font-bold">
        Popular
      </h1>
      <station-list
        v-for="station in $store.state.mostPopular"
        :key="station.stationuuid"
        @click="play(station)"
        :station="station"
      />
    </div>
    <div class="mb-10">
      <h1 class="text-xl mb-6 dark:text-nord-white3 font-bold">
        Most rated
      </h1>
      <station-list
        v-for="station in $store.state.mostRated"
        :key="station.stationuuid"
        @click="play(station)"
        :station="station"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import stationCard from "../components/StationCard.vue";
import StationList from "../components/StationList.vue";
export default {
  components: { stationCard, StationList },
  name: "home",
  props: {
    baseUrl: String,
    config: Object,
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
        headers: { "User-Agent": "XRadio/" + this.config.version },
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
        headers: { "User-Agent": "XRadio/" + this.config.version },
      })
        .then((res) => {
          this.$store.dispatch("add", ["mostPopular", res.data]);
        })
        .catch((err) => {
          console.err(err);
        });

      await axios({
        mode: "get",
        url: this.baseUrl + this.$store.state.urls.mostRated,
        headers: { "User-Agent": "XRadio/" + this.config.version },
      })
        .then((res) => {
          this.$store.dispatch("add", ["mostRated", res.data]);
        })
        .catch((err) => {
          console.err(err);
        });
    },
  },
};
</script>