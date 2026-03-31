import { AddIcon } from '@/shared/ui/icons';
import styles from './AddButton.module.css';

type Props = {
  onClick: Function;
};

export const AddButton = ({ onClick }: Props) => {
  return (
    <button
      type='button'
      className={styles.addButton}
      onClick={() => onClick()}
    >
      <span className={styles.addIcon}>
        <AddIcon />
      </span>
      Добавить задачу
    </button>
  );
};
