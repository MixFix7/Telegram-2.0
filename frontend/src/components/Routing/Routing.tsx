import { createBrowserRouter } from "react-router-dom";
import { Home } from "../Home/Home";
import axios from "axios";
import SignUpPage from '../Authorization/SignUpPage';
import LoginPage from '../Authorization/LogInPage';

export const urls = {
  Home: '/',
  SignUp: '/sign-up',
  LogIn: '/log-in'
}

export const SERVER_URL: string = 'http://localhost:8000'

const router = createBrowserRouter([
    {
        path: urls.Home,
        element: <Home/>,
        loader: async ({request}) => {
            try {
                const response = await axios.get(`http://localhost:8000/api/f/${1}/`);
                return response.data
            
              } catch (error) {
                console.error(error);
                return null
              }
            }
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