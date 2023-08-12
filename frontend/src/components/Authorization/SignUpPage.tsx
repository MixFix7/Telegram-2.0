import React, { useContext } from 'react'
import style from './../../static/AuthPage.module.css'
import { Link } from 'react-router-dom'
import { urls } from '../Routing/Routing'
import { HaveAccount } from './UI/HaveAccount';
import InputAuth from './UI/InputAuth';
import { AuthContext } from './AuthContext';
import { AuthContextType } from './types';

const SignUpPage: React.FC = () => {
  const {signupUser} = useContext(AuthContext) as AuthContextType

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signupUser(e)
  }

  return (
    <div className={`${style.container} flex items-center justify-center h-screen`}>
        <form className={style.card} onSubmit={handleFormSubmit}>
            <h1 className={style.login}>Sign Up</h1>

            <InputAuth type='text' name='Username' nameInput='username'/>
            <InputAuth type='email' name='Email' nameInput='email'/>
            <InputAuth type='password' name='Password' nameInput='password'/>
            <InputAuth type='password' name='Confirm password' nameInput='password'/>
            <div>
              <div className={style.inputBox}>
                <p className=''>Avatar</p>
                <input type='file' name='avatar' required={true}/>
              </div>
            </div>
             
            
            <HaveAccount 
                className={style.enter}
                title='Do you already have an account?' 
                titlePage='Log In' 
                link='/auth/log-in'
            />
      

            <button type='submit' className={style.enter}>Enter</button>

        </form>
    </div>
  )
}

export default SignUpPage
