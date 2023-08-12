import React, { FC } from 'react'
import style from './../../../static/AuthPage.module.css'
import * as Interfaces from '../iterfaces'

const InputAuth: FC<Interfaces.IInputAuth> = ({name, nameInput, type}) => {
  return (
    <div>
      <div className={style.inputBox}>
        <input type={type} name={nameInput} required={true}/>
        <span>{name}</span>
      </div>
    </div>
  )
}

export default InputAuth
