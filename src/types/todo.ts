export interface Todo {
  id: number;
  title: string;
  description: string;
  user_id: string;
  completed: boolean;
  created_at?: string;
}
