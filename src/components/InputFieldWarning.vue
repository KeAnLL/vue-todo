<template>
  <div class="inline-flex items-center text-red-600">
    <AppSvgIcon
      dirName="account"
      iconName="warning"
      class="h-5 w-auto pl-1 pr-1.5"
    />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import AppSvgIcon from "@/components/AppSvgIcon.vue";
</script>
