<template>
  <div class="px-2">
    <div
      class="inline-flex w-full items-center justify-center rounded-md p-2 hover:bg-gray-100 hover:text-secondary md:justify-start"
      :class="{ 'p-1': props.child }"
    >
      <!-- <Icon  /> -->
      <AppSvgIcon
        dirName="todo"
        :iconName="props.iconName"
        class="w-auto stroke-2 pr-1.5 md:h-[1.3rem]"
      />
      <span class="hidden md:block">
        <slot name="title"></slot>
      </span>
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
