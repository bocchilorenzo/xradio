<template>
  <div
    class="sticky top-2 w-max text-black pl-14 p-2 bg-nord-aurora4 flex content-center items-center gap-x-2 z-10 -mb-10"
  >
    <h1 class="text-large cursor-pointer inline" @click="$emit('update')">
      Update available. Click to download
    </h1>
    <button @click="$emit('close')">
      <svg class="h-6" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup></script>
