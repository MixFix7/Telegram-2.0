import React from 'react'
import SeactChats from './SearchChats/SearchChats'
import OptionsShowButton from './OptionsButton/OptionsShowButton'

const ChatsTopPanel = () => {
  return (
    <div className='w-full h-16 flex items-center justify-center'>
      <OptionsShowButton/>
      <SeactChats/>
    </div>
  )
}

export default ChatsTopPanel
