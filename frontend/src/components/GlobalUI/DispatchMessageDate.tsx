import React, {FC} from 'react'
import { IDispatchMessageDate } from '../../types/typeGlobalUIComponents'

const isToday = (date: string) => {
    const today = new Date()
    const dateTime: Date = new Date(date);
    return (
      dateTime.getUTCFullYear() === today.getUTCFullYear() &&
      dateTime.getUTCMonth() === today.getUTCMonth() &&
      dateTime.getUTCDate() === today.getUTCDate()
    );
  };
  
  
const getTwoDigitValue = (value: number) => {
  return value < 10 ? `0${value}` : value.toString();
};

const getNormalDate = (date: string) => {
  const dateTime: Date = new Date(date);

  const year: number = dateTime.getUTCFullYear();
  const month: number = dateTime.getUTCMonth() + 1;
  const day: number = dateTime.getUTCDate();
  const hour: number = dateTime.getUTCHours();
  const minute: number = dateTime.getUTCMinutes();
  const second: number = dateTime.getUTCSeconds();

  const formattedMonth = getTwoDigitValue(month);
  const formattedDay = getTwoDigitValue(day);
  const formattedHour = getTwoDigitValue(hour);
  const formattedMinute = getTwoDigitValue(minute);
  const formattedSecond = getTwoDigitValue(second);

  return `${year}.${formattedMonth}.${formattedDay} ${formattedHour}:${formattedMinute}:${formattedSecond}`;
};

const DispatchMessageDate: FC<IDispatchMessageDate> = ({className, dispatchDateISO}) => {
    const dispatchDate = getNormalDate(dispatchDateISO)

  return (
    <span className={className}> 
        {isToday(dispatchDate) 
            ? dispatchDate.substring(16, 10) 
            : dispatchDate.substring(0, 10)}
    </span>
  )
}

export default DispatchMessageDate
