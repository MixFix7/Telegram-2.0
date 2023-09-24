import { IChat, IMessage } from "../../../types/typeInstances";

export const isToday = (date: string) => {
    const today = new Date()
    const dateTime: Date = new Date(date);
    return (
      dateTime.getUTCFullYear() === today.getUTCFullYear() &&
      dateTime.getUTCMonth() === today.getUTCMonth() &&
      dateTime.getUTCDate() === today.getUTCDate()
    );
  };

export const isTodayYear = (date: string) => {
  const today = new Date()
  const dateTime: Date = new Date(date)
  return dateTime.getUTCFullYear() === today.getFullYear()
}
  
  
const getTwoDigitValue = (value: number) => {
  return value < 10 ? `0${value}` : value.toString();
};

export const getNormalDate = (date: string) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dateTime = new Date(date);

  const year = dateTime.getUTCFullYear();
  const month = dateTime.getUTCMonth();
  const day = dateTime.getUTCDate();
  const hour = dateTime.getUTCHours();
  const minute = dateTime.getUTCMinutes();
  const second = dateTime.getUTCSeconds();
  const dayOfWeek = daysOfWeek[dateTime.getUTCDay()];
  const monthName = months[month];

  const formattedMonth = getTwoDigitValue(month + 1);
  const formattedDay = getTwoDigitValue(day);
  const formattedHour = getTwoDigitValue(hour);
  const formattedMinute = getTwoDigitValue(minute);
  const formattedSecond = getTwoDigitValue(second);

  return `${year}.${formattedMonth}.${formattedDay} ${formattedHour}:${formattedMinute}:${formattedSecond} ${dayOfWeek}, ${monthName} ${day}`;
};


export const compareDates = (a: IChat, b: IChat): number => {
  const messageA = a.last_message?.dispatch_date
  const messageB = b.last_message?.dispatch_date
  
  const dateA = messageA ? new Date(messageA).getTime() : 0
  const dateB = messageB ? new Date(messageB).getTime() : 0

  return dateB - dateA
}