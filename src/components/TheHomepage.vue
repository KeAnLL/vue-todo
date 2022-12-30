<template>
  <div id="navbar" class="flex flex-row justify-between">
    <TheLogo />
    <button
      class="m-3 min-w-fit rounded-lg bg-primary pl-6 pr-6 text-lg font-bold text-white"
    >
      Get started
    </button>
  </div>
  <div
    id="head-banner"
    class="flex flex-row items-center pl-20 pr-20 pt-20 pb-10"
  >
    <div class="banner-text">
      <div>
        <p class="whitespace-normal text-[48px]" :class="$style['main-banner']">
          The fast way to record down your
          <span class="text-secondary"> todo items </span>📝
        </p>
        <p class="pt-5 text-[24px]" :class="$style['main-banner-sub']">
          Everything you need to store and manage all your tasks and make the
          right decision to complete your tasks
        </p>
        <button
          class="mt-5 min-w-fit rounded-lg bg-primary pt-4 pb-4 pl-6 pr-6 text-lg font-bold text-white"
        >
          Sign up for free
        </button>
        <div class="pt-4 font-medium text-gray-400">
          Register now. It's totally free! Forever!
        </div>
      </div>
    </div>
    <div id="banner-icon" class="pl-4">
      <SvgIcon
        componentDirName="homepage"
        iconName="ideas_flow"
        class="h-auto w-auto"
      />
    </div>
  </div>
  <div id="powered-by" class="pt-10 pb-10 pl-[25%] pr-[25%]">
    <p class="mb-3 text-center text-[20px] font-medium">Powered by</p>
    <div
      class="grap-4 grid grid-cols-3 place-items-center justify-center justify-items-center text-[24px] font-medium"
    >
      <div>
        <img
          src="https://vitejs.dev/logo.svg"
          class="inline-block h-[45px] w-auto"
        />
        Vite
      </div>
      <img
        src="https://www.vectorlogo.zone/logos/supabase/supabase-ar21.svg"
        class="h-[60px] w-auto"
      />
      <div>
        <img src="/favicon.ico" class="inline-block h-[40px] w-auto" />
        Vue.js
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/AppSvgIcon.vue";
import TheLogo from "@/components/TheLogo.vue";
</script>

<style module>
@import url("https://fonts.googleapis.com/css2?family=Noto+Serif:wght@700&family=Permanent+Marker&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap");

.main-banner {
  font-family: "Noto Serif", serif;
}

.main-banner-sub {
  font-family: "Source Sans Pro", sans-serif;
}
</style>
