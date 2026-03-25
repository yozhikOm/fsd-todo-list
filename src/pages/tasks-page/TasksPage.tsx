import { AddTaskForm } from "@/features/add-task/ui/AddTaskForm";
import { TaskList } from "@/widgets/task-list/ui/TaskList";

export const TasksPage = () => {
  return (
    <div style={{ padding: 20 }}>
      <h1>Smart Todo</h1>
      <AddTaskForm />
      <TaskList />
    </div>
  );
};