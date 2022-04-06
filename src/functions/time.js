import { format, addHours } from 'date-fns';

export const getTimeList = () => {
  const hours = [...Array(24)].map((_, i) => ('0' + i).slice(-2));
  const minutes = ['00', '15', '30', '45'];
  const timeList = hours.map(hour => minutes.map(minute => hour + ':' + minute)).flat();
  
  return timeList
}

export const getDefaultTime = date => {
  const time = format(new Date(), 'HH:mm:ss');
  const now = new Date(`${date} ${time}`);
  const start = format(addHours(now, 1), 'yyyy/MM/dd HH:00:00');
  const end = format(addHours(now, 2),  'yyyy/MM/dd HH:00:00');

  return (start, end);
}