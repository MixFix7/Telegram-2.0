import React, {FC} from 'react'
import { BsFillCircleFill } from 'react-icons/bs'

const OnlineStatus: FC<{className?: string}> = ({className}) => {
  return (
    <div className={className}>
      <BsFillCircleFill 
        className='text-lime-500 p-0.5 bg-white rounded-full'
        size={'15px'}
    />
    </div>
  )
}

export default OnlineStatus
