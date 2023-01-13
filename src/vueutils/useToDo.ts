import { supabase } from "@/lib/supabase";
import type { Todo } from "@/types/todo";
import type { PostgrestResponse } from "@supabase/postgrest-js";
import { ref } from "vue";

const allTodos = ref<Todo[]>([]);

const fetchTodos = async (): Promise<null> => {
  try {
    const { data, error }: PostgrestResponse<Todo> = await supabase
      .from("todos")
      .select("*")
      .order("id");

    if (error) {
      console.error(error);
      return null;
    }

    if (data == null) {
      allTodos.value = [];
      return null;
    }

    allTodos.value = data;
    console.log("Got todo");
  } catch (err) {
    console.error("Error retrieving data from db:", err);
  }
  return null;
};

const insertTodo = async (todo: Todo): Promise<Todo[] | null> => {
  try {
    const { data, error }: PostgrestResponse<Todo> = await supabase
      .from("todos")
      .insert(todo)
      .select();

    if (error) {
      console.error("Error when inserting", error);
      return null;
    }

    console.log("New todo created");
    return data;
  } catch (err) {
    console.log("Error when inserting to db:", err);
    return null;
  }
};

const updateTodoCompletion = async (
  todo: Todo,
  completed: boolean
): Promise<Todo[] | null> => {
  try {
    const { data, error }: PostgrestResponse<Todo> = await supabase
      .from("todos")
      .update({ completed: completed })
      .eq("id", todo.id)
      .select();

    if (error) {
      console.error("Error when updating", error);
      return null;
    }

    console.log("Update done");
    return data;
  } catch (err) {
    console.log("Error when updating to db", err);
    return null;
  }
};

const deleteTodo = async (todo: Todo): Promise<undefined | null> => {
  try {
    const { error } = await supabase.from("todos").delete().eq("id", todo.id);
    if (error) {
      console.error("Error when deleting", error);
      return null;
    }

    console.log("Update done");
  } catch (err) {
    console.log("Error when deleting record in db", err);
    return null;
  }
};

export { allTodos, fetchTodos, insertTodo, updateTodoCompletion, deleteTodo };
