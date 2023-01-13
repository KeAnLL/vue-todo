<template>
  <div class="flex flex-row">
    <!-- <nav class="fixed top-0 left-0 h-screen w-fit bg-white"> -->
    <nav class="h-screen w-fit bg-white text-xs">
      <MenuBar @update="(selected) => (todo.selected = selected)" />
    </nav>
    <div class="container bg-gray-100">
      <div
        id="selected-top-banner"
        class="flex w-full flex-row items-center justify-between px-10 py-5 text-center font-semibold text-gray-500"
      >
        <div
          class="inline-flex items-center justify-center rounded-lg py-2 pl-2 pr-3 hover:bg-gray-200"
        >
          <Left class="p-0.5" />
          Previous
        </div>
        <span class="text-lg">
          {{ todo.selected }}
        </span>
        <div
          class="inline-flex items-center justify-center rounded-lg py-2 pl-3 pr-2 hover:bg-gray-200"
        >
          Next
          <Right class="p-0.5" />
        </div>
      </div>
      <div id="todo-container" class="px-[10vw]">
        <div class="flex h-fit w-full justify-end pb-3">
          <button
            class="text-medium mt-3 mb-2 h-fit w-fit rounded-lg bg-secondary py-3 pl-7 pr-5 font-bold text-white"
            :class="{ hidden: todo.new }"
            @click="() => (todo.new = !todo.new)"
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
        </div>
        <TodoNewForm
          class="mb-5"
          :class="{
            hidden: !todo.new,
          }"
          @insert="(insertDone) => (todo.new = insertDone)"
        />
        <div id="todo-items-container">
          <div id="section-title" class="py-2 pl-2 text-2xl font-bold">
            Section title placeholder
          </div>
          <div v-for="todo in allTodos" :key="todo.id">
            <TodoItem :completed="todo.completed">
              <template #title>{{ todo.title }}</template>
              <template #description>{{ todo.description }}</template>
            </TodoItem>
          </div>
          <!-- <TodoAccordion /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

import { retrieveSession } from "@/vueutils/useAuth";
import { allTodos, fetchTodos } from "@/vueutils/useToDo";

import MenuBar from "@/components/MenuBar.vue";
import AppSvgIcon from "./AppSvgIcon.vue";
import TodoItem from "./TodoItem.vue";
import TodoNewForm from "./TodoNewForm.vue";

import Left from "@/assets/svg/todo/chevron-left.svg?component";
import Right from "@/assets/svg/todo/chevron-right.svg?component";

await fetchTodos();
const session = await retrieveSession();
console.log(session);
const todo = reactive({ selected: "", new: false });
</script>
