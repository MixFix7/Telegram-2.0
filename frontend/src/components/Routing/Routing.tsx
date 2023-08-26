import { createBrowserRouter } from "react-router-dom";
import { Home } from "../Home/Home";
import axios from "axios";
import SignUpPage from '../Authorization/SignUpPage';
import LoginPage from '../Authorization/LogInPage';
import { PrivateRoute } from "./PrivateRoute";

export const endPoints = {
  Auth: '/auth/'
}

export const urls = {
  Home: '/',
  SignUp: endPoints.Auth + 'sign-up/',
  LogIn: endPoints.Auth + 'log-in/'
}

export const SERVER_URL: string = 'http://localhost:8000'
export const WEBSOCKET_SERVER_URL: string = 'ws://localhost:8000/ws/'

const router = createBrowserRouter([
    {
        path: urls.Home,
        element:
          <PrivateRoute>
            <Home/>
          </PrivateRoute> 
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