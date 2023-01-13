<template>
  <div class="flex flex-col gap-5 pl-4 pr-4 text-base font-medium text-gray-700">
    <TheLogo :height="35" class="p-5" />
    <div class="flex flex-col gap-5">
      <MenuBarItem v-for="item in items" :key="item.id" :iconName="item.iconName" @click="emit('update', item.title)">
        <template #title>
          {{ item.title }}
        </template>
        <template #accordion v-if="item.children">
          <div id="menu-accordion" class="pl-3">
            <MenuBarItem v-for="citem in item.children" :key="citem.id" iconName="Bookmark" :child="true">
              <template #title>
                {{ citem.title }}
              </template>
            </MenuBarItem>
            <MenuBarItem id="add-item" iconName="FolderPlus" :child="true" class="text-gray-400">
              <template #title> Add item </template>
            </MenuBarItem>
          </div>
        </template>
      </MenuBarItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import MenuBarItem from "@/components/MenuBarItem.vue";
import TheLogo from "@/components/TheLogo.vue";

const items = [
  {
    id: 1,
    title: "Today",
    iconName: "Hashtag",
  },
  {
    id: 2,
    title: "Uncategorized",
    iconName: "DocumentText",
  },
  {
    id: 3,
    title: "Groups",
    iconName: "Folder",
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
    iconName: "Tag",
  },
];

const emit = defineEmits<{
  (e: "update", value: string): void;
}>();
</script>
