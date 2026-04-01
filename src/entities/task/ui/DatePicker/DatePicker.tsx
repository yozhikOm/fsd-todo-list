import React, { useRef, useState } from 'react';
import { format, isSameDay, isSameMonth, addMonths, subMonths } from 'date-fns';
import {
  getDaysOfMonth,
  getToday,
  getTomorrow,
  getNextMonday,
  getNextSaturday,
  formatMonthYear,
} from '../../lib/taskDateUtils';
import { useClickOutside } from '@/shared/lib/useClickOutside';

import styles from './DatePicker.module.css';

type DatePickerProps = {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  onClose: () => void; // для закрытия при выборе даты
};

export const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onChange,
  onClose,
}) => {
  const [currentMonth, setCurrentMonth] = useState(() => selectedDate || new Date());
  const ref = useRef<HTMLDivElement | null>(null);
  useClickOutside(ref, onClose);

  const days = getDaysOfMonth(currentMonth);
  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleDateSelect = (date: Date) => {
    onChange(date);
    onClose?.();
  };

  const handleQuickSelect = (date: Date | null) => {
    onChange(date);
    onClose?.();
  };

  const isSelected = (day: Date) => selectedDate && isSameDay(day, selectedDate);
  const isCurrentMonth = (day: Date) => isSameMonth(day, currentMonth);

  return (
    <div ref={ref} className={styles.calendar}>
      <div className={styles.quickOptions}>
        <button onClick={() => handleQuickSelect(getToday())}>Сегодня</button>
        <button onClick={() => handleQuickSelect(getTomorrow())}>Завтра</button>
        <button onClick={() => handleQuickSelect(getNextSaturday())}>
          На этих выходных
        </button>
        <button onClick={() => handleQuickSelect(getNextMonday())}>
          На следующей неделе
        </button>
        <button onClick={() => handleQuickSelect(null)}>Без даты</button>
      </div>

      <div className={styles.calendarHeader}>
        <button onClick={handlePrevMonth}>&lt;</button>
        <span>{formatMonthYear(currentMonth)}</span>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>

      <div className={styles.weekDays}>
        {weekDays.map((day) => (
          <div key={day} className={styles.weekDay}>
            {day}
          </div>
        ))}
      </div>

      <div className={styles.daysGrid}>
        {days.map((day) => {
          const isSelectedDay = isSelected(day);
          const isToday = isSameDay(day, new Date());
          const isCurrent = isCurrentMonth(day);

          return (
            <button
              key={day.toISOString()}
              className={`${styles.day} ${
                isSelectedDay ? styles.selected : ''
              } ${isToday ? styles.today : ''} ${
                !isCurrent ? styles.otherMonth : ''
              }`}
              onClick={() => handleDateSelect(day)}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
};
