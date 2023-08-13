import { createBrowserRouter } from "react-router-dom";
import { Home } from "../Home/Home";
import axios from "axios";
import SignUpPage from '../Authorization/SignUpPage';
import LoginPage from '../Authorization/LogInPage';

export const endPoints = {
  Auth: '/auth/'
}

export const urls = {
  Home: '/',
  SignUp: endPoints.Auth + 'sign-up/',
  LogIn: endPoints.Auth + 'log-in/'
}

export const SERVER_URL: string = 'http://localhost:8000'

const router = createBrowserRouter([
    {
        path: urls.Home,
        element: <Home/>,
      }, 
          // AUTHORIZATION
      {
        path: urls.SignUp,
        element: <SignUpPage/>
      },
      {
        path: urls.LogIn,
        element: <LoginPage/>,
      },
        
])

export default router