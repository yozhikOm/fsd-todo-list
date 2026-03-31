import { useState, useEffect, useRef } from 'react';
import { type Task } from '@/entities/task';
import { getDayType } from '@/shared/utils/getDayType';
import { PrioritySelect } from '../PrioritySelect/PrioritySelect';

import styles from './TaskForm.module.css';
import priorityStyles from '@/shared/ui/priority/priority.module.css';

type Props = {
  task?: Task;
  onSubmit: (task: Task) => void;
  onClose: () => void;
  submitLabel?: string;
};

export const TaskForm = ({ task, onClose, onSubmit, submitLabel }: Props) => {
  const [currentTask, setCurrentTask] = useState<Task>(
    task || {
      id: Date.now().toString(),
      title: '',
      description: '',
      completed: false,
      priority: 4,
      date: new Date().toISOString().split('T')[0],
    }
  );
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (task) setCurrentTask(task);
  }, [task]);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentTask.title.trim()) return;

    onSubmit(currentTask);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit} role='form'>
      <input
        ref={titleRef}
        name='title'
        className={styles.titleInput}
        placeholder='Название задачи'
        value={currentTask.title}
        onChange={handleChange}
      />
      <input
        name='description'
        className={styles.descriptionInput}
        placeholder='Описание'
        value={currentTask.description}
        onChange={handleChange}
      />

      <div className={styles.actions}>
        <button className={styles.secondary}>
          {getDayType(currentTask.date!)}
        </button>
        <div className={styles.priorityWrapper}>
          <button
            type='button'
            className={styles.secondary}
            onClick={() => setIsPriorityOpen((prev) => !prev)}
          >
            <span className={priorityStyles[`flag${currentTask.priority}`]}>
              ⚑
            </span>
            Приоритет
          </button>

          {isPriorityOpen && (
            <PrioritySelect
              value={currentTask.priority}
              onChange={(p) =>
                setCurrentTask((prev) => ({ ...prev, priority: p }))
              }
              onClose={() => setIsPriorityOpen(false)}
            />
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <span className={styles.project}>Входящие</span>
        <div>
          <button
            type='button'
            className={styles.cancel}
            onClick={handleCancel}
          >
            Отмена
          </button>
          <button type='submit' className={styles.submit}>
            {submitLabel ?? 'Сохранить'}
          </button>
        </div>
      </div>
    </form>
  );
};
