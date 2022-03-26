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
    <button
      @click="switchTheme"
      class="
        w-8
        h-8
        p-1
        rounded-full
        border-2
        dark:border-nord-white3
        border-nord-gray1
        mx-2
        mt-2
        float-right
      "
    >
      <span class="sr-only">Switch theme</span>
      <svg class="fill-current" viewBox="0 0 24 24">
        <path
          v-if="$store.state.theme == 'dark'"
          d="M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z"
        />
        <path
          v-else
          d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z"
        />
      </svg>
    </button>
    <transition name="slideLeft">
      <snackbar v-if="showSnack" :msg="snackMsg" />
    </transition>
    <transition name="slideLeft">
      <update-banner
        v-if="showBanner"
        @update="
          (showBanner = false),
            link('https://github.com/bocchilorenzo/xradio/releases/latest')
        "
        @close="showBanner = false"
      />
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
      @link="link"
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
import UpdateBanner from "./components/updateBanner.vue";
export default {
  components: {
    //Navbar,
    Player,
    Snackbar,
    Navbar2,
    UpdateBanner,
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
      bannerMsg: "",
      showSnack: false,
      showBanner: false,
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
      this.checkUpdate();
    });
  },
  methods: {
    async link(url) {
      await window.Neutralino.os.open(url);
    },
    async checkUpdate() {
      axios
        .get(
          "https://api.github.com/repos/bocchilorenzo/xradio/releases/latest"
        )
        .then((res) => {
          if (res.data.name != this.config.version) {
            this.toggleBanner("Update available. Click to download");
          }
        })
        .catch((err) => {
          this.toggleSnack("Update check failed");
          console.error(err);
        });
    },
    toggleSnack(msg) {
      this.snackMsg = msg;
      this.showSnack = true;
      setTimeout(() => {
        this.showSnack = false;
      }, 4000);
    },
    toggleBanner(msg) {
      this.bannerMsg = msg;
      this.showBanner = true;
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
        this.toggleSnack("Error: can't play station");
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
:root {
  --scrollbarBG: #2b251d;
  --thumbBG: #4c566a;
  scrollbar-color: var(--thumbBG) var(--scrollbarBG) !important;
  scrollbar-width: thin !important;
}
body::-webkit-scrollbar {
  width: 10px;
}
body {
  scrollbar-width: thin !important;
  scrollbar-color: var(--thumbBG) var(--scrollbarBG);
}
body::-webkit-scrollbar-track {
  background: var(--scrollbarBG);
}
body::-webkit-scrollbar-thumb {
  background-color: var(--thumbBG);
  border: 1px solid var(--scrollbarBG);
}
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
.slideDown-enter {
  opacity: 0.5;
  transform: translateY(-100%);
}
.slideDown-enter-active,
.slideDown-leave-active {
  transition: 0.3s ease-out;
}
.slideDown-leave-to {
  opacity: 0.5;
  transform: translateY(-100%);
}

.slideLeft-enter {
  opacity: 0.5;
  transform: translateX(-100%);
}
.slideLeft-enter-active,
.slideLeft-leave-active {
  transition: 0.2s ease-out;
}
.slideLeft-leave-to {
  opacity: 0.5;
  transform: translateX(-100%);
}
</style>
