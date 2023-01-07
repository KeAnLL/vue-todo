<template>
  <div class="flex flex-row">
    <!-- <nav class="fixed top-0 left-0 h-screen w-fit bg-white"> -->
    <nav class="h-screen w-fit bg-white text-xs">
      <MenuBar @update="(selected) => (todo.selected = selected)" />
    </nav>
    <div class="container bg-gray-100">
      <div id="selected" class="text-center">{{ todo.selected }}</div>
      <button
        class="text-medium mt-3 mb-2 h-fit w-fit rounded-lg bg-secondary pt-3 pb-3 pl-7 pr-5 font-bold text-white"
      >
        <div class="inline-flex items-center justify-center">
          <span class="mr-1">New Todo</span>
          <AppSvgIcon
            componentDirName="todo"
            iconName="add"
            class="h-[25px] w-auto p-0.5"
          />
        </div>
      </button>
      <div id="todo-items-container" class="px-[10vw]">
        <TodoItem></TodoItem>
        <TodoAccordion />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

import MenuBar from "@/components/MenuBar.vue";
import AppSvgIcon from "./AppSvgIcon.vue";
import TodoAccordion from "./TodoAccordion.vue";
import TodoItem from "./TodoItem.vue";

const todo = reactive({ selected: "" });
</script>
