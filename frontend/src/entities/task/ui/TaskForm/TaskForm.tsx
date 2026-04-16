import { useState, useEffect, useRef } from 'react';
import { type Task } from '@/entities/task';
import { getDateLabel } from '@/shared/lib/dateUtils';
import { PrioritySelect } from '../PrioritySelect/PrioritySelect';
import { DatePicker } from '../DatePicker/DatePicker';
import { CalendarIcon, FlagIcon } from '@/shared/ui/icons';

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
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const pickDateBtnRef = useRef<HTMLButtonElement>(null);
  const priorityBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (task) setCurrentTask(task);
  }, [task]);

  useEffect(() => {
    titleRef.current?.focus();
    if (titleRef.current) {
      titleRef.current.style.height = 'auto';
      titleRef.current.style.height = titleRef.current.scrollHeight + 'px';
    }
    if (descriptionRef.current) {
      descriptionRef.current.style.height = 'auto';
      descriptionRef.current.style.height =
        descriptionRef.current.scrollHeight + 'px';
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentTask((prev) => ({ ...prev, [name]: value }));

    // если элемент — textarea, авто-рост
    if (e.target instanceof HTMLTextAreaElement) {
      e.target.style.height = 'auto'; // сброс
      e.target.style.height = e.target.scrollHeight + 'px'; // выставляем по контенту
    }
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
      <textarea
        ref={titleRef}
        name='title'
        className={styles.titleInput}
        placeholder='Название задачи'
        value={currentTask.title}
        onChange={handleChange}
      />
      <textarea
        ref={descriptionRef}
        name='description'
        className={styles.descriptionInput}
        placeholder='Описание'
        value={currentTask.description}
        onChange={handleChange}
      />

      <div className={styles.actions}>
        <button
          ref={pickDateBtnRef}
          type='button'
          className={styles.secondary}
          onClick={() => setIsDatePickerOpen(true)}
        >
          <span className={styles.datePicker}>
            <CalendarIcon />
            {currentTask.date ? getDateLabel(currentTask.date) : 'Дата'}
          </span>
        </button>
        {isDatePickerOpen && (
          <DatePicker
            selectedDate={currentTask?.date ? new Date(currentTask.date) : null}
            onChange={(date: Date | null) => {
              setCurrentTask((prev) => ({
                ...prev,
                date: date?.toISOString()
              }));
            }}
            onClose={() => {
              setIsDatePickerOpen(false);
              titleRef.current?.focus();
            }}
            anchor={pickDateBtnRef.current}
          />
        )}

        <button
          ref={priorityBtnRef}
          type='button'
          className={styles.secondary}
          onClick={() => setIsPriorityOpen((prev) => !prev)}
        >
          <span
            className={`${priorityStyles.flag} ${
              priorityStyles[`flag${currentTask.priority}`]
            }`}
            data-testid='priority-flag'
          >
            <FlagIcon />
            Приоритет
          </span>
        </button>
        {isPriorityOpen && (
          <PrioritySelect
            value={currentTask.priority}
            onChange={(p) =>
              setCurrentTask((prev) => ({ ...prev, priority: p }))
            }
            onClose={() => {
              setIsPriorityOpen(false);
              titleRef.current?.focus();
            }}
            anchor={priorityBtnRef.current}
          />
        )}
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
