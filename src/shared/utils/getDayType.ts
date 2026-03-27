export function getDayType(dateString: string) {
  const inputDate = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const inputDateStr = inputDate.toDateString();
  const todayStr = today.toDateString();
  const tomorrowStr = tomorrow.toDateString();

  if (inputDateStr === todayStr) {
    return 'Сегодня';
  } else if (inputDateStr === tomorrowStr) {
    return 'Завтра';
  } else {
    return inputDate.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
    });
  }
}
