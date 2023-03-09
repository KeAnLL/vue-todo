import { supabase } from "@/lib/supabase";
import type { Todo } from "@/types/todo";
import type { PostgrestResponse } from "@supabase/postgrest-js";

const fetchTodos = async (): Promise<Todo[]> => {
  try {
    const { data, error }: PostgrestResponse<Todo> = await supabase
      .from("todos")
      .select("*")
      .order("id");

    if (error) {
      console.error(error);
      return [];
    }

    if (data == null) {
      return [];
    }

    console.log("Got todo");
    return data;
  } catch (err) {
    console.error("Error retrieving data from db:", err);
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
      console.error("Error when inserting", error);
      return [];
    }

    console.log("New todo created");
    return data;
  } catch (err) {
    console.log("Error when inserting to db:", err);
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
      console.error("Error when updating", error);
      return null;
    }

    console.log(data);
    return data[0];
  } catch (err) {
    console.error("Error when updating the record in db", err);
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

const deleteTodo = async (id: number): Promise<boolean> => {
  try {
    const { error } = await supabase.from("todos").delete().eq("id", id);

    if (error) {
      console.error("Error when deleting", error);
      return false;
    }

    console.log("Delete done");
    return true;
  } catch (err) {
    console.error("Error when deleting record in db", err);
  }
  return false;
};

export { fetchTodos, insertTodo, updateTodo, updateTodoCompletion, deleteTodo };
