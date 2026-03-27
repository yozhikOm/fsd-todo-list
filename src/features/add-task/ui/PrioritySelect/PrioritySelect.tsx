import type { PriorityType } from '@/entities/task/model/types';
import styles from './PrioritySelect.module.css';
import priorityStyles from '@/shared/ui/priority/priority.module.css';

type Props = {
  value: PriorityType;
  onChange: (priority: PriorityType) => void;
  onClose: () => void;
};

const PRIORITY_VALUES: PriorityType[] = [1, 2, 3, 4];
const PRIORITY_TEXTS: string[] = [
  'Супер важно!',
  'Важно',
  'Подождёт',
  'Никогда-нибудь',
];

export const PrioritySelect = ({ value, onChange, onClose }: Props) => {
  return (
    <div className={styles.dropdown}>
      {PRIORITY_VALUES.map((p) => (
        <div
          key={p}
          className={styles.item}
          onClick={() => {
            onChange(p);
            onClose();
          }}
        >
          <span className={priorityStyles[`flag${p}`]}>⚑</span>
          {/* Приоритет {p} */}
          {PRIORITY_TEXTS[p - 1]}
          {value === p && ' ✓'}
        </div>
      ))}
    </div>
  );
};
