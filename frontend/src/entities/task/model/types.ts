export type PriorityType = 1 | 2 | 3 | 4;

export type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: PriorityType;
  date?: string; // ISO дата
  //duration?: number;
};

export type GetTasksResponse = {
  tasks: Task[];
};

export type AddTaskResponse = {
  addTask: Task;
};

export type AddTaskVariables = {
  title: string;
  description?: string;
  priority: PriorityType;
  date?: string;
  //duration?: number;
};

export type EditTaskResponse = {
  editTask: Task;
};

export type EditTaskVariables = {
  id: string;
  title: string;
  description?: string;
  priority: number;
  date?: string;
};

export type ToggleTaskResponse = {
  toggleTask: {
    id: string;
    completed: boolean;
  };
};

export type ToggleTaskVariables = {
  id: string;
};
