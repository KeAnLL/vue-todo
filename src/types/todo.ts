export interface Todo {
  /** unique ID for todo instance */
  id?: number;
  /** the title of todo instance */
  title: string;
  /**  */
  description: string;
  user_id: string;
  completed: boolean;
  todo_section_id: number | null;
  created_at?: string;
}

export interface TodoSection {
  section_id?: number;
  created_at?: string;
  section_name: string;
  section_description: string;
  user_id: string;
}
