export const isSameDay = (firstDate: Date, secondDate: Date) => {
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );
};

export const addDays = (date: Date, days: number | null) => {
  if (days === null) days = 0;
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
