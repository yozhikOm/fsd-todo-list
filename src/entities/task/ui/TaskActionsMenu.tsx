import { EditIcon, DeleteIcon } from '@/shared/ui/icons';
import styles from './TaskActionsMenu.module.css';
import { useClickOutside } from '@/shared/lib/useClickOutside';
import { useRef } from 'react';

type Props = {
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
};

export const TaskActionsMenu = ({ onEdit, onDelete, onClose }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  
  useClickOutside(ref, onClose);

  return (
    <div ref={ref} className={styles.dropdown}>
      <div className={styles.menuItem} onClick={onEdit}>
        <EditIcon />
        <span>Редактировать</span>
      </div>

      <div className={styles.divider} />

      <div className={`${styles.menuItem} ${styles.delete}`} onClick={onDelete}>
        <DeleteIcon />
        <span>Удалить</span>
      </div>
    </div>
  );
};
