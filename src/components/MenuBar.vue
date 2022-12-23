<template>
  <div class="h-screen flex flex-col content-center justify-start bg-zinc-700 text-[#fafaf9] ...">
    <template class="inline-flex h-fit w-fit ...">
      <div class="p-4" :class="$style.icontext">TODO</div>
    </template>
      <MenuBarItem v-for="menuItem in items" :key="menuItem.id" :menuItemName="menuItem.name" />
  </div>
</template>

<script setup lang="ts">
import MenuBarItem from "@/components/MenuBarItem.vue";

const items = [
  {
    id: 1,
    name: "bookmark",
    title: "Bookmark",
  },
  {
    id: 2,
    name: "sign-in",
    title: "Sign In",
  },
]
</script>

<style module>
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');

.icontext {
  font-family: 'Permanent Marker', cursive;
  font-size: 20px;
}
</style>