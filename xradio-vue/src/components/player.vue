<template>
  <div
    id="player"
    class="w-full z-10 fixed h-16 p-2 pl-14 bottom-0 bg-nord-frost4 flex justify-center content-center items-center text-nord-white3"
  >
    <div
      class="w-3/4 mx-auto flex flex-row justify-center content-center items-center gap-x-2"
    >
      <div v-if="loading" class="p-1 w-8 h-8 -mt-1">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="24px"
          height="30px"
          viewBox="0 0 24 30"
          xml:space="preserve"
          class="fill-current"
        >
          <rect x="0" y="13" width="4" height="5">
            <animate
              attributeName="height"
              attributeType="XML"
              values="5;21;5"
              begin="0s"
              dur="0.6s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y"
              attributeType="XML"
              values="13; 5; 13"
              begin="0s"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </rect>
          <rect x="10" y="13" width="4" height="5">
            <animate
              attributeName="height"
              attributeType="XML"
              values="5;21;5"
              begin="0.15s"
              dur="0.6s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y"
              attributeType="XML"
              values="13; 5; 13"
              begin="0.15s"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </rect>
          <rect x="20" y="13" width="4" height="5">
            <animate
              attributeName="height"
              attributeType="XML"
              values="5;21;5"
              begin="0.3s"
              dur="0.6s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y"
              attributeType="XML"
              values="13; 5; 13"
              begin="0.3s"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </rect>
        </svg>
      </div>
      <button
        v-else-if="!isPlaying || error"
        @click="error ? '' : $emit('play', currentStation)"
        class="player-button h-8 w-8"
      >
        <svg
          class="fill-current"
          viewBox="0 0 24 24"
          height="24px"
          width="24px"
        >
          <path
            d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10,16.5L16,12L10,7.5V16.5Z"
          />
        </svg>
      </button>
      <button v-else @click="$emit('stop')" class="player-button h-8 w-8">
        <svg
          class="fill-current"
          viewBox="0 0 24 24"
          height="24px"
          width="24px"
        >
          <path
            d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4M9,9V15H15V9"
          />
        </svg>
      </button>
      <img
        v-if="currentStation.favicon != ''"
        class="h-10 w-10 rounded object-contain"
        :src="currentStation.favicon"
        alt="Logo"
      />
      <img
        v-else="currentStation.favicon != ''"
        class="h-10 w-10 rounded object-contain"
        src="../assets/music.svg"
        alt="Logo"
      />
      <small
        class="flex flex-col content-center items-center justify-center text-center"
      >
        <i> {{ currentStation.codec }}</i>
        <i v-if="currentStation.bitrate != ''">
          {{ currentStation.bitrate }}k
        </i>
      </small>
      <div class="flex flex-col w-full text-center content-center items-center">
        <div class="flex items-center content-center justify-center w-full max-w-272 md:max-w-none">
          <p class="w-full marquee font-bold">
            <span>
              {{ currentStation.name }}
            </span>
          </p>
        </div>
        <p class="truncate text-sm" id="tags">{{ currentStation.tags }}</p>
      </div>
      <span
        v-if="currentStation.homepage != ''"
        class="text-center ml-auto player-button"
        title="Homepage"
        @click.stop="openLink(currentStation.homepage)"
      >
        <svg class="fill-current h-6 w-6" viewBox="0 0 24 24">
          <path
            d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
          />
        </svg>
      </span>
      <button
        @click="manageFavorites"
        title="Save to favorites"
        class="player-button"
      >
        <svg
          v-if="!isFav"
          class="fill-current text-red-500"
          style="width: 24px; height: 24px"
          viewBox="0 0 24 24"
        >
          <path
            d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z"
          />
        </svg>
        <svg
          v-else
          class="fill-current text-red-500"
          style="width: 24px; height: 24px"
          viewBox="0 0 24 24"
        >
          <path
            d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
          />
        </svg>
      </button>
      <div
        class="flex content-center items-center justify-center relative h-auto"
        @mouseenter="showVol = true"
        @mouseleave="showVol = false"
      >
        <button
          class="z-10 player-button"
          @click="volume == 0 ? (volume = 100) : (volume = 0)"
        >
          <svg
            class="fill-current"
            style="width: 24px; height: 24px"
            viewBox="0 0 24 24"
          >
            <path
              v-if="volume >= 50"
              d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
            />
            <path
              v-else-if="volume > 5 && volume < 50"
              d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z"
            />
            <path v-else d="M7,9V15H11L16,20V4L11,9H7Z" />
          </svg>
        </button>
        <transition name="fade">
          <div
            class="absolute mt-16 py-2 pr-6 mb-48 pl-14 -rotate-90"
            v-if="showVol"
          >
            <input
              class="rounded-lg overflow-hidden appearance-none h-3 w-32 bg-nord-white1"
              type="range"
              min="0"
              max="100"
              step="1"
              v-model="volume"
            />
          </div>
        </transition>
      </div>
      <button
        @click="$emit('close')"
        class="absolute right-0 top-0 player-button"
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
</template>

<script>
export default {
  props: {
    isPlaying: Boolean,
    loading: Boolean,
    currentStation: Object,
    error: Boolean,
    favorites: Object,
  },
  data() {
    return {
      isFav: false,
      showVol: false,
      volume: 100,
    };
  },
  beforeMount() {
    this.volume = this.$store.state.volume;
  },
  mounted() {
    this.checkFav();
    console.log(this.currentStation);
  },
  updated() {
    this.checkFav();
  },
  methods: {
    manageFavorites() {
      this.isFav = !this.isFav;
      this.$emit("manageFavorites", this.currentStation.stationuuid);
    },
    checkFav() {
      if (this.currentStation.stationuuid in this.favorites) {
        this.isFav = true;
      } else {
        this.isFav = false;
      }
    },
    async openLink(link) {
      await window.Neutralino.os.open(link);
    },
  },
  watch: {
    volume(volume) {
      this.$store.dispatch("volume", volume);
      localStorage.setItem("volume", volume);
      this.$emit("volume");
    },
  },
};
</script>

<style scoped>
#tags {
  max-width: 17rem;
}

.marquee {
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}

.marquee span {
  display: inline-block;
  width: max-content;
  padding-left: 100%;
  will-change: transform;
  animation: marquee 15s linear infinite;
}
.marquee span:hover {
  animation-play-state: paused;
}
@keyframes marquee {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-100%, 0);
  }
}
@media (prefers-reduced-motion: reduce) {
  .marquee span {
    animation-iteration-count: 1;
    animation-duration: 0.01;
    width: auto;
    padding-left: 0;
  }
}

.fade-enter {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.1s ease-out;
}
.fade-leave-to {
  opacity: 0;
}

input[type="range"]::-webkit-slider-thumb {
  width: 12px;
  -webkit-appearance: none;
  appearance: none;
  height: 12px;
  cursor: grab;
  background: #bf616a;
  border-radius: 50%;
}

.player-button {
  @apply rounded-full p-1 hover:bg-nord-frost3 transition-colors duration-100 ease-out cursor-pointer;
}
</style>
