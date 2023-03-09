import { supabase } from "@/lib/supabase";
import type { TodoSection } from "@/types/todo";
import type { PostgrestResponse } from "@supabase/postgrest-js";

const fetchTodoSections = async (): Promise<TodoSection[]> => {
  try {
    const { data, error }: PostgrestResponse<TodoSection> = await supabase
      .from("todo_sections")
      .select("*")
      .order("section_id");

    if (error) {
      console.error(error);
      // return null;
      return [];
    }

    if (data == null) {
      // allTodoSections.value = [];
      // return null;
      return [];
    }

    // allTodoSections.value = sectionSelection.concat(data);
    return data;
    // console.log(allTodoSections.value);
    console.log("Got todo");
  } catch (err) {
    console.error("Error retrieving data from db:", err);
  }
  return [];
};

const insertTodoSection = async (
  section: TodoSection
): Promise<TodoSection[]> => {
  try {
    const { data, error }: PostgrestResponse<TodoSection> = await supabase
      .from("todo_sections")
      .insert(section)
      .select();

    if (error) {
      console.error("Error when inserting", error);
      return [];
    }

    console.log("New section created");
    return data;
  } catch (err) {
    console.log("Error when inserting to db:", err);
    return [];
  }
};

export { fetchTodoSections, insertTodoSection };
