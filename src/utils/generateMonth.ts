import moment from 'moment';

export function getDaysInMonth(month: any, year: any, day: number) {
  const date = new Date(year, month, day);
  const days = [];
  while (date.getMonth() === month) {
    const dayInString = moment(new Date(date)).format('ddd');
    const dayInNumber = moment(new Date(date)).format('DD');
    days.push({day: dayInString, num: dayInNumber});
    date.setDate(date.getDate() + 1);
  }
  return days;
}
