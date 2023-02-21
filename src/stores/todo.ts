import { ref, computed } from "vue";
import { defineStore } from "pinia";

import type { Todo } from "@/types/todo";

const useTodosStore = defineStore("todos", () => {
  const todos = ref<Todo[]>([]);

  const completedTodos = computed(() => todos.value.filter((todo) => todo.completed));

  
});

export { useTodosStore };
