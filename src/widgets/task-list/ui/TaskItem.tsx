import type { Task } from '@/entities/task';
import { useTaskStore } from '@/entities/task/model/store';
import { useState } from 'react';
import { TaskActionsMenu } from '@/entities/task/ui/TaskActionsMenu/TaskActionsMenu';
import { Dialog } from '@/shared/ui/dialog/Dialog';
import { EditTask } from '@/features/edit-task';

import styles from './TaskItem.module.css';


type Props = {
  task: Task;
};

export const TaskItem = ({ task }: Props) => {
  const { toggleTask, deleteTask } = useTaskStore();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState<boolean>(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.taskCheckbox}>
          <input
            type='checkbox'
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />
        </div>
        <div className={styles.itemContent}>
          <div className={styles.itemTitle}>
            <div
              style={{
                /* TODO вынести в стили */
                textDecoration: task.completed ? 'line-through' : 'none',
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
          <button
            className={styles.menuButton}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            ...
          </button>
          {isMenuOpen && (
            <TaskActionsMenu
              onEdit={() => {
                setIsMenuOpen(false);
                setIsEditFormOpen(true);
              }}
              onDelete={() => {
                setIsMenuOpen(false);
                setIsConfirmDialogOpen(true);
              }}
              onClose={() => setIsMenuOpen(false)}
            />
          )}
        </div>
      </div>
      {isEditFormOpen && (
        <EditTask task={task} onClose={() => setIsEditFormOpen(false)} />
      )}
      {isConfirmDialogOpen && (
        <Dialog
          open={isConfirmDialogOpen}
          title='Удалить задачу?'
          description={`Задача "${task.title}" будет удалена без возможности восстановления.`}
          confirmText='Удалить'
          cancelText='Отмена'
          onCancel={() => setIsConfirmDialogOpen(false)}
          onConfirm={() => {
            deleteTask(task.id);
            setIsConfirmDialogOpen(false);
          }}
        />
      )}
    </>
  );
};
