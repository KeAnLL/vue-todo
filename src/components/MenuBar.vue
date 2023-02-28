<template>
  <div class="flex h-full flex-col pl-4 pr-4 text-base font-medium text-gray-700">
    <TheLogo :height="35" class="p-5" />
    <div class="flex flex-col gap-5 py-5">
      <MenuBarItem v-for="item in items" :key="item.id" :iconName="item.iconName" @click="emit('update', item.title)">
        <template #title>
          <span class="hidden sm:block">{{ item.title }}</span>
        </template>
      </MenuBarItem>
    </div>
    <div class="mt-auto py-2">
      <UserAvatar />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";

import { useAuthStore } from "@/stores/auth";

import MenuBarItem from "@/components/MenuBarItem.vue";
import TheLogo from "@/components/TheLogo.vue";
import UserAvatar from "./UserAvatar.vue";

onBeforeMount(async () => {
  const { storeRetrieveSession } = useAuthStore();
  storeRetrieveSession();
});

const items = [
  {
    id: 1,
    title: "Today",
    iconName: "hashtag",
  },
  {
    id: 2,
    title: "Uncategorized",
    iconName: "document-text",
  },
  {
    id: 3,
    title: "Groups",
    iconName: "folder",
  },
  {
    id: 4,
    title: "Tags",
    iconName: "tag",
  },
];

const emit = defineEmits<{
  (e: "update", value: string): void;
}>();
</script>
