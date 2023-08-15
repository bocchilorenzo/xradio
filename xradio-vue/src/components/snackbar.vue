<template>
  <div
    class="rounded flex content-center items-center shadow-md w-fit sticky top-2 float-right mt-2 p-2 gap-x-2 text-black bg-nord-aurora1 z-10 text-large font-bold"
  >
    <span>{{ props.msg }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  msg: String,
});
</script>
