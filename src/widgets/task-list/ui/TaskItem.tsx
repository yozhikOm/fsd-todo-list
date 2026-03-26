import type { Task } from "@/entities/task/model/types";
import { useTaskStore } from "@/entities/task/model/store";
import styles from "./TaskItem.module.css";

type Props = {
  task: Task;
};

export const TaskItem = ({ task }: Props) => {
  const { toggleTask, deleteTask } = useTaskStore();

  return (
    <div className={styles.container}>
      <div className={styles.taskCheckbox}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />
      </div>
      <div className={styles.itemContent}>
        <div className={styles.itemTitle}>
          <div
            style={{
              /* TODO вынести в стили */
              textDecoration: task.completed ? "line-through" : "none",
              fontSize: 16,
            }}
          >
            {task.title}
          </div>
        </div>
        <div className={styles.itemDate}>
          {/* TODO дата пока мок */}
          Сегодня
        </div>
      </div>
      <div className={styles.menu}>
        <button className={styles.menuButton}>
          ...
        </button>
      </div>
    </div>
  );
};