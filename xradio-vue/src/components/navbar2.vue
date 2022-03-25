<template>
  <nav
    class="
      fixed
      w-12
      py-2
      h-full
      bg-nord-white1
      text-black
      dark:text-nord-white3 dark:bg-nord-gray3
      z-20
    "
  >
    <div class="z-20 absolute w-full">
      <button
        @click="handle('home')"
        class="
          w-full
          h-8
          py-1
          px-3
          mt-2
          hover:bg-white
          dark:hover:bg-nord-gray1
          transition-colors
          duration-100
          ease-out
        "
      >
        <span class="sr-only">Home</span>
        <svg class="fill-current" viewBox="0 0 24 24">
          <path
            d="M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22L12 3Z"
          />
        </svg>
      </button>
      <button
        @click="handle('favorites')"
        class="
          w-full
          h-8
          py-1
          px-3
          mt-2
          hover:bg-white
          dark:hover:bg-nord-gray1
          transition-colors
          duration-100
          ease-out
        "
      >
        <span class="sr-only">Favorites</span>
        <svg class="fill-current" viewBox="0 0 24 24">
          <path
            d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46 6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55M16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45 20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z"
          />
        </svg>
      </button>
      <button
        @click="handle('searchHub')"
        class="
          w-full
          h-8
          py-1
          px-3
          mt-2
          hover:bg-white
          dark:hover:bg-nord-gray1
          transition-colors
          duration-100
          ease-out
        "
      >
        <span class="sr-only">Search</span>
        <svg class="fill-current" viewBox="0 0 24 24">
          <path
            d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
          />
        </svg>
      </button>
      <button
        @click="handle('about')"
        class="
          w-full
          h-8
          py-1
          px-3
          mt-2
          hover:bg-white
          dark:hover:bg-nord-gray1
          transition-colors
          duration-100
          ease-out
        "
      >
        <span class="sr-only">About</span>
        <svg class="fill-current" viewBox="0 0 24 24">
          <path
            d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"
          />
        </svg>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    handle(path) {
      if (this.$route.name != path) {
        this.$router.push({ name: path });
      }
    },
  },
};
</script>