<template>
  <div @click="loginClick" class="overflow-hidden inline-flex items-center justify-center w-11/12">
    <Avatar class="mr-1.5 h-9 w-9" />
    <div class="text-sm min-w-0">
      <div v-if="session" class="truncate">
        {{ session.user.email }}
      </div>
      <span v-else class="w-full">
        Sign in required
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

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
}
</script>
