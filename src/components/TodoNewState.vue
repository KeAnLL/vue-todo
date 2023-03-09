<template>
  <div
    v-if="!newTodo"
    @click="createNewTodo"
    class="flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-400 pt-8 pb-6"
  >
    <PlusCircle class="text-gray-400" />
    <span class="font-semibold">Create a new todo</span>
  </div>
  <TodoForm
    v-else
    @insert="() => (newTodo = false)"
    :section="props.section"
    :completed="false"
  />
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { ref } from "vue";

import TodoForm from "./TodoForm.vue";

import PlusCircle from "@/assets/svg/todo/plus-circle.svg?component";

const props = defineProps({
  section: {
    type: null as unknown as PropType<number | null>,
    default: null,
  },
});

const newTodo = ref<boolean>(false);

const createNewTodo = () => {
  newTodo.value = !newTodo.value;
};
</script>
