import React, {FC} from 'react'
import { IDispatchMessageDate } from '../../types/typeGlobalUIComponents'
import { getNormalDate } from '../Chats/UI/DateFunctions'

const DispatchMessageDate: FC<IDispatchMessageDate> = ({className, dispatchDateISO}) => {
    const dispatchDate = getNormalDate(dispatchDateISO)

  return (
    <span className={className}> 
        {dispatchDate.substring(20, 23)}
        {dispatchDate.substring(16, 10)}
    </span>
  )
}

export default DispatchMessageDate
