import { useRef } from 'react';
import { useClickOutside } from '@/shared/lib/useClickOutside';
import type { PriorityType } from '@/entities/task';

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
  const ref = useRef<HTMLDivElement | null>(null);

  useClickOutside(ref, onClose);

  return (
    <div ref={ref} className={styles.dropdown}>
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
