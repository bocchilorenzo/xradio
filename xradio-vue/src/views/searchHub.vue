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
        class="absolute right-0"
        :class="searchText.length > 0 ? '' : 'opacity-30'"
        @click="searchText.length > 0 ? (searchText = '') : null"
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
      <input
        type="text"
        placeholder="Search station"
        id="searchBox"
        class="pl-8 py-2 w-full rounded bg-nord-white2 dark:bg-nord-gray4 text-nord-gray4 dark:text-nord-white1 transition-shadow duration-200 ease-out"
        autofocus
        tabindex="0"
        v-model="searchText"
        @keydown.enter="search('text')"
        maxlength="64"
      />
    </div>
    <div class="grid grid-cols-3 md:grid-cols-4 gap-6 mt-6 mx-auto">
      <div
        v-for="country in countriesShow"
        :key="country.id"
        class="
          w-full
          text-center
          rounded-md
          hover:shadow-md hover:bg-nord-white1
          dark:hover:bg-nord-gray4
          p-2
          cursor-pointer
          transition-[background-color,
          box-shadow]
          duration-100
          ease-out
        "
        @click="search('country', country.code2l.toLowerCase())"
      >
        <img
          class="h-16 mx-auto rounded-md"
          :src="
            'https://flagcdn.com/w160/' + country.code2l.toLowerCase() + '.png'
          "
          :srcset="
            'https://flagcdn.com/w320/' +
            country.code2l.toLowerCase() +
            '.png 2x'
          "
          :alt="country.name"
          loading="lazy"
        />
        <p class="truncate" :title="country.name">{{ country.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import countriesArr from "../assets/countries.json";
export default {
  name: "searchHub",
  props: {
    baseUrl: String,
  },
  data() {
    return {
      searchText: "",
      countries: countriesArr,
      countriesShow: [],
      startIndex: 0,
      nextIndex: 32,
      bottom: false,
      stop: false,
      last: false,
    };
  },
  created() {
    this.countriesShow = this.countries.slice(this.startIndex, this.nextIndex);
    this.startIndex = this.nextIndex;
    this.nextIndex += 32;
  },
  mounted() {
    window.addEventListener("scroll", () => {
      this.bottom = this.bottomVisible();
    });
    document.getElementById("searchBox").focus();
  },
  methods: {
    search(mode, q) {
      if (mode == "text") {
        this.$router.push({
          name: "search",
          params: {
            mode: mode,
            q: this.searchText
              .replace(/[^a-z0-9áéíóúñü .,_-]/gim, "")
              .trim(),
          },
        });
      } else {
        this.$router.push({
          name: "search",
          params: {
            mode: mode,
            q: q.replace(/[^a-z0-9áéíóúñü .,_-]/gim, "").trim(),
          },
        });
      }
    },
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight - 200;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    },
    addCountries() {
      this.countriesShow.push(
        ...this.countries.slice(this.startIndex, this.nextIndex)
      );
      if (this.last) {
        this.stop = true;
      } else {
        this.startIndex = this.nextIndex;
        if (this.nextIndex + 32 >= this.countries.length) {
          this.nextIndex = this.countries.length;
          this.last = true;
        } else {
          this.nextIndex += 32;
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
      if (bottom && !this.stop) {
        this.addCountries();
      }
    },
  },
};
</script>