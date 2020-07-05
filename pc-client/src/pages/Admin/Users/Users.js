import React, { useState, useEffect } from 'react';
import './Users.scss';

import { getAccessTokenApi } from '../../../api/auth';
import { getUsersApi } from '../../../api/user';


export default function Users(){
    const [users, setUsers] = useState([]);
    const token = getAccessTokenApi();

    console.log(users);
    useEffect(() => {
        getUsersApi(token).then(response => {
           setUsers(response);
        });
    },[token]);

    return(
        <div>
            Lista de miembros
        </div>
    );
}