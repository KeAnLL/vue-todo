<template>
  <div
    @click="loginClick"
    class="inline-flex w-11/12 items-center justify-center overflow-hidden"
  >
    <Avatar class="mr-1.5 h-9 w-9" />
    <div class="hidden min-w-0 text-sm md:block">
      <div v-if="session" class="truncate">
        {{ session.user.email }}
      </div>
      <span v-else class="w-full"> Sign in required </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";

import Avatar from "@/assets/svg/account/user-circle.svg?component";

const { session } = storeToRefs(useAuthStore());

const router = useRouter();

const loginClick = () => {
  if (!session) {
    router.push({
      name: "Account",
      params: { type: "signin" },
    });
  }
};
</script>
