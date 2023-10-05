import React, {FC, useState} from 'react'

interface IDateLabel {
    date: string
}

const DateLabel: FC<IDateLabel> = ({date}) => {
  return (
    <div className={`text-center sm:text-xl my-3 `}>
        <span className='bg-gray-800 p-2 px-3 rounded-full'>
            {date}
        </span>
    </div>
  )
}

export default DateLabel;
