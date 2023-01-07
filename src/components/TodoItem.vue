<template>
  <div
    id="item-container"
    class="flex flex-row items-center rounded-lg bg-white px-5 py-4"
  >
    <slot></slot>
    <div class="pl-3 pr-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        @click="() => (todo.selected = !todo.selected)"
        class="h-8 w-8 transition duration-100 ease-in-out hover:scale-125"
        :class="{
          'stroke-green-500 stroke-2': todo.selected,
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
      <div id="todo-title" class="font-semibold">Title placeholder</div>
      <div id="description">Todo item description placeholder</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const todo = reactive({
  selected: false,
});
</script>
