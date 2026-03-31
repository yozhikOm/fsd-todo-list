import { useRef } from 'react';
import { useClickOutside } from '@/shared/lib/useClickOutside';

import styles from './Dialog.module.css';

type Props = {
  open: boolean;
  title: string;
  description?: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
};

export const Dialog = ({
  open,
  title,
  description,
  onCancel,
  onConfirm,
  confirmText = 'ОК',
  cancelText = 'Отмена',
}: Props) => {
  if (!open) return null;

  const ref = useRef(null);
  useClickOutside(ref, onCancel);

  return (
    <div ref={ref} className={styles.overlay}>
      <div className={styles.dialog}>
        <h3 className={styles.title}>{title}</h3>

        {description && <p className={styles.description}>{description}</p>}

        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onCancel}>
            {cancelText}
          </button>

          <button className={styles.confirm} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
