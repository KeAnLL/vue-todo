import { defineStore } from "pinia";
import { computed, ref } from "vue";

import {
  deleteTodo,
  fetchTodos,
  insertTodo,
  updateTodo,
  updateTodoCompletion,
} from "@/vueutils/useToDo";

import type { Todo } from "@/types/todo";

const useTodosStore = defineStore("todos", () => {
  const todo = ref<Todo>();
  const todos = ref<Todo[]>([]);
  const todoNotification = ref<Todo[]>([]);
  const loading = ref<boolean>(false);

  const completedTodos = computed(() =>
    todos.value.filter((todo) => todo.completed)
  );

  const retrieveTodosUnderSection = computed(() => {
    return (section_id?: number) =>
      todos.value.filter((todo) => todo.todo_section_id == section_id);
  });

  const storeFetchTodos = async () => {
    todos.value = [];
    loading.value = true;

    try {
      todos.value = await fetchTodos();
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const storeFetchTodo = async (id: number) => {
    todo.value = undefined;

    try {
      todos.value = await fetchTodos();
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const storeInsertTodo = async (todo: Todo) => {
    try {
      const res = await insertTodo(todo);
      todos.value = todos.value.concat(res);
    } catch (err) {
      console.error(err);
    }
  };

  const storeUpdateTodo = async (todo: Todo) => {
    try {
      const res = await updateTodo(todo);
      if (res) {
        const index = todos.value.findIndex((todo) => todo.id === res.id);
        const target = todos.value[index];
        if (target) {
          target.title = res.title;
          target.description = res.description;
          target.completed = res.completed;
        } else {
          console.error("Local todo item not found after updating");
        }
      } else {
        console.error("Empty return object after updating");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const storeUpdateTodoCompletion = async (id: number) => {
    try {
      todo.value = todos.value.find((todo) => todo.id === id);
      if (todo.value) {
        const res = await updateTodoCompletion(id, !todo.value.completed);
        console.log(res);
        todo.value.completed = !todo.value.completed;
        todoNotification.value.push(todo.value);
      } else {
        console.error("Todo not found in store");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const storeDeleteTodo = async (id: number) => {
    try {
      const deleted = await deleteTodo(id);
      if (deleted) {
        const index = todos.value.findIndex((todo) => todo.id === id);
        todos.value.splice(index, 1);
      } else {
        console.error("Error when deleting todo");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const removeNotification = (id: number) => {
    todoNotification.value = todoNotification.value.filter(
      (todo) => todo.id !== id
    );
  };

  return {
    todo,
    todos,
    todoNotification,
    loading,
    completedTodos,
    retrieveTodosUnderSection,
    storeFetchTodo,
    storeFetchTodos,
    storeInsertTodo,
    storeUpdateTodo,
    storeUpdateTodoCompletion,
    storeDeleteTodo,
    removeNotification,
  };
});

export { useTodosStore };
