import {
  addDays,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  getDay,
  isSameDay,
} from 'date-fns';
import { ru } from 'date-fns/locale';

export const getDaysOfMonth = (date: Date): Date[] => {
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: 1 }); // неделя начинается с понедельника
  const end = endOfWeek(endOfMonth(date), { weekStartsOn: 1 });
  return eachDayOfInterval({ start, end });
};

export const getToday = () => new Date();

export const getTomorrow = () => addDays(new Date(), 1);

export const getNextMonday = () => {
  const today = new Date();
  const daysUntilMonday = (8 - getDay(today)) % 7;
  return addDays(today, daysUntilMonday === 0 ? 7 : daysUntilMonday);
};

export const getNextSaturday = () => {
  const today = new Date();
  const daysUntilSaturday = (6 - getDay(today) + 7) % 7;
  return addDays(today, daysUntilSaturday === 0 ? 7 : daysUntilSaturday);
};

export const formatMonthYear = (date: Date) =>
  format(date, 'LLLL yyyy', { locale: ru });

export const getDateLabel = (dateString: string) => {
  const inputDate = new Date(parseInt(dateString));
  const today = new Date();

  if (isSameDay(inputDate, today)) {
    return 'Сегодня';
  }
  if (isSameDay(inputDate, addDays(today, 1))) {
    return 'Завтра';
  }
  return format(inputDate, 'd MMM', { locale: ru });
};
