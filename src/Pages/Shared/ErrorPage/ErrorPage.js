import React, { useContext } from 'react';
import { useRouteError } from 'react-router-dom';
import { UserContext } from '../../../AuthContext/AuthCOntext';

const ErrorPage = () => {
    const {logOut}=useContext(UserContext);
    const handleLogOut=()=>{
        logOut()
        .then(()=>{})
        .catch(err=>console.log(err))
      }
    const error = useRouteError();
    return (
        <div>
             <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        {error.statusText || error.message}
      </p>
      <button onClick={handleLogOut}>SignOut</button>
        </div>
    );
};

export default ErrorPage;