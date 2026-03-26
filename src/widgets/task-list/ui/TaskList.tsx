import { useTaskStore } from "@/entities/task/model/store";
import { TaskItem } from "./TaskItem";

export const TaskList = () => {
  const tasks = useTaskStore((s) => s.tasks);

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};