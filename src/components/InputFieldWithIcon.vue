<template>
  <label class="block text-sm font-medium text-gray-700 sm:text-base">
    {{ props.labelName }}
  </label>
  <div
    id="input-field"
    class="relative rounded-md text-sm shadow-sm sm:text-base"
  >
    <div
      class="pointer-events-none absolute inset-y-0 left-0 flex items-center"
    >
      <AppSvgIcon
        :dirName="props.from"
        :iconName="iconName"
        class="h-full w-auto p-1"
      />
    </div>
    <input
      :type="props.inputType"
      :placeholder="props.placeholder"
      class="block w-full rounded-md border border-gray-300 pl-8 pb-1 pt-0.5 placeholder:text-sm placeholder:sm:text-base"
      v-model.lazy="value"
    />
    <div class="absolute inset-y-0 right-0 flex items-center">
      <slot name="tooltip"></slot>
    </div>
  </div>
  <slot name="warning"></slot>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import AppSvgIcon from "./AppSvgIcon.vue";

const value = ref<string>("");

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

const emit = defineEmits<{
  (e: "change", value: string): void;
}>();

watch(value, (newValue) => {
  emit("change", newValue);
});
</script>
