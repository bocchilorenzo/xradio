<template>
  <nav
    class="
      fixed
      w-12
      p-2
      z-20
      h-full
      bg-nord-white1
      text-black
      dark:text-nord-white3 dark:bg-nord-gray3
    "
  >
    <div>
      <button aria-label="Open Menu" @click="drawer">
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          class="w-8 h-8"
        >
          <path d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      <div
        class="mx-auto w-8 h-8 p-1 rounded-full mt-2 cursor-pointer"
        @click="$emit('switchTheme')"
      >
        <span class="sr-only">Theme switcher</span>
        <svg class="fill-current" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M7.5,2C5.71,3.15 4.5,5.18 4.5,7.5C4.5,9.82 5.71,11.85 7.53,13C4.46,13 2,10.54 2,7.5A5.5,5.5 0 0,1 7.5,2M19.07,3.5L20.5,4.93L4.93,20.5L3.5,19.07L19.07,3.5M12.89,5.93L11.41,5L9.97,6L10.39,4.3L9,3.24L10.75,3.12L11.33,1.47L12,3.1L13.73,3.13L12.38,4.26L12.89,5.93M9.59,9.54L8.43,8.81L7.31,9.59L7.65,8.27L6.56,7.44L7.92,7.35L8.37,6.06L8.88,7.33L10.24,7.36L9.19,8.23L9.59,9.54M19,13.5A5.5,5.5 0 0,1 13.5,19C12.28,19 11.15,18.6 10.24,17.93L17.93,10.24C18.6,11.15 19,12.28 19,13.5M14.6,20.08L17.37,18.93L17.13,22.28L14.6,20.08M18.93,17.38L20.08,14.61L22.28,17.15L18.93,17.38M20.08,12.42L18.94,9.64L22.28,9.88L20.08,12.42M9.63,18.93L12.4,20.08L9.87,22.27L9.63,18.93Z"
          />
        </svg>
      </div>
    </div>

    <transition
      enter-class="opacity-0"
      enter-active-class="ease-out transition-medium"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-active-class="ease-out transition-medium"
      leave-to-class="opacity-0"
    >
      <div v-show="isOpen" class="z-20 fixed inset-0 transition-opacity">
        <div
          @click="isOpen = false"
          class="absolute inset-0 bg-black opacity-50"
          tabindex="0"
        ></div>
      </div>
    </transition>
    <aside
      class="
        transform
        top-0
        left-0
        w-64
        bg-nord-white1
        fixed
        h-full
        overflow-auto
        ease-in-out
        transition-transform
        duration-300
        z-30
        dark:bg-nord-gray3
      "
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!--
      <span
        @click="isOpen = false"
        class="flex w-full items-center p-4 border-b"
      >
        <img src="/logos/fox-hub.png" alt="Logo" class="h-auto w-32 mx-auto" />
      </span>
      -->
      <span @click="handle('home')" class="flex items-center p-4 menuItem">
        <span class="mr-2">
          <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22L12 3Z"
            />
          </svg>
        </span>
        <span>Home</span>
      </span>
      <span @click="handle('favorites')" class="flex items-center p-4 menuItem">
        <span class="mr-2">
          <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path
              d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46 6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55M16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45 20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z"
            />
          </svg>
        </span>
        <span>Favorites</span>
      </span>
      <span @click="handle('searchHub')" class="flex items-center p-4 menuItem">
        <span class="mr-2">
          <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path
              d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
            />
          </svg>
        </span>
        <span>Search</span>
      </span>
      <span @click="handle('about')" class="flex items-center p-4 menuItem">
        <span class="mr-2">
          <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"
            />
          </svg>
        </span>
        <span>About</span>
      </span>
      <!--
      <span @click="isOpen = false" class="flex items-center p-4 menuItem">
        <span class="mr-2">
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="w-6 h-6"
          >
            <path
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            ></path>
          </svg>
        </span>
        <span>Contact</span>
      </span>
      -->
    </aside>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    drawer() {
      this.isOpen = !this.isOpen;
    },
    handle(path) {
      if (this.$route.name != path) {
        this.$router.push({ name: path });
      }
      this.drawer();
    },
  },
  watch: {
    isOpen: {
      immediate: true,
      handler(isOpen) {
        if (process.client) {
          if (isOpen) document.body.style.setProperty("overflow", "hidden");
          else document.body.style.removeProperty("overflow");
        }
      },
    },
  },
};
</script>

<style scoped>
.dark .menuItem:hover {
  @apply bg-nord-gray1;
}
.menuItem:hover {
  @apply bg-nord-white3 transition-colors duration-100 ease-out;
}
.menuItem {
  cursor: pointer;
}
</style>
