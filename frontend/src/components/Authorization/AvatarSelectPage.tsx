import React, { FC } from 'react'
import style from './../../static/AuthPage.module.css'
import SelectAvatar from './UI/SelectAvatar.jsx'
import { NavLink } from 'react-router-dom'

const AvatarSelectPage: FC = () => {
  return (
    <div className={`${style.container} flex items-center justify-center h-screen`}>
        <div className={style.card}>
            <h1 className={style.login}>Select Avatar</h1>
            
            <SelectAvatar/>
            
            <NavLink to='/' className={style.enter}>Confirm</NavLink>

        </div>
    </div>
  )
}

export default AvatarSelectPage
