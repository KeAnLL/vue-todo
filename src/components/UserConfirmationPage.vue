<template>
  <div
    class="relative flex h-screen w-screen items-center justify-center bg-gray-100 py-[15vh] px-[10vw] text-center"
  >
    <TheLogo class="absolute left-5 top-3" />
    <div
      class="flex flex-col items-center rounded-xl bg-white px-10 py-10 drop-shadow-lg"
    >
      <CheckBadge class="my-2 h-20 w-20 text-green-500" />
      <div class="py-2 text-2xl font-bold text-secondary sm:text-4xl">
        Your registration is completed
      </div>
      <span class="py-2 text-sm font-medium text-gray-500 sm:text-base"
        >Please check your registration email
        <span class="inline-block rounded-lg bg-gray-200 px-1">
          {{ route.query.mail }}
        </span>
        to confirm your registration</span
      >
      <button
        class="mt-6 mb-1 inline-flex items-center rounded-md bg-secondary pl-5 pr-6 pt-2 pb-2 text-lg font-medium text-white"
        @click="router.push('/')"
      >
        <ArrowCircleLeft class="mr-2 h-6 w-auto" />
        Back to homepage
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

import { retrieveSession } from "@/vueutils/useAuth";

import ArrowCircleLeft from "@/assets/svg/arrow-circle-left.svg?component";
import CheckBadge from "@/assets/svg/todo/check-badge.svg?component";

import TheLogo from "./TheLogo.vue";

const route = useRoute();
const router = useRouter();
</script>
