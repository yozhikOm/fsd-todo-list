import { useState } from 'react';
import { TaskActionsMenu, type Task } from '@/entities/task';
import { Dialog } from '@/shared/ui/dialog/Dialog';
import { EditTask } from '@/features/edit-task';
import { getDateLabel } from '@/shared/lib/dateUtils';
import { DotMenuMoreIcon } from '@/shared/ui/icons';
import { useToggleTask } from '@/entities/task/api/useToggleTask';

import styles from './TaskItem.module.css';

type Props = {
  task: Task;
  isEditing: boolean;
  onEdit: () => void;
  onCloseEdit: () => void;
};

export const TaskItem = ({ task, isEditing, onEdit, onCloseEdit }: Props) => {
  //const { toggleTask, deleteTask } = useTaskStore();
  const [toggleTask] = useToggleTask();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState<boolean>(false);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.taskCheckbox}>
          <input
            type='checkbox'
            checked={task.completed}
            onChange={() => toggleTask({ variables: { id: task.id } })}
          />
        </div>
        <div className={styles.itemContent}>
          <div
            className={`${styles.itemTitle} ${
              task.completed ? styles.completed : ''
            }`}
          >
            {task.title}
          </div>
          <div className={styles.itemDate}>
            {task.date && getDateLabel(task.date)}
          </div>
        </div>
        <div className={styles.menu}>
          <button
            className={styles.menuButton}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <DotMenuMoreIcon />
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
      {isEditing && <EditTask task={task} onClose={() => onCloseEdit()} />}
      {isConfirmDialogOpen && (
        <Dialog
          open={isConfirmDialogOpen}
          title='Удалить задачу?'
          description={`Задача "${task.title}" будет удалена без возможности восстановления.`}
          confirmText='Удалить'
          cancelText='Отмена'
          onCancel={() => setIsConfirmDialogOpen(false)}
          onConfirm={() => {
            //deleteTask(task.id);
            setIsConfirmDialogOpen(false);
          }}
        />
      )}
    </>
  );
};
