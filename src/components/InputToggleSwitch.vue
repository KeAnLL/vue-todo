<template>
  <label class="relative inline-flex cursor-pointer items-center">
    <input type="checkbox" class="peer sr-only" @click="$emit('change')" />
    <div
      class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white"
    ></div>
    <span class="text-m block pl-3 font-medium text-gray-700">{{
      props.toggleMessage
    }}</span>
  </label>
</template>

<script setup lang="ts">
const props = defineProps({
  toggleMessage: {
    type: String,
  },
});

const emit = defineEmits<{
  (e: "change"): void;
}>();
</script>
