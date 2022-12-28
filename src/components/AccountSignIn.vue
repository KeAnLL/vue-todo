<template>
  <form @submit.prevent="handleSignIn({ email, password })">
    <h2>Sign in via magic link with your email below</h2>
    <div>
      <input type="email" placeholder="Your email" v-model="email" />
    </div>
    <input type="submit" />
  </form>
</template>

<script setup lang="ts">
import { handleSignIn } from "@/vueutils/useAuth";
import { ref } from "vue";

const email = ref<string>("");
const password = ref<string>("");
</script>
