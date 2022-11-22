import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.init';
export const UserContext=createContext();

const auth=getAuth(app);
const AuthCOntext = ({children}) => {
    const [user,setUser]=useState([]);
    const [loader,setLoader]=useState(true);

const userSignIn=(email,password)=>{
    setLoader(true);
    return signInWithEmailAndPassword(auth,email,password);
}

    const userRegister=(email,password)=>{
        setLoader(true);
            return createUserWithEmailAndPassword(auth,email,password);
    }
    useEffect(()=>{
        const unSubscribe=onAuthStateChanged(auth,(currentUser)=>{
            
           setUser(currentUser) ;
           setLoader(false);
           
        })
        return ()=>{
            unSubscribe();
        }
    },[])
    const updateUser=(infoUser)=>{
        return updateProfile(auth.currentUser,infoUser);

    }
    const logOut=()=>{
        return signOut(auth);
    }
    const userInfo={user,userRegister,userSignIn,updateUser,logOut,loader};
    return (
        <UserContext.Provider value={userInfo}>
{children}
        </UserContext.Provider>
    );
};

export default AuthCOntext;