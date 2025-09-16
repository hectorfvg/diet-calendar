import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addDays, subDays } from 'date-fns';

export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const formatDisplayDate = (date: Date): string => {
  return format(date, 'dd/MM/yyyy');
};

export const getCalendarDays = (currentDate: Date): Date[] => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  
  // Començar sempre en dilluns (1) - ajustar el dia d'inici
  const startDay = getDay(monthStart);
  const daysToSubtract = startDay === 0 ? 6 : startDay - 1; // Si és diumenge (0), restar 6 dies
  const startDate = subDays(monthStart, daysToSubtract);
  
  // Acabar sempre en diumenge - ajustar el dia final
  const endDay = getDay(monthEnd);
  const daysToAdd = endDay === 0 ? 0 : 7 - endDay; // Si és diumenge (0), no afegir res
  const endDate = addDays(monthEnd, daysToAdd);
  
  return eachDayOfInterval({ start: startDate, end: endDate });
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return formatDate(date) === formatDate(today);
};

export const isSameMonth = (date: Date, currentMonth: Date): boolean => {
  return date.getMonth() === currentMonth.getMonth() && date.getFullYear() === currentMonth.getFullYear();
};