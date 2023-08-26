import { urls } from "./Routing";
import { FC, useContext } from "react";
import { AuthContext } from "../Authorization/AuthContext";

interface PrivateRouteProps {
    children: React.ReactNode;
}
  
const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
    const authContext = useContext(AuthContext);
    const currentUrl = window.location.href;
    const user = authContext?.user;

   return (
     <>
        {
            user 
            && currentUrl !== 'http://localhost:3000/auth/log-in/'
            ? children : window.location.href = urls.LogIn
        }
     </>
   );
}

export {PrivateRoute}