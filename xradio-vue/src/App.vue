<template>
  <div
    id="app"
    class="
      min-h-screen
      bg-white
      relative
      text-nord-gray1
      dark:text-nord-white3 dark:bg-nord-gray1
      transition-colors
      duration-300
      ease-out
      select-none
    "
    @contextmenu.prevent="&quot;&quot;;"
  >
    <navbar-2 @switchTheme="switchTheme" />
    <transition name="slideLeft">
      <snackbar v-if="showSnack" :msg="snackMsg" />
    </transition>
    <transition name="slide">
      <player
        v-if="currentStation.stationuuid"
        :isPlaying="isPlaying"
        :loading="loading"
        :currentStation="currentStation"
        :error="error"
        :favorites="favorites"
        @close="closePlayer"
        @manageFavorites="manageFavorites"
        @stop="stop"
        @play="play"
        @volume="volume"
      />
    </transition>
    <router-view
      v-if="baseUrl != ''"
      class="w-3/4 lg:w-3/5 px-4 mx-auto min-h-full py-12 pl-14"
      :baseUrl="baseUrl"
      :favorites="favorites"
      :config="config"
      @play="play"
      @removeFav="manageFavorites"
    />
  </div>
</template>

<script>
import axios from "axios";
//import Navbar from "./components/navbar.vue";
import { Howl, Howler } from "howler/dist/howler.core.min";
import Player from "./components/player.vue";
import Snackbar from "./components/snackbar.vue";
import Navbar2 from "./components/navbar2.vue";
export default {
  components: {
    //Navbar,
    Player,
    Snackbar,
    Navbar2,
  },
  data() {
    return {
      //baseUrl: "https://de1.api.radio-browser.info",
      baseUrl: "",
      sound: undefined,
      loading: false,
      isPlaying: false,
      error: false,
      currentStation: {},
      favorites: {},
      snackMsg: "",
      showSnack: false,
      config: {},
    };
  },
  created() {
    //prevent zooming
    window.addEventListener(
      "keydown",
      function (e) {
        if (
          (e.ctrlKey || e.metaKey) &&
          (e.which === 61 ||
            e.which === 107 ||
            e.which === 173 ||
            e.which === 109 ||
            e.which === 187 ||
            e.which === 189)
        ) {
          e.preventDefault();
        }
      },
      false
    );
    const handleWheel = function (e) {
      if (e.ctrlKey || e.metaKey) e.preventDefault();
    };
    window.addEventListener("wheel", handleWheel, { passive: false });

    let theme = localStorage.getItem("theme");
    if ((theme && theme == "dark") || !theme) {
      document.querySelector("html").classList.add("dark");
    } else {
      this.$store.dispatch("setTheme", "light");
    }
    if (localStorage.getItem("favorites")) {
      this.favorites = JSON.parse(localStorage.getItem("favorites"));
    }
    if (localStorage.getItem("currentStation")) {
      this.currentStation = JSON.parse(localStorage.getItem("currentStation"));
    }
    if (localStorage.getItem("volume")) {
      this.$store.dispatch("volume", parseInt(localStorage.getItem("volume")));
    }
    this.dns();
    Neutralino.events.on("baseHost", (event) => {
      this.baseUrl = event.detail;
      this.initRequests();
    });
  },
  methods: {
    playbackError() {
      this.snackMsg = "Error: can't play station";
      this.showSnack = true;
      setTimeout(() => {
        this.showSnack = false;
      }, 4000);
    },
    volume() {
      Howler.volume(this.$store.state.volume / 100);
    },
    manageFavorites(stationuuid) {
      if (stationuuid in this.favorites) {
        delete this.favorites[stationuuid];
      } else {
        this.favorites[stationuuid] = this.currentStation;
      }
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
      this.favorites = JSON.parse(localStorage.getItem("favorites"));
    },
    switchTheme() {
      if (this.$store.state.theme == "dark") {
        document.querySelector("html").classList.remove("dark");
        this.$store.dispatch("setTheme", "light");
        localStorage.setItem("theme", "light");
      } else {
        document.querySelector("html").classList.add("dark");
        this.$store.dispatch("setTheme", "dark");
        localStorage.setItem("theme", "dark");
      }
    },
    play(station) {
      this.loading = true;
      this.isPlaying = true;
      this.error = false;
      this.currentStation = station;
      axios({
        mode: "get",
        url: this.baseUrl + this.$store.state.urls.click + station.stationuuid,
        headers: { "User-Agent": "XRadio/" + this.config.version },
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
      if (this.sound != undefined) {
        this.sound.stop();
      }
      this.sound = new Howl({
        src: [station.url_resolved],
        html5: true,
        volume: this.$store.state.volume / 100,
      });
      document.title = station.name;
      this.sound.play();
      this.sound.once("load", () => {
        this.loading = false;
      });
      this.sound.once("loaderror", () => {
        this.playbackError();
        this.loading = false;
        this.error = true;
      });
      localStorage.setItem(
        "currentStation",
        JSON.stringify(this.currentStation)
      );
    },
    stop() {
      this.sound.stop();
      this.sound.unload();
      document.title = "xradio";
      this.isPlaying = false;
      this.loading = false;
      this.error = false;
    },
    closePlayer() {
      if (this.sound != undefined) {
        this.sound.stop();
        this.sound.unload();
      }
      this.isPlaying = false;
      this.loading = false;
      this.error = false;
      this.currentStation = {};
      localStorage.setItem(
        "currentStation",
        JSON.stringify(this.currentStation)
      );
    },
    async initRequests() {
      this.config = await window.Neutralino.app.getConfig();
      await axios({
        mode: "get",
        url: this.baseUrl + this.$store.state.urls.countries,
        headers: { "User-Agent": "XRadio/" + this.config.version },
      })
        .then((res) => {
          this.$store.dispatch("add", ["countries", res.data]);
        })
        .catch((err) => {
          console.error(err);
        });
      await axios({
        mode: "get",
        url: this.baseUrl + this.$store.state.urls.countryCodes,
        headers: { "User-Agent": "XRadio/" + this.config.version },
      })
        .then((res) => {
          this.$store.dispatch("add", ["countryCodes", res.data]);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async dns() {
      let extension = "js.neutralino.dnslookup";
      let event = "dnsLookup";
      let data = {
        getUrls: true,
      };

      await Neutralino.extensions.dispatch(extension, event, data);
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&family=Rubik:wght@300;400;800&display=swap");
/*
.dark #app {
  background-color: #120022;
}
*/
* {
  font-family: "Nanum Gothic", sans-serif;
}
h1 {
  font-family: "Rubik", sans-serif;
}
.slide-enter {
  opacity: 0.5;
  transform: translateY(100%);
}
.slide-enter-active,
.slide-leave-active {
  transition: 0.3s ease-out;
}
.slide-leave-to {
  opacity: 0.5;
  transform: translateY(100%);
}

.slideLeft-enter {
  opacity: 0.5;
  transform: translateX(100%);
}
.slideLeft-enter-active,
.slideLeft-leave-active {
  transition: 0.2s ease-out;
}
.slideLeft-leave-to {
  opacity: 0.5;
  transform: translateX(100%);
}
</style>
