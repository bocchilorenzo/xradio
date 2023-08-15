<template>
  <main
    class="min-h-screen relative text-nord-gray1 dark:text-nord-white3 dark:bg-nord-gray1 bg-white transition-colors duration-100 ease-out select-none"
    @contextmenu.prevent="null"
  >
    <nav-bar-2 />
    <button
      @click="switchTheme"
      class="w-8 h-8 p-1 rounded-full border-2 dark:border-nord-white3 border-nord-gray1 mx-2 mt-2 sticky top-2 float-right"
    >
      <span class="sr-only">Switch theme</span>
      <svg class="fill-current" viewBox="0 0 24 24">
        <path
          v-if="store.state.theme == 'dark'"
          d="M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z"
        />
        <path
          v-else
          d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z"
        />
      </svg>
    </button>
    <transition name="slideRight">
      <snack-bar v-if="showSnack" :msg="snackMsg" />
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
      class="w-3/4 px-4 mx-auto min-h-full py-12 pl-14"
      :baseUrl="baseUrl"
      :favorites="favorites"
      :config="config"
      @play="play"
      @removeFav="manageFavorites"
      @link="link"
      @exportFavorites="exportFavorites"
      @importFavorites="importFavorites"
    />
  </main>
</template>

<script setup>
//import Navbar from "./components/NavBar.vue";
import { Howl, Howler } from "howler/dist/howler.core.min";
import Player from "./components/Player.vue";
import SnackBar from "./components/SnackBar.vue";
import NavBar2 from "./components/NavBar2.vue";
import UpdateBanner from "./components/UpdateBanner.vue";
import { ref } from "vue";
import { useStore } from "vuex";

let baseUrl = ref("");
//let baseUrl = ref("https://de1.api.radio-browser.info");
let sound = ref(undefined);
let loading = ref(false);
let isPlaying = ref(false);
let error = ref(false);
let currentStation = ref({});
let favorites = ref({});
let snackMsg = ref("");
let bannerMsg = ref("");
let showSnack = ref(false);
let showBanner = ref(false);
let config = ref({});
const store = useStore();

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

//checkNode();
let theme = localStorage.getItem("theme");
if ((theme && theme == "dark") || !theme) {
  document.querySelector("html").classList.add("dark");
} else {
  store.dispatch("setTheme", "light");
}
if (localStorage.getItem("favorites")) {
  favorites.value = JSON.parse(localStorage.getItem("favorites"));
}
if (localStorage.getItem("currentStation")) {
  currentStation.value = JSON.parse(localStorage.getItem("currentStation"));
}
if (localStorage.getItem("volume")) {
  store.dispatch("volume", parseInt(localStorage.getItem("volume")));
}
if (localStorage.getItem("selectedCountries")) {
  store.dispatch(
    "setSelectedCountries",
    JSON.parse(localStorage.getItem("selectedCountries"))
  );
}

async function importFavorites() {
  let entries = await Neutralino.os.showOpenDialog("Select favorites file", {
    defaultPath: "./",
    filters: [
      { name: "JSON file", extensions: ["json"] },
      { name: "All files", extensions: ["*"] },
    ],
  });
  if (entries.length > 0) {
    let data = {
      filePath: entries,
    };
    await Neutralino.extensions.dispatch(
      "js.neutralino.dnslookup",
      "readJson",
      data
    );
  }
}

async function exportFavorites() {
  let entry = await Neutralino.os.showSaveDialog("Save favorites to", {
    defaultPath: "favorites.json",
    filters: [
      { name: "JSON file", extensions: ["json"] },
      { name: "All files", extensions: ["*"] },
    ],
  });
  if (entry != "") {
    let data = {
      filePath: entry,
      content: JSON.stringify(favorites.value),
    };
    await Neutralino.extensions.dispatch(
      "js.neutralino.dnslookup",
      "writeJson",
      data
    );
  }
}

/* async function checkNode() {
  let info = await Neutralino.os.execCommand("node -v");
  console.log(`Node version: ${info.stdOut}`);
} */

async function link(url) {
  await Neutralino.os.open(url);
}

async function checkUpdate() {
  await fetch(
    "https://api.github.com/repos/bocchilorenzo/xradio/releases/latest"
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.name != config.value.version) {
        toggleBanner("Update available. Click to download");
      }
    })
    .catch((err) => {
      toggleSnack("Update check failed");
      console.error(err);
    });
}

function toggleSnack(msg) {
  snackMsg.value = msg;
  showSnack.value = true;
  setTimeout(() => {
    showSnack.value = false;
  }, 4000);
}

function toggleBanner(msg) {
  bannerMsg.value = msg;
  showBanner.value = true;
}

function volume() {
  Howler.volume(store.state.volume / 100);
}

function manageFavorites(stationuuid) {
  if (stationuuid in favorites.value) {
    delete favorites.value[stationuuid];
  } else {
    favorites.value[stationuuid] = currentStation.value;
  }
  localStorage.setItem("favorites", JSON.stringify(favorites.value));
  favorites.value = JSON.parse(localStorage.getItem("favorites"));
}

