import { format, addHours } from 'date-fns';

// 分のリスト
export const getTimeList = () => {
  const hours = [...Array(24)].map((_, i) => ('0' + i).slice(-2));
  const minutes = ['00', '15', '30', '45'];
  const timeList = hours.map(hour => minutes.map(minute => hour + ':' + minute)).flat();
  
  return timeList
}

// フォーム用初期値
export const getDefaultTime = date => {
  const time = format(new Date(), 'HH:mm');
  const now = new Date(`${date} ${time}`);
  const start = format(addHours(now, 1), 'yyyy/MM/dd HH:00');
  const end = format(addHours(now, 2),  'yyyy/MM/dd HH:00');

  return [start, end];
}

// 終了日時判定
export const checkEndTime = (startDate, startTime, endDate, endTime) => {
  const start = new Date(`${startDate} ${startTime}`).getTime();
  const end = new Date(`${endDate} ${endTime}`).getTime();
  
  return start < end;
}