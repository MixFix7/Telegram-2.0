import React, {FC} from 'react'
import {GiPlainCircle} from 'react-icons/gi'
import { IOnlineStatus } from '../../types/typeGlobalUIComponents'

const OnlineStatus: FC<{className?: string}> = ({className}) => {
  return (
    <div className={className}>
      <GiPlainCircle
        size={'20px'}
        className='text-lime-500'
      />
    </div>
  )
}

export default OnlineStatus
