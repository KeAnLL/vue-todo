<template>
  <div id="vue-app" class="... bg-white">
    <Suspense>
      <router-view></router-view>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import "@/assets/css/scrollbar.css";
</script>
