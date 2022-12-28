<template>
  <router-link :to="routerLink">
    <SvgIcon
      componentDirName="dashboard"
      :iconName="menuItemName"
      class="p-4"
    />
  </router-link>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/AppSvgIcon.vue";

const props = defineProps({
  menuItemName: {
    type: String,
    required: true,
  },
});

const routerLink = `/${props.menuItemName}`;
</script>
