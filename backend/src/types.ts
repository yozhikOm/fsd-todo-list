export type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: number;
  date?: string;
};
