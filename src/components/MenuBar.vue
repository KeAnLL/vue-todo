<template>
  <div
    class="flex flex-col gap-5 pl-4 pr-4 text-base font-medium text-gray-700"
  >
    <TheLogo :height="35" class="p-5" />
    <div class="flex flex-col gap-5">
      <MenuBarItem
        v-for="item in items"
        :key="item.id"
        :iconName="item.iconName"
        class="w-full rounded-md p-2 hover:bg-gray-100 hover:text-secondary"
        @click="emit('update', item.title)"
      >
        {{ item.title }}
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
