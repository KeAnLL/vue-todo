<template>
  <div
    class="flex h-screen w-screen flex-col items-center justify-center bg-gray-100"
  >
    <div class="pb-5 text-5xl" :class="$style['main-header']">
      <span class="text-primary border-r-2 border-gray-300 pr-5">404</span><span class="pl-4">Page Not Found</span>
    </div>
    <div class="inline-flex pr-3 text-base font-medium">
      <AppSvgIcon iconName="wrench-screwdriver" class="h-6 w-auto pr-2" />
      Need help for this page?&nbsp;<span class="font-medium text-secondary"
        >Contact us</span
      >
    </div>
    <button
      class="mt-10 inline-flex items-center rounded-md bg-secondary pl-5 pr-6 pt-2 pb-2 text-lg font-medium text-white"
    >
      <AppSvgIcon iconName="arrow-circle-left" class="h-6 w-auto pr-2" />Go back
      to Homepage
    </button>
  </div>
</template>

<script setup lang="ts">
import AppSvgIcon from "./AppSvgIcon.vue";
</script>

<style module>
@import url("https://fonts.googleapis.com/css2?family=Noto+Serif:wght@700&family=Permanent+Marker&display=swap");

.main-header {
  font-family: "Noto Serif", serif;
}
</style>
