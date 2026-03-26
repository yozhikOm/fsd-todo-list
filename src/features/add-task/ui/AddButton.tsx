import { useTaskStore } from "@/entities/task/model/store";
import styles from "./AddButton.module.css";

export const AddButton = () => {
  const addTask = useTaskStore((s) => s.addTask);

  const handleClick = () => {
    const title = prompt("Название задачи");
    if (title) addTask(title);
  };

  return (
    <button 
      type="button" 
      className={styles.addButton}
      onClick={handleClick}
    >
      <span className={styles.addIcon}>+</span>
      Добавить задачу
    </button>
  );
};