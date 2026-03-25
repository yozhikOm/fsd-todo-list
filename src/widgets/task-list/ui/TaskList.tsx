import { useTaskStore } from "@/entities/task/model/store";

export const TaskList = () => {
  const { tasks, toggleTask, deleteTask } = useTaskStore();

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />
          <span
            style={{
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.title}
          </span>
          <button onClick={() => deleteTask(task.id)}>x</button>
        </div>
      ))}
    </div>
  );
};