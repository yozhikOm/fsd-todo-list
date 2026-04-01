import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { usePopoverPosition } from '@/shared/lib/usePopoverPosition';
import { useClickOutside } from '@/shared/lib/useClickOutside';
import type { PriorityType } from '@/entities/task';

import styles from './PrioritySelect.module.css';
import priorityStyles from '@/shared/ui/priority/priority.module.css';

type Props = {
  value: PriorityType;
  onChange: (priority: PriorityType) => void;
  onClose: () => void; // для закрытия при выборе приоритета
  anchor: HTMLElement | null;
};

const PRIORITY_VALUES: PriorityType[] = [1, 2, 3, 4];
const PRIORITY_TEXTS: string[] = [
  'Супер важно!',
  'Важно',
  'Подождёт',
  'Никогда-нибудь',
];

export const PrioritySelect = ({ value, onChange, onClose, anchor }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { position, isVisible } = usePopoverPosition(anchor, ref);
  useClickOutside(ref, onClose);

  return createPortal (
    <div
      ref={ref}
      className={styles.dropdown}
      style={{
        top: position.top,
        left: position.left,
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
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
    </div>,
    document.body
  );
};
