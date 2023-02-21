<template>
  <div>
    <div
      class="inline-flex w-full items-center rounded-md p-2 hover:bg-gray-100 hover:text-secondary"
      :class="{ 'p-1': props.child }"
    >
      <!-- <Icon  /> -->
      <AppSvgIcon dirName="todo" :iconName="props.iconName" class="h-[1.3rem] w-auto stroke-2 pr-1.5" />
      <slot name="title"></slot>
    </div>
    <slot name="accordion" class=""></slot>
  </div>
</template>

<script setup lang="ts">
import AppSvgIcon from "./AppSvgIcon.vue";

const props = defineProps({
  iconName: {
    type: String,
    required: true,
  },
  child: {
    type: Boolean,
    required: false,
  },
});
</script>
