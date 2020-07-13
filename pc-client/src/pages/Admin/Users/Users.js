import React, { useState, useEffect } from 'react';
import './Users.scss';

import { getAccessTokenApi } from '../../../api/auth';
import { getUsersActiveApi } from '../../../api/user';

import ListUsers from '../../../components/Admin/Users/ListUsers';


export default function Users(){
    const [usersActive, setUsersActive] = useState([]);
    const [usersInactive, setUsersInactive] = useState([]);
    const token = getAccessTokenApi();
    const [reloadUsers, setReloadUsers] = useState(false);

    useEffect(() => {
        getUsersActiveApi(token,true).then(response => {
           setUsersActive(response.users);
        });
        getUsersActiveApi(token,false).then(response => {
            setUsersInactive(response.users);
         });
        setReloadUsers(false); 
    },[token,reloadUsers]);

    return(
        <div className="users">
            <ListUsers usersActive={usersActive} 
                       usersInactive={usersInactive} 
                       setReloadUsers={setReloadUsers}
                       />
        </div>
    );
}