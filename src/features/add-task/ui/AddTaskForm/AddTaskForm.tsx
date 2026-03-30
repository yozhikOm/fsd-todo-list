import { useState } from 'react';
import { useTaskStore } from '@/entities/task/model/store';
import type { Task } from '@/entities/task/model/types';
import { getDayType } from '@/shared/utils/getDayType';
import { PrioritySelect } from '../PrioritySelect/PrioritySelect';
import styles from './AddTaskForm.module.css';
import priorityStyles from '@/shared/ui/priority/priority.module.css';

type Props = {
  onClose: Function;
};

export const AddTaskForm = ({ onClose }: Props) => {
  const [newTask, setNewTask] = useState<Task | null>({
    id: Date.now().toString(),
    title: '',
    description: '',
    completed: false,
    priority: 4,
    date: new Date().toISOString().split('T')[0],
  });
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
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

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTask?.title.trim()) return;
    // TODO add calendar input
    const today = new Date().toISOString().split('T')[0];
    addTask({
      ...newTask,
      date: today,
    });
    setNewTask(null);
    onClose();
  };

  const handleCancel = () => {
    setNewTask(null);
    onClose();
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input
        name='title'
        className={styles.titleInput}
        placeholder='Название задачи'
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

      <div className={styles.actions}>
        <button className={styles.secondary}>
          {newTask ? getDayType(newTask.date!) : 'Сегодня'}
        </button>
        <div className={styles.priorityWrapper}>
          <button
            className={styles.secondary}
            onClick={() => setIsPriorityOpen((prev) => !prev)}
          >
            <span className={priorityStyles[`flag${newTask?.priority || 4}`]}>
              ⚑
            </span>
            Приоритет
          </button>

          {isPriorityOpen && (
            <PrioritySelect
              value={newTask?.priority || 4}
              onChange={(p) =>
                setNewTask((prev) => (prev ? { ...prev, priority: p } : prev))
              }
              onClose={() => setIsPriorityOpen(false)}
            />
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <span className={styles.project}>Входящие</span>

        <div>
          <button className={styles.cancel} onClick={handleCancel}>
            Отмена
          </button>
          <button type='submit' className={styles.submit}>
            Добавить
          </button>
        </div>
      </div>
    </form>
  );
};
