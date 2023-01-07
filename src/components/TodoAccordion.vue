<template>
  <div>
    <div
      id="accordion-header"
      class="rounded-t-lg bg-white px-6 py-3"
      :class="{
        'rounded-b-lg': accordion.collapse,
      }"
    >
      <button
        @click="() => (accordion.collapse = !accordion.collapse)"
        class="inline-flex w-full justify-between text-left font-bold"
      >
        Accordion title placefolder
        <div
          class="flex h-8 w-8 place-content-center items-center rounded-full hover:bg-gray-100"
        >
          <AppSvgIcon
            componentDirName="todo"
            iconName="bars-3"
            v-if="accordion.collapse"
            class="h-6 w-auto"
          />
          <AppSvgIcon
            componentDirName="todo"
            iconName="bars-arrow-up"
            v-else
            class="h-6 w-auto"
          />
        </div>
      </button>
    </div>
    <div
      id="accordion-item-list"
      class="rounded-b-lg bg-gray-200 py-2"
      :class="{
        hidden: accordion.collapse,
      }"
    >
      <div id="accordion-item" ref="ac" class="py-1.5 pl-10 pr-5">
        <TodoItem></TodoItem>
      </div>
      <div id="accordion-item" ref="ac" class="py-1.5 pl-10 pr-5">
        <TodoItem></TodoItem>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import AppSvgIcon from "./AppSvgIcon.vue";
import TodoItem from "./TodoItem.vue";

const accordion = reactive({ collapse: false });
</script>
