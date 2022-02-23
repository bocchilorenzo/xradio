<template>
  <div
    id="player"
    class="
      w-full
      z-10
      fixed
      h-16
      p-2
      pl-14
      bottom-0
      bg-nord-frost4
      flex
      justify-center
      content-center
      items-center
      text-nord-white3
    "
  >
    <div
      class="
        w-3/4
        mx-auto
        flex flex-row
        justify-center
        content-center
        items-center
        gap-x-4
      "
    >
      <div v-if="loading">
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
      >
        <svg class="fill-current h-8 w-8" viewBox="0 0 24 24">
          <path
            d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10,16.5L16,12L10,7.5V16.5Z"
          />
        </svg>
      </button>
      <button v-else @click="$emit('stop')">
        <svg class="fill-current h-8 w-8" viewBox="0 0 24 24">
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
      <svg
        v-else
        class="fill-current h-10 rounded dark:text-nord-white3"
        viewBox="0 0 24 24"
        alt="Logo"
      >
        <path
          d="M21,3V15.5A3.5,3.5 0 0,1 17.5,19A3.5,3.5 0 0,1 14,15.5A3.5,3.5 0 0,1 17.5,12C18.04,12 18.55,12.12 19,12.34V6.47L9,8.6V17.5A3.5,3.5 0 0,1 5.5,21A3.5,3.5 0 0,1 2,17.5A3.5,3.5 0 0,1 5.5,14C6.04,14 6.55,14.12 7,14.34V6L21,3Z"
        />
      </svg>
      <div class="flex flex-col w-full text-center">
        <div class="flex items-center content-center justify-center gap-x-2">
          <p class="marquee font-bold">
            <span>
              {{ currentStation.name }}
            </span>
          </p>
          <small
            class="
              ml-auto
              flex flex-col
              content-center
              items-center
              justify-center
              text-center
            "
          >
            <i> {{ currentStation.codec }}</i>
            <i> {{ currentStation.bitrate }}k </i>
          </small>
        </div>
        <p class="truncate text-sm" id="tags">{{ currentStation.tags }}</p>
      </div>
      <button @click="manageFavorites" title="Save to favorites" class="p-1">
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
          class="cursor-pointer p-1 z-10"
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
            class="absolute mt-16 pt-1 mb-48 pl-10 -rotate-90 transform-gpu"
            v-if="showVol"
          >
            <input
              class="
                rounded-lg
                overflow-hidden
                appearance-none
                h-3
                w-32
                bg-nord-white1
              "
              type="range"
              min="0"
              max="100"
              step="1"
              v-model="volume"
            />
          </div>
        </transition>
      </div>
    </div>
    <button @click="$emit('close')" class="absolute right-0 top-0 h-6 p-1">
      <svg class="h-6" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
        />
      </svg>
    </button>
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
  width: 80%;
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
</style>