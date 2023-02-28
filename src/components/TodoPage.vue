<template>
  <div class="flex flex-row bg-transparent">
    <!-- <nav class="fixed top-0 left-0 h-screen w-fit bg-white"> -->
    <nav class="h-screen w-fit bg-white text-xs">
      <MenuBar @update="(selected) => (todo.selected = selected)" />
    </nav>
    <div class="container bg-gray-100 max-h-screen overflow-auto">
      <AppModal ref="modal" />
      <TodoSlideOverPanel ref="panel" @submit="submitSection()">
        <template #dialog-title>Add new section</template>
        <template #dialog-description>Get started by filling the information below to create a new section
          for your todo list</template>
        <template #dialog-body>
          <div class="flex flex-col gap-4 px-4 text-base">
            <div>
              <label class="block pb-1 font-medium">Section name</label>
              <input type="text" v-model.lazy="sectionName"
                class="w-full rounded-lg border-gray-400 px-1 py-0.5 shadow-sm focus:border-gray-400 focus:outline-none focus:ring-0" />
            </div>
            <div>
              <label class="block pb-1 font-medium">Section description</label>
              <textarea v-model.lazy="sectionDescription"
                class="h-28 w-full rounded-lg border-gray-400 px-1 py-0.5 shadow-sm focus:border-gray-400 focus:outline-none focus:ring-0"></textarea>
            </div>
          </div>
        </template>
        <template #dialog-button>Add section</template>
      </TodoSlideOverPanel>
      <div id="selected-top-banner"
        class="flex w-full flex-row items-center justify-between px-10 py-5 text-center font-semibold text-gray-500">
        <div class="inline-flex items-center justify-center rounded-lg py-2 pl-2 pr-3 hover:bg-gray-200">
          <Left class="p-0.5" />
          Previous
        </div>
        <span class="text-lg">
          {{ todo.selected }}
        </span>
        <div class="inline-flex items-center justify-center rounded-lg py-2 pl-3 pr-2 hover:bg-gray-200">
          Next
          <Right class="p-0.5" />
        </div>
      </div>
      <div id="todo-container" class="px-[10vw]">
        <div class="flex h-fit w-full flex-row-reverse gap-4 pb-3">
          <button class="text-medium mt-3 mb-2 h-fit w-fit rounded-lg bg-secondary py-2.5 pl-6 pr-4 font-bold text-white"
            :class="{ hidden: todo.new }" @click="() => (todo.new = !todo.new)">
            <div class="inline-flex items-center justify-center">
              <span class="mr-1">New Todo</span>
              <AppSvgIcon dirName="todo" iconName="add" class="h-[25px] w-auto p-0.5" />
            </div>
          </button>
          <button class="text-medium mt-3 mb-2 h-fit w-fit rounded-lg bg-primary py-2.5 pl-6 pr-4 font-bold text-white"
            @click="openPanel()">
            <div class="inline-flex items-center justify-center">
              <span class="mr-1">New Section</span>
              <AppSvgIcon dirName="todo" iconName="folder-plus" class="h-[25px] w-auto p-0.5" />
            </div>
          </button>
        </div>
        <div id="todo-item-with-scrollspy" class="flex flex-row w-full">
          <ol id="scrollspy" class=" pr-10">
            <span class="uppercase font-bold">Sections</span>
            <li v-for="section in todoSections"><a :href="'#' + section.section_name">{{ section.section_name }}</a></li>
          </ol>
          <div id="todo-items-container" class="grow">
            <div :id="section.section_name" v-for="section in todoSections" :key="section.section_id" class="section">
              <div class="py-2 pl-2 text-2xl font-bold">
                {{ section.section_name }}
              </div>
              <div v-for="todo in retrieveTodosUnderSection(section.section_id)" :key="todo.id">
                <TodoItem :id="todo.id" :title="todo.title" :description="todo.description" :completed="todo.completed"
                  :section="todo.todo_section_id" />
              </div>
              <TodoNewState :section="section.section_id" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <AppNotification></AppNotification>

  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onUpdated } from "vue";
import { storeToRefs } from "pinia";

import { useTodosStore } from "@/stores/todo";
import { useTodoSectionStore } from "@/stores/todoSection";
import { useAuthStore } from "@/stores/auth";

import MenuBar from "@/components/MenuBar.vue";
import AppModal from "./AppModal.vue";
import AppSvgIcon from "./AppSvgIcon.vue";
import TodoItem from "./TodoItem.vue";
import TodoSlideOverPanel from "./TodoSlideOverPanel.vue";
import AppNotification from "./AppNotificationView.vue";
import TodoNewState from "./TodoNewState.vue";

import Left from "@/assets/svg/todo/chevron-left.svg?component";
import Right from "@/assets/svg/todo/chevron-right.svg?component";

const { retrieveTodosUnderSection } = storeToRefs(useTodosStore());
const { storeFetchTodos } = useTodosStore();
const { todoSections } = storeToRefs(useTodoSectionStore());
const { storeFetchTodoSections, storeInsertTodoSection } = useTodoSectionStore();
const { session } = storeToRefs(useAuthStore());

const sectionName = ref<string>("");
const sectionDescription = ref<string>("");
const panel = ref<InstanceType<typeof TodoSlideOverPanel> | null>(null);
const modal = ref<InstanceType<typeof AppModal> | null>(null);

const todo = reactive({ selected: "", new: false });

const onElementObserved: IntersectionObserverCallback = (entries) => {
  entries.forEach(({ target, isIntersecting }) => {
    const id = target.getAttribute('id');
    if (isIntersecting) {
      document.querySelector(`a[href="#${id}"]`)?.parentElement?.classList.add("text-red-500");
    } else {
      document.querySelector(`a[href="#${id}"]`)?.parentElement?.classList.remove("text-red-500");
    }
  })
};

const observer = new IntersectionObserver(onElementObserved, {
  root: document.getElementById("todo-item-with-scrollspy"),
  threshold: 0.2,
});

onUpdated(() => {
  document.querySelectorAll('.section').forEach((section) => {
    observer.unobserve(section);
    observer.observe(section);
  })
});

storeFetchTodoSections();
storeFetchTodos();

const openModal = () => {
  modal.value?.open();
};

const openPanel = () => {
  panel.value?.open();
};

const submitSection = async () => {
  if (session.value) {
    await storeInsertTodoSection({
      section_name: sectionName.value,
      section_description: sectionDescription.value,
      user_id: session.value.user.id,
    });
  } else {
    console.log("Session ended");
  }
};
</script>
