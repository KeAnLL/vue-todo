<template>
  <div class="inline-flex items-center">
    <Icon class="h-[1.3rem] w-auto pr-1.5" />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const props = defineProps({
  iconName: {
    type: String,
    required: true,
  },
});

const Icon = defineAsyncComponent(
  () => import(`@/components/icons/Icon${props.iconName}.vue`)
);
</script>
