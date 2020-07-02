import React, { useState, useEffect, createContext } from 'react';
import { getAccessTokenApi, getRefreshTokenApi, refreshAccessTokenApi, logout } from '../api/auth';
import jwtDecode from "jwt-decode";


export const AuthContext = createContext();

export default function AuthProvider(props){
    const { children } = props; //Children es toda la pàgina en la que se estè
    const [user, setUser] = useState({
        user: null,
        isLoading: true
    });
    
    useEffect(()=> {
        checkUserLogin(setUser);

    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

function checkUserLogin(setUser){      
    const accessToken = getAccessTokenApi();
    if (!accessToken) {
        const refreshToken = getRefreshTokenApi();
        if (!refreshToken) {
            logout();
            setUser({
                user: null,
                isLoading: false
            });
        } else {
            refreshAccessTokenApi(refreshToken);
        }
    } else {
        setUser({
            isLoading: false,
            user: jwtDecode(accessToken)
        });
    }

}