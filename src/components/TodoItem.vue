<template>
  <div class="my-2">
    <div
      v-if="props.id && !switchToEdit"
      id="item-container"
      class="flex flex-row items-center rounded-lg bg-white px-5 py-4"
    >
      <div class="pl-3 pr-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          @click="updateCompletion"
          class="h-8 w-8 transition duration-100 ease-in-out hover:scale-125"
          :class="{
            'stroke-green-500 stroke-2': completed,
          }"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div id="details" class="grow">
        <div id="title" class="font-semibold">
          {{ props.title }}
        </div>
        <div id="description">
          {{ props.description }}
        </div>
      </div>
      <More
        @click="editTodoItem"
        class="stroke-1.5 h-8 w-8 rounded-full hover:bg-gray-100"
      />
    </div>
    <TodoNewForm
      :id="props.id"
      :title="props.title"
      :description="props.description"
      :completed="props.completed"
      :section="props.section"
      v-else
      @insert="() => (switchToEdit = false)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import type { PropType } from "vue";

import { useTodosStore } from "@/stores/todo";

import TodoNewForm from "./TodoForm.vue";

import More from "@/assets/svg/todo/more.svg?component";

const props = defineProps({
  id: {
    type: Number,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  section: {
    type: null as unknown as PropType<number | null>,
    validator: (v: any) => typeof v == "number" || v == null,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
});

const switchToEdit = ref<boolean>(false);

const { storeUpdateTodoCompletion } = useTodosStore();

const editTodoItem = () => {
  switchToEdit.value = true;
};

const updateCompletion = async () => {
  if (props.id) {
    await storeUpdateTodoCompletion(props.id);
  }
};
</script>
