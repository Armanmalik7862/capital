'use client'

import {createContext, useState, useEffect } from 'react';
import Cookies  from 'js-cookie';



export const GlobalContext = createContext(null);

export default function GlobalState({children}){
    const [isAuthUser, setIsAuthUser] = useState(null);
    const [userInfo, setUserInfo] = useState(null);


    useEffect(() => {
        // Check for the presence of token in cookies
        const token = Cookies.get('token');
        console.log(localStorage.getItem('user'));
        const storedUserData = localStorage.getItem('user');
    
        if (token && storedUserData) {
          try {
            const userData = JSON.parse(storedUserData);
            setIsAuthUser(true);
            setUserInfo(userData);
          } catch (error) {
            console.error("Error parsing user data:", error);
            setIsAuthUser(false);
            setUserInfo(null);
          }
        } else {
          setIsAuthUser(false);
          setUserInfo(null);
        }
      }, []);

    
           
    return(
        <GlobalContext.Provider value={{isAuthUser, setIsAuthUser, userInfo, setUserInfo}}>
            {children}
        </GlobalContext.Provider>
    )
}
