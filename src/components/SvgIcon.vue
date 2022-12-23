<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const props = defineProps({
  componentDirName: {
    type: String,
    required: true,
  },
  iconName: {
    type: String,
    required: true,
  },
})

const icon = defineAsyncComponent(() =>
  import(`@/assets/svg/${props.componentDirName}/${props.iconName}.svg`)
);
</script>

<template>
  <component :is="icon" />
</template>
