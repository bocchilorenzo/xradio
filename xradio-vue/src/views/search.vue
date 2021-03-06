<template>
  <div>
    <div class="relative w-full group">
      <svg
        class="
          ml-1
          w-6
          h-10
          fill-current
          absolute
          text-nord-gray4
          dark:text-nord-white1
        "
        viewBox="0 0 24 24"
      >
        <path
          d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
        />
      </svg>
      <button
        v-if="!loading"
        class="absolute right-0"
        :class="searchText.length > 0 ? '' : 'opacity-30'"
        @click="
          searchText.length > 0
            ? ((searchText = ''),
              (results = {}),
              (noResult = false),
              initBottomValues())
            : null
        "
      >
        <svg
          class="
            mr-1
            w-6
            h-10
            fill-current
            text-nord-gray4
            dark:text-nord-white1
          "
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
          />
        </svg>
      </button>
      <svg
        v-else
        class="w-6 h-10 absolute right-0 mr-1 fill-current"
        viewBox="0 0 40 40"
      >
        <path
          opacity="0.2"
          d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
        />
        <path
          d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z"
        >
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 20 20"
            to="360 20 20"
            dur="0.5s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
      <input
        type="text"
        id="searchBox"
        placeholder="Search station"
        class="
          shadow
          group-hover:shadow-md
          focus:shadow-md
          outline-none
          pl-8
          py-2
          w-full
          rounded
          bg-nord-white1
          dark:bg-nord-gray4
          text-nord-gray4
          dark:text-nord-white1
          transition-shadow
          duration-200
          ease-out
        "
        v-model="searchText"
        @keydown.enter="search"
        maxlength="64"
      />
    </div>
    <div
      v-if="!loading"
      class="
        my-4
        py-2
        bg-white
        dark:bg-nord-gray1
        dark:text-nord-white3
        flex
        items-center
        content-center
        gap-x-2
        sticky
        top-0
      "
    >
      <button
        class="
          rounded
          hover:bg-nord-white1
          dark:hover:bg-nord-gray4
          p-1
          transition-colors
          duration-100
          ease-out
        "
        @click="$router.go(-1)"
      >
        <svg class="fill-current h-6" viewBox="0 0 24 24">
          <path
            d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"
          />
        </svg>
      </button>
      <h1 class="text-xl font-bold">Search results</h1>
    </div>
    <div class="mb-10" v-if="Object.keys(resultsShow).length != 0">
      <station-list
        v-for="station in resultsShow"
        :key="station.stationuuid"
        @click="play(station)"
        :station="station"
      />
    </div>
    <div class="mb-10" v-else-if="noResult">
      <h2 class="text-lg dark:text-nord-white3 text-center">
        No station found
      </h2>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import stationList from "../components/stationList.vue";
export default {
  components: { stationList },
  name: "search",
  props: {
    baseUrl: String,
    config: Object,
  },
  created() {
    if (this.$route.params.mode == "text") {
      this.searchText = this.$route.params.q;
    }
    this.search();
  },
  mounted() {
    document.getElementById("searchBox").focus();
  },
  data() {
    return {
      searchText: "",
      results: [],
      resultsShow: [],
      startIndex: 0,
      nextIndex: 15,
      bottom: false,
      stop: false,
      last: false,
      loading: true,
      noResult: false,
    };
  },
  methods: {
    initValues() {
      this.startIndex = 0;
      this.nextIndex = 15;
      this.results = [];
      this.resultsShow = [];
      this.loading = true;
      this.noResult = false;
      this.bottom = false;
      this.stop = false;
      this.last = false;
    },
    async search() {
      this.loading = true;
      let url = "";
      this.initValues();
      if (this.$route.params.mode == "country") {
        url =
          this.baseUrl +
          this.$store.state.urls.search.countrycode +
          this.$route.params.q;
      } else {
        url =
          this.baseUrl + this.$store.state.urls.search.name + this.searchText;
      }
      await axios({
        mode: "get",
        url: url,
        headers: { "User-Agent": "XRadio/" + this.config.version },
      })
        .then((res) => {
          if (res.data.length == 0) {
            this.noResult = true;
          } else {
            this.results = res.data;
            this.resultsShow.push(
              ...this.results.slice(this.startIndex, this.nextIndex)
            );
            this.startIndex = this.nextIndex;
            this.nextIndex += 15;
          }
          this.loading = false;
          window.addEventListener("scroll", () => {
            this.bottom = this.bottomVisible();
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    play(station) {
      this.$emit("play", station);
    },
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight - 200;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    },
    addResults() {
      this.resultsShow.push(
        ...this.results.slice(this.startIndex, this.nextIndex)
      );
      if (this.last) {
        this.stop = true;
      } else {
        this.startIndex = this.nextIndex;
        if (this.nextIndex + 15 >= this.results.length) {
          this.nextIndex = this.results.length;
          this.last = true;
        } else {
          this.nextIndex += 15;
        }
      }
    },
  },
  beforeUnmount() {
    window.removeEventListener("scroll", () => {
      this.bottom = this.bottomVisible();
    });
  },
  watch: {
    bottom(bottom) {
      if (this.results.length > 0) {
        if (bottom && !this.stop) {
          this.addResults();
        }
      }
    },
  },
};
</script>