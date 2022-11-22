import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../AuthContext/AuthCOntext";
import useAdmin from "../CustomeHook/UseAdmin";


const AdminRoute = ({children}) => {
    const {user,loader}=useContext(UserContext);
    const [isAdmin,isAdminLoading]=useAdmin(user?.email);
    let location = useLocation();
    if(loader || isAdminLoading){
        return <div>Loading...</div>

    }

    if (user && isAdmin) {
        return children;
              // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      
    }
  
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
 


export default AdminRoute;