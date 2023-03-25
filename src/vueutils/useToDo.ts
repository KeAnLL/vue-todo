import { supabase } from "@/lib/supabase";

import { dbLogger } from "@/utils/logger";

import type { Todo } from "@/types/todo";
import type { PostgrestResponse } from "@supabase/postgrest-js";

const fetchTodos = async (): Promise<Todo[]> => {
  try {
    const { data, error }: PostgrestResponse<Todo> = await supabase
      .from("todos")
      .select("*")
      .order("id");

    if (error) {
      dbLogger("error", "select", "todos");
      return [];
    }

    if (data == null) {
      return [];
    }

    dbLogger("info", "select", "todos", "success");
    return data;
  } catch (err: any) {
    dbLogger("error", "select", "todos", "UncaughtError:", err.message);
  }
  
  return [];
};

const insertTodo = async (todo: Todo): Promise<Todo[]> => {
  try {
    const { data, error }: PostgrestResponse<Todo> = await supabase
      .from("todos")
      .insert(todo)
      .select();

    if (error) {
      dbLogger("error", "insert", "todos", error.message);
      return [];
    }

    dbLogger("log", "insert", "todos", "success");
    return data;
  } catch (err: any) {
      dbLogger("error", "insert", "todos", "UncaughtError:", err.message);
  }
  return [];
};

const updateTodo = async (todo: Todo): Promise<Todo | null> => {
  try {
    const { data, error }: PostgrestResponse<Todo> = await supabase
      .from("todos")
      .update({
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
      })
      .eq("id", todo.id)
      .select();

    if (error) {
      dbLogger("error", "update", "todos", error.message);
      return null;
    }

    dbLogger("log", "update", "todos", data);
    return data[0];
  } catch (err: any) {
    dbLogger("error", "update", "todos", "UncaughtError:", err.message);
  }
  return null;
};

const updateTodoCompletion = async (
  id: number,
  completed: boolean
): Promise<Todo[] | null> => {
  try {
    const { data, error }: PostgrestResponse<Todo> = await supabase
      .from("todos")
      .update({ completed: completed })
      .eq("id", id)
      .select();

    if (error) {
      dbLogger("error", "update", "todos_completion", error.message);
      return null;
    }

    dbLogger("log", "update", "todos_completion", "success");
    return data;
  } catch (err: any) {
    dbLogger("error", "update", "todos_completion", "UncaughtError:", err.message);
    return null;
  }
};

const deleteTodo = async (id: number): Promise<boolean> => {
  try {
    const { error } = await supabase.from("todos").delete().eq("id", id);

    if (error) {
      dbLogger("error", "delete", "todos", error.message);
      return false;
    }

    dbLogger("log", "delete", "todos", "success");
    return true;
  } catch (err: any) {
    dbLogger("error", "delete", "todos", "UncaughtError:", err.message);
  }
  return false;
};

export { fetchTodos, insertTodo, updateTodo, updateTodoCompletion, deleteTodo };
