import React, { FC } from 'react'
import { useLoaderData } from 'react-router-dom'
import { useActions } from '../../hooks/useActions'
import { useSelector } from 'react-redux'
import { useTypedSelector } from '../../hooks/useTypedSelector'

export const Home: FC = () => {
  const {isLoading, error, chatsData} = useTypedSelector(state => state.chats) 

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      
      

    </div>
  )
}
