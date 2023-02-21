<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const props = defineProps({
  dirName: {
    type: String,
    required: true,
  },
  iconName: {
    type: String,
    required: true,
  },
});

const Icon = defineAsyncComponent(
  // () => import(`@/components/icons/Icon${props.iconName}.vue`)
  () => import(`@/assets/svg/${props.dirName}/${props.iconName}.svg?component`)
);
</script>

<template>
  <Icon />
</template>