function switchTheme() {
  if (store.state.theme == "dark") {
    document.querySelector("html").classList.remove("dark");
    store.dispatch("setTheme", "light");
    localStorage.setItem("theme", "light");
  } else {
    document.querySelector("html").classList.add("dark");
    store.dispatch("setTheme", "dark");
    localStorage.setItem("theme", "dark");
  }
}

function play(station) {
  loading.value = true;
  isPlaying.value = true;
  error.value = false;
  currentStation.value = station;
  fetch(baseUrl.value + store.state.urls.click + station.stationuuid, {
    method: "get",
    headers: { "User-Agent": "XRadio/" + config.value.version },
  })
    /* .then((res) => {
          console.log(res);
        }) */
    .catch((err) => {
      console.error(err);
    });
  if (sound.value != undefined) {
    sound.value.stop();
  }
  sound.value = new Howl({
    src: [station.url_resolved],
    html5: true,
    volume: store.state.volume / 100,
  });
  document.title = station.name;
  sound.value.play();
  sound.value.once("load", () => {
    loading.value = false;
  });
  sound.value.once("loaderror", () => {
    toggleSnack("Error: can't play station");
    loading.value = false;
    error.value = true;
  });
  localStorage.setItem("currentStation", JSON.stringify(currentStation.value));
}

function stop() {
  sound.value.stop();
  sound.value.unload();
  document.title = "xradio";
  isPlaying.value = false;
  loading.value = false;
  error.value = false;
}

function closePlayer() {
  if (sound.value != undefined) {
    sound.value.stop();
    sound.value.unload();
  }
  isPlaying.value = false;
  loading.value = false;
  error.value = false;
  currentStation.value = {};
  localStorage.setItem("currentStation", JSON.stringify(currentStation.value));
}

async function initRequests() {
  config.value = await Neutralino.app.getConfig();
  await fetch(baseUrl.value + store.state.urls.countries, {
    method: "get",
    headers: { "User-Agent": "XRadio/" + config.value.version },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      store.dispatch("add", ["countries", res]);
    })
    .catch((err) => {
      console.error(err);
    });
  await fetch(baseUrl.value + store.state.urls.countryCodes, {
    method: "get",
    headers: { "User-Agent": "XRadio/" + config.value.version },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      store.dispatch("add", ["countryCodes", res]);
    })
    .catch((err) => {
      console.error(err);
    });
}

async function dns() {
  let extension = "js.neutralino.dnslookup";
  let event = "dnsLookup";
  let data = {
    getUrls: true,
  };
  await Neutralino.extensions.dispatch(extension, event, data);
}

dns();

Neutralino.events.on("baseHost", (event) => {
  baseUrl.value = event.detail;
  store.dispatch("setBase", baseUrl.value);
  initRequests();
  checkUpdate();
});
Neutralino.events.on("savedJson", (event) => {
  if (event.detail == "Error") {
    toggleSnack("Error saving favorites");
  } else {
    toggleSnack("Favorites saved");
  }
});
Neutralino.events.on("loadedJson", (event) => {
  if (event.detail == "Error") {
    toggleSnack("Error loading favorites");
  } else {
    favorites.value = JSON.parse(event.detail);
    localStorage.setItem("favorites", event.detail);
    toggleSnack("Favorites loaded");
  }
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&family=Rubik:wght@300;400;800&display=swap");
/*
.dark #app {
  background-color: #120022;
}
*/
:root {
  --scrollbarBGDark: #434c5e;
  --thumbBGDark: #eceff4;
  --scrollbarBGLight: #e5e9f0;
  --thumbBGLight: #2e3440;
}
*::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
*::-webkit-scrollbar-track {
  background: var(--scrollbarBGLight);
  border-radius: 10px;
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke;
  transition-timing-function: ease-out;
  transition-duration: 100ms;
}
.dark *::-webkit-scrollbar-track {
  background: var(--scrollbarBGDark);
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke;
  transition-timing-function: ease-out;
  transition-duration: 100ms;
}
*::-webkit-scrollbar-thumb {
  background-color: var(--thumbBGLight);
  /* border: 1px solid var(--scrollbarBGLight); */
  border-radius: 10px;
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke;
  transition-timing-function: ease-out;
  transition-duration: 100ms;
}
.dark *::-webkit-scrollbar-thumb {
  background-color: var(--thumbBGDark);
  /* border: 1px solid var(--scrollbarBGDark); */
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke;
  transition-timing-function: ease-out;
  transition-duration: 100ms;
}
* {
  font-family: "Nanum Gothic", sans-serif;
  scrollbar-width: thin !important;
  scrollbar-color: var(--thumbBGLight) var(--scrollbarBGLight);
}
.dark * {
  scrollbar-color: var(--thumbBGDark) var(--scrollbarBGDark);
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
.slideRight-enter {
  opacity: 0.5;
  transform: translateX(-100%);
}
.slideRight-enter-active,
.slideRight-leave-active {
  transition: 0.2s ease-out;
}
.slideRight-leave-to {
  opacity: 0.5;
  transform: translateX(100%);
}
</style>
