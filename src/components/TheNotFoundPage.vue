<template>
  <div
    class="flex h-screen w-screen flex-col items-center justify-center bg-gray-100"
  >
    <div class="pb-5 text-3xl md:text-5xl" :class="$style['main-header']">
      <span class="border-r-2 border-gray-300 pr-5 font-semibold text-primary"
        >404</span
      ><span class="pl-4">Page Not Found</span>
    </div>
    <div class="text:sm inline-flex pr-3 font-medium md:text-base">
      <AppSvgIcon iconName="wrench-screwdriver" class="h-6 w-auto pr-2" />
      Need help for this page?&nbsp;<span class="font-medium text-secondary"
        >Contact us</span
      >
    </div>
    <button
      class="mt-10 inline-flex items-center rounded-md bg-secondary pl-5 pr-6 pt-2 pb-2 text-sm text-lg font-medium text-white md:text-base"
      @click="router.push('/')"
    >
      <AppSvgIcon iconName="arrow-circle-left" class="h-6 w-auto pr-2" />Back to
      Homepage
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import AppSvgIcon from "./AppSvgIcon.vue";

const router = useRouter();
</script>

<style module>
@import url("https://fonts.googleapis.com/css2?family=Noto+Serif:wght@700&family=Permanent+Marker&display=swap");

.main-header {
  font-family: "Noto Serif", serif;
}
</style>
