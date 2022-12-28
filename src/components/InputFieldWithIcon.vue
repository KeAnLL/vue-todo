<template>
  <label name="email" class="text-m block font-medium text-gray-700">
    {{ props.labelName }}
  </label>
  <div class="relative rounded-md shadow-sm">
    <div
      class="pointer-events-none absolute inset-y-0 left-0 flex items-center"
    >
      <AppSvgIcon
        :componentDirName="props.from"
        :iconName="iconName"
        class="h-full w-auto p-1"
      />
    </div>
    <input
      :type="props.inputType"
      :placeholder="props.placeholder"
      class="block w-full rounded-md border border-gray-300 pl-8 pb-1 pt-0.5"
    />
  </div>
</template>

<script setup lang="ts">
import AppSvgIcon from "./AppSvgIcon.vue";

const props = defineProps({
  from: {
    type: String,
    required: true,
  },
  labelName: {
    type: String,
    required: true,
  },
  iconName: {
    type: String,
    required: true,
  },
  inputType: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
});
</script>
