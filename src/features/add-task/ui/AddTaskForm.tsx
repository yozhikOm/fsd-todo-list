import { useState } from 'react';
import { useTaskStore } from '@/entities/task/model/store';
import styles from './AddTaskForm.module.css';
import type { Task } from '@/entities/task/model/types';

export const AddTaskForm = () => {
  const [newTask, setNewTask] = useState<Task | null>(null);

  const addTask = useTaskStore((s) => s.addTask);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewTask((prev) => {
      if (!prev) {
        return {
          id: Date.now().toString(),
          title: name === 'title' ? value : '',
          description: name === 'description' ? value : '',
          completed: false,
          priority: 4,
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask?.title.trim()) return;

    addTask(newTask);
    setNewTask(null);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input
        name='title'
        placeholder='Новая задача...'
        value={newTask?.title}
        onChange={handleChange}
      />
      <input
        name='description'
        className={styles.descriptionInput}
        placeholder='Описание'
        value={newTask?.description}
        onChange={handleChange}
      />
      <button type='submit'>Добавить</button>
    </form>
  );
};
