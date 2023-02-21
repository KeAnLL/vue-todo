<template>
  <Switch
    v-model="completed"
    :class="completed ? 'bg-secondary' : 'bg-gray-300'"
    class="relative inline-flex h-6 w-11 items-center rounded-full"
    @click="() => emit('change', completed)"
  >
    <span class="sr-only">Todo completed</span>
    <span
      :class="completed ? 'translate-x-6' : 'translate-x-1'"
      class="inline-block h-4 w-4 transform rounded-full bg-white transition"
    ></span>
  </Switch>
</template>

<script setup lang="ts">
import { Switch } from "@headlessui/vue";
import { ref } from "vue";

const completed = ref<boolean>(false);

const emit = defineEmits<{
  (e: "change", value: boolean): void;
}>();
</script>
