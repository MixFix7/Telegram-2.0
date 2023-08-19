import React, {useContext, useState, ChangeEvent, useEffect} from 'react'
import { useActions } from '../../../../hooks/useActions'
import { AuthContext } from '../../../Authorization/AuthContext'
import { AuthContextType } from '../../../Authorization/types'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'

const SeactChats = () => {
  const [query, setQuery] = useState<string>('')

  const {setSearchQuery, searchChats, setChats} = useActions()
  const {searchQuery} = useTypedSelector(state => state.searchChats)
  const {chatsData} = useTypedSelector(state => state.chats)

  const {user} = useContext(AuthContext) as AuthContextType

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value)
    setSearchQuery({
      query: e.currentTarget.value,
      username: user!.username,
    })
  }
  

  useEffect(() => {
    setChats(chatsData)
  }, [chatsData])

  useEffect(() => {
    searchChats()
  }, [searchQuery])

  return (
    <div className='w-9/12'>
      <input 
        type="text"
        className='w-full p-2 px-4 bg-gray-600 rounded-full'
        placeholder='Search...'
        style={{outline: 'none', borderColor: '#ccc'}}
        value={query}
        onChange={handleSearchInput}
      />
    </div>
  )
}

export default SeactChats
