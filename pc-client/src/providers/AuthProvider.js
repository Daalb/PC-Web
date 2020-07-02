import React, { useState, useEffect, createContext } from 'react';
import { getAccessTokenApi, getRefreshTokenApi, refreshAccessTokenApi, logout } from '../api/auth';

export const AuthContext = createContext();

export default function AuthProvider(props){
    const { children } = props; //Children es toda la pàgina en la que se estè
    const [user, setUser] = useState({
        user: null,
        isLoading: true
    });
    
    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}