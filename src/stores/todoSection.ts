import { defineStore } from "pinia";
import { ref, computed } from "vue";

import { fetchTodoSections, insertTodoSection } from "@/vueutils/useTodoSection";

import type { TodoSection } from "@/types/todo";

const useTodoSectionStore = defineStore("todo_section", () => {
  const defaultSection: TodoSection[] = [
    {
      section_name: "Uncategorized",
      section_description: "null",
      user_id: null,
    },
  ];
  const todoSections = ref<TodoSection[]>(defaultSection);

  const storeFetchTodoSections = async () => {
    todoSections.value = defaultSection;

    const sections = await fetchTodoSections();
    todoSections.value = defaultSection.concat(sections);
  };

  const storeInsertTodoSection = async (section: TodoSection) => {
    const res = await insertTodoSection(section);
    todoSections.value = todoSections.value.concat(res);
  };

  const retrieveSection = (id: number | null): TodoSection => {
    if (id) {
      const section = todoSections.value.find((section) => section.section_id === id);
      if (section) return section;
    }
    return todoSections.value[0];  // null
  }

  return {
    todoSections,
    storeFetchTodoSections,
    storeInsertTodoSection,
    retrieveSection,
  };
});

export { useTodoSectionStore };
