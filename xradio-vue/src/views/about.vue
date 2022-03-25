<template>
  <div class="mx-auto w-auto">
    <h1 class="text-xl mb-6 dark:text-nord-white3 font-bold">About</h1>
    <img src="https://www.gnu.org/graphics/agplv3-with-text-162x68.png" alt="AGPLv3"/>
    <p>
      The source code can be found on
      <span
        class="text-nord-frost2 font-bold cursor-pointer"
        @click="$emit('link', 'https://github.com/bocchilorenzo/xradio')"
      >
        Github
      </span>
      . Used technologies:
    </p>
    <ul class="list-disc">
      <li>
        <span
          class="text-nord-frost2 font-bold cursor-pointer"
          @click="$emit('link', 'https://v2.vuejs.org/')"
        >
          Vue.js 2
        </span>
        for the graphical interface
      </li>
      <li>
        <span
          class="text-nord-frost2 font-bold cursor-pointer"
          @click="$emit('link', 'https://tailwindcss.com/')"
        >
          Tailwind CSS
        </span>
        for the styling
      </li>
      <li>
        <span
          class="text-nord-frost2 font-bold cursor-pointer"
          @click="$emit('link', 'https://neutralino.js.org/')"
        >
          Neutralinojs
        </span>
        for the application wrapper
      </li>
      <li>
        <span
          class="text-nord-frost2 font-bold cursor-pointer"
          @click="$emit('link', 'https://api.radio-browser.info/')"
        >
          Radio-browser APIs
        </span>
        for the radio stations
      </li>
      <li>
        <span
          class="text-nord-frost2 font-bold cursor-pointer"
          @click="
            $emit('link', 'https://www.vecteezy.com/free-vector/radio-icon')
          "
        >
          Flagpedia APIs
        </span>
        for the country flags
      </li>
    </ul>
    <p>
      App icon found at
      <span
        @click="
          $emit('link', 'https://www.vecteezy.com/free-vector/radio-icon')
        "
        class="text-nord-frost2 font-bold cursor-pointer"
      >
        Radio Icon Vectors by Vecteezy
      </span>
    </p>
  </div>
</template>

<script>
export default {
  name: "about",
  methods: {
    async link(url) {
      await window.Neutralino.os.open(url);
    },
  },
};
</script>

<style scoped>
li {
  @apply my-1;
}
</style>