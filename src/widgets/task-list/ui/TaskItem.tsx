import { useState } from 'react';
import { TaskActionsMenu, useTaskStore, type Task } from '@/entities/task';
import { Dialog } from '@/shared/ui/dialog/Dialog';
import { EditTask } from '@/features/edit-task';

import styles from './TaskItem.module.css';

type Props = {
  task: Task;
  isEditing: boolean;
  onEdit: () => void;
  onCloseEdit: () => void;
};

export const TaskItem = ({ task, isEditing, onEdit, onCloseEdit }: Props) => {
  const { toggleTask, deleteTask } = useTaskStore();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState<boolean>(false);

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
                onEdit();
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
      {isEditing && (
        <EditTask task={task} onClose={() => onCloseEdit()} />
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
