import React,{ useState } from 'react';
import { Switch, List, Avatar, Button } from 'antd';
import { EditOutlined, StopOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import NoAvatar from '../../../../assets/img/png/no-avatar.png';

import './ListUsers.scss';

export default function ListUsers(props){
    const { usersActive, usersInactive } = props;
    const [viewUsersActive,setViewUsersActive] = useState(true); 
    
    //console.log(usersActive);
    
   
    return(
        <div className='list-users'>
            <div className='list-users__switch'>
                <Switch
                    defaultChecked
                    onChange={()=>setViewUsersActive(!viewUsersActive)}
                />
                <span>
                    {viewUsersActive ? "Usuarios Activos" : "Usuarios Inactivos"}
                </span>
            </div>
            {viewUsersActive ? <UsersActive usersActive={usersActive}/> : <UsersInactive usersInactive={usersInactive}/> }
        </div>
    );
}

function UsersActive(props){
    const { usersActive } = props;
    return(
       <List
        className='users-active'
        itemLayout='horizontal'
        dataSource={usersActive}
        renderItem={user => (
            <List.Item
                actions={[
                    <Button
                        type='primary'
                        onClick={()=>console.log("Editar Usuario ")}
                    >  
                        <EditOutlined />
                    </Button>,

                    <Button
                    type='danger'
                    onClick={()=>console.log("Desactivar Usuario")}
                    >  
                        <StopOutlined />
                    </Button>,

                     <Button
                    type='danger'
                    onClick={()=>console.log("Eliminar Usuario")}
                    >  
                        <DeleteOutlined />
                    </Button>
                ]}
            >
                <List.Item.Meta
                    avatar={<Avatar src={user.avatar ? user.avatar: NoAvatar}/>}
                    title={`
                        ${user.nombre ? user.nombre : '...'}
                        ${user.lastName ? user.lastName : '...'}
                    `}
                    description={user.email}//Si se requiere ver más detalles agregarlos acá
                />
            </List.Item>
        )}
       />
    );
}

function UsersInactive(props){
    const { usersInactive } = props;
    return(
        <List
         className='users-active'
         itemLayout='horizontal'
         dataSource={usersInactive}
         renderItem={user => (
             <List.Item
                 actions={[
                     <Button
                         type='primary'
                         onClick={()=>console.log("Activar Usuario ")}
                     >  
                        <CheckOutlined />
                     </Button>,
  
                      <Button
                     type='danger'
                     onClick={()=>console.log("Eliminar Usuario")}
                     >  
                         <DeleteOutlined />
                     </Button>
                 ]}
             >
                 <List.Item.Meta
                     avatar={<Avatar src={user.avatar ? user.avatar: NoAvatar}/>}
                     title={`
                         ${user.nombre ? user.nombre : '...'}
                         ${user.lastName ? user.lastName : '...'}
                     `}
                     description={user.email}//Si se requiere ver más detalles agregarlos acá
                 />
             </List.Item>
         )}
        />
     );
}