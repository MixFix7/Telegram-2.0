import React, { FC } from 'react'


const LoadingChat: FC = () => {
  return (
    <div
        className={`
          w-full h-20 flex 
          cursor-pointer
          items-center justify-center
          p-2
        `}
      >
        <div className='flex items-center justify-center w-1/4'>
            <div className='rounded-full w-16 h-16 bg-gray-700 animate-pulse'/>
        </div>
        <div className='flex flex-col items-start justify-start w-3/4 ml-2'>
          <div className='w-full'>
            <div className='flex items-center w-full justify-between'>
              <span className='font-bold text-xl bg-gray-700 rounded-xl animate-pulse'>
                ㅤㅤㅤㅤㅤ
              </span>          
            </div>
          </div>
          <div className='bg-gray-700 flex items-center mt-1 w-10/12 rounded-xl animate-pulse '>
            <p>ㅤㅤㅤㅤ</p>
          </div>
      </div>
    </div>
  )
}

export default LoadingChat
