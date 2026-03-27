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
        <svg width="13" height="13"><path fill="currentColor" fillRule="evenodd" d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1z"></path></svg>
      </span>
      Добавить задачу
    </button>
  );
};
