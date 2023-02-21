<template>
  <div
    class="flex h-full flex-col pl-4 pr-4 text-base font-medium text-gray-700"
  >
    <TheLogo :height="35" class="p-5" />
    <div class="flex flex-col gap-5 py-5">
      <MenuBarItem
        v-for="item in items"
        :key="item.id"
        :iconName="item.iconName"
        @click="emit('update', item.title)"
      >
        <template #title>
          <span class="hidden sm:block">{{ item.title }}</span>
        </template>
        <template #accordion v-if="item.children">
          <div id="menu-accordion" class="pl-3">
            <MenuBarItem
              v-for="citem in item.children"
              :key="citem.id"
              iconName="bookmark"
              :child="true"
            >
              <template #title>
                <span class="hidden sm:block">
                  {{ citem.title }}
                </span>
              </template>
            </MenuBarItem>
          </div>
        </template>
      </MenuBarItem>
    </div>
    <div class="mt-auto w-full py-2">
      <UserAvatar :class="{ 'text-gray-300': !userSession }">
        <template #name>{{ userSession?.user.email }}</template>
        <template #description>{{ userSession?.user.aud }}</template>
      </UserAvatar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";

import {
  refreshSession,
  retrieveSession,
  userSession,
} from "@/vueutils/useAuth";

import MenuBarItem from "@/components/MenuBarItem.vue";
import TheLogo from "@/components/TheLogo.vue";
import UserAvatar from "./UserAvatar.vue";

onBeforeMount(async () => {
  userSession.value = await retrieveSession();
  if (!userSession.value) {
    userSession.value = await refreshSession();
    if (!userSession.value) {
      console.log("Fail to refresh new session");
    } else {
      console.log("User session refreshed");
    }
  } else {
    console.log("User session retrieved");
  }
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
    children: [
      {
        id: 1,
        title: "Group 1",
      },
      {
        id: 2,
        title: "Group 2",
      },
    ],
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
