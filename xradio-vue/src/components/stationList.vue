<template>
  <div
    class="px-2 py-2 rounded-md grid grid-cols-7 sm:grid-cols-10 content-center items-center cursor-pointer w-full gap-x-2 mb-4 dark:bg-nord-gray2 hover:bg-nord-white2 dark:hover:bg-nord-gray3 transition-colors duration-100 ease-out shadow-md"
  >
    <img
      v-if="props.station.favicon != ''"
      class="h-10 w-10 rounded object-contain dark:bg-white"
      :src="props.station.favicon"
      :alt="'Station logo for ' + props.station.name"
    />
    <svg
      v-else
      alt="Default station logo"
      class="fill-current h-10 rounded dark:text-nord-white3"
      viewBox="0 0 24 24"
    >
      <path
        d="M21,3V15.5A3.5,3.5 0 0,1 17.5,19A3.5,3.5 0 0,1 14,15.5A3.5,3.5 0 0,1 17.5,12C18.04,12 18.55,12.12 19,12.34V6.47L9,8.6V17.5A3.5,3.5 0 0,1 5.5,21A3.5,3.5 0 0,1 2,17.5A3.5,3.5 0 0,1 5.5,14C6.04,14 6.55,14.12 7,14.34V6L21,3Z"
      />
    </svg>
    <div
      class="dark:text-nord-white3 w-full font-bold truncate col-span-4 sm:col-span-7"
    >
      <h2 class="truncate" :title="props.station.name">
        {{ props.station.name }}
      </h2>
      <img
        v-if="props.station.countrycode != ''"
        class="w-6 inline mr-1"
        :class="props.station.homepage != '' ? '' : 'col-span-2'"
        :src="
          'https://flagcdn.com/w20/' +
          props.station.countrycode.toLowerCase() +
          '.png'
        "
        :srcset="
          'https://flagcdn.com/w40/' +
          props.station.countrycode.toLowerCase() +
          '.png 2x'
        "
        :alt="props.station.countrycode"
        :title="
          props.station.state != ''
            ? props.station.country + ' - ' + props.station.state
            : props.station.country
        "
      />
      <span
        class="text-nord-frost4 dark:text-nord-frost3"
        :title="props.station.tags"
      >
        {{ props.station.tags }}
      </span>
    </div>
    <span class="ml-auto">
      {{ props.station.bitrate ? props.station.bitrate + "K" : "" }}
    </span>
    <span
      v-if="props.station.homepage != ''"
      class="text-center ml-auto rounded-md p-1 hover:bg-nord-frost2 dark:hover:bg-nord-gray1 transition-colors duration-100 ease-out cursor-pointer"
      title="Homepage"
      @click.stop="openLink(props.station.homepage)"
    >
      <svg class="fill-current h-6 w-6" viewBox="0 0 24 24">
        <path
          d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
        />
      </svg>
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  station: Object,
});

async function openLink(link) {
  await window.Neutralino.os.open(link);
}
</script>

<style scoped>
/*
.dark .stList {
  background-color: #1c0033;
}
.dark .stList:hover {
  background-color: #32005a;
}
*/
</style>
