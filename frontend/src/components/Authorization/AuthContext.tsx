import { createContext, useState, useEffect, FC, ReactNode, FormEvent } from "react";
import {decodeToken} from 'react-jwt'
import { AuthContextType, TypeFormData } from "./types";
import * as Interfaces from './iterfaces'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: FC<Interfaces.IAuthProvider<ReactNode>>  = ({ children }) => {
    const authTokensParsed: Interfaces.IAuthTokens = JSON.parse(localStorage.getItem('authTokens') || '{"refresh": null, "access": null"}');
    let [authTokens, setAuthTokens] = useState<Interfaces.IAuthTokens | null>(() => localStorage.getItem('authTokens') ? authTokensParsed: null)
    let [user, setUser] = useState<string | null>(() => localStorage.getItem('authTokens') ? decodeToken(authTokensParsed.access) : null)
    let [loading, setLoading] = useState(true)
    

    const loginUser = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      const formData: TypeFormData = {
        username: e.currentTarget.username.value,
        password: e.currentTarget.password.value,
      };
    
      const response = await fetch('http://127.0.0.1:8000/auth/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    
      if (response.status === 200) {
        const data: Interfaces.IAuthTokens = await response.json();
        setAuthTokens(data);
        setUser(decodeToken(data.access));
        localStorage.setItem('authTokens', JSON.stringify(data));
        window.location.href = '/';
      } else {
        const error: {message: string} = await response.json()
        alert(error.message)
      }
    };
    

    const signupUser = async(e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      
      const formData = new FormData();
      const formDataLogin = new FormData()
      formData.append('avatar', e.currentTarget.avatar.files[0]);
      formData.append('username', e.currentTarget.username.value);
      formData.append('email', e.currentTarget.email.value);
      formData.append('password', e.currentTarget.password.value);
      
      formDataLogin.append('password', e.currentTarget.password.value);
      formDataLogin.append('username', e.currentTarget.username.value);
      
      const response = await fetch('http://127.0.0.1:8000/auth/token/signup/', {
        method: 'POST',
        body: formData,
      });
      
      
      if (response.status === 200) {
        const login_response = await fetch('http://127.0.0.1:8000/auth/token/', {
          method: 'POST',
          body: formDataLogin
        })
        const data: Interfaces.IAuthTokens = await login_response.json();
        setAuthTokens(data);
          setUser(decodeToken(data.access))
          localStorage.setItem('authTokens', JSON.stringify(data))
          window.location.href = '/'
        } else { 
          const error: {message: string} = await response.json()
        alert(error.message)
      }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
      }
      
      const updateToken = async() => {
        const response = await fetch('http://127.0.0.1:8000/auth/token/refresh/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({'refresh': authTokens!.refresh}),
          });
          
          if (response.status === 200) {
            const data: Interfaces.IAuthTokens = await response.json();
            setAuthTokens(data)
            setUser(decodeToken(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
          } else {
            const error: {message: string} = await response.json();
            alert(error.message)
            logoutUser()
          }
        }
  
        const contextData = {
      user: user,
      loginUser: loginUser,
      logoutUser: logoutUser,
      signupUser: signupUser,
      updateTokens: updateToken,
    };

    useEffect(() => {
        let interval = setInterval(()=> {
            if (authTokens) {
                updateToken()
              }
              
            }, 40000)
        return ()=> clearInterval(interval)

      }, [authTokens, loading])
      
      return (
        <AuthContext.Provider value={contextData}>
        {children}
      </AuthContext.Provider>
    );
  };