import React,{ useState, useEffect } from 'react';
import { Switch, List, Avatar, Button } from 'antd';
import { EditOutlined, StopOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';

import NoAvatar from '../../../../assets/img/png/no-avatar.png';
import Modal from '../../../Modal';
import EditUserForm from '../EditUserForm/EditUserForm';
import { getAvatarApi } from '../../../../api/user';

import './ListUsers.scss';

export default function ListUsers(props){
    const { usersActive, usersInactive } = props;
    const [viewUsersActive,setViewUsersActive] = useState(true); 
    const [isVisibleModal,setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");
    
    
    //console.log(usersInactive);
    
   
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
            {viewUsersActive ? <UsersActive 
            usersActive={usersActive} 
            setIsVisibleModal={setIsVisibleModal}
            setModalTitle={setModalTitle}
            setModalContent={setModalContent}
            
            /> : <UsersInactive usersInactive={usersInactive}/> }

            <Modal
                title= {modalTitle} 
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            > {modalContent} </Modal>
        </div>
    );
}

function UsersActive(props){//Renderiza varios usuarios
    const { usersActive, setIsVisibleModal, setModalTitle, setModalContent } = props;

    const editUser = (user) =>{
        setIsVisibleModal(true);
        setModalTitle(`Editar ${user.nombre ? user.nombre : "..."} ${user.lastName ? user.lastName : "..."}`);
        setModalContent(<EditUserForm user={user}/>);
    }

    return( 
       <List
            className='users-active'
            itemLayout='horizontal'
            dataSource={usersActive}
            renderItem={user => <UserActive user={user} editUser={editUser}/>}
        />
    );
}

function UserActive(props){//Renderiza un UNICO usuario
    const {user, editUser} = props;
    const [avatar, setAvatar] = useState(null);

    useEffect(()=>{
        if (user.avatar) {
            getAvatarApi(user.avatar).then(response =>{
                setAvatar(response);
            })
        } else {
            setAvatar(null);
        }
    },[user]);

    return (
        <List.Item
                actions={[
                    <Button
                        type='primary'
                        onClick={()=>editUser(user)}
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
                    avatar={<Avatar src={avatar ? avatar: NoAvatar}/>}
                    title={`
                        ${user.nombre ? user.nombre : '...'}
                        ${user.lastName ? user.lastName : '...'}
                    `}
                    description={user.email}//Si se requiere ver más detalles agregarlos acá
                />
            </List.Item>
    );

}

function UsersInactive(props){
    const { usersInactive } = props;
    return(
        <List
         className='users-active'
         itemLayout='horizontal'
         dataSource={usersInactive}
         renderItem={user => <UserInactive user={user}/>}
        />
     );
}

function UserInactive(props){
    const { user } = props;
    const [avatar, setAvatar] = useState(null);

    useEffect(()=>{
        if (user.avatar) {
            getAvatarApi(user.avatar).then(response =>{
                setAvatar(response);
            });
        } else {
            setAvatar(null);
        }
    },[user]);

    return(
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
                avatar={<Avatar src={avatar ? avatar: NoAvatar}/>}
                title={`
                    ${user.nombre ? user.nombre : '...'}
                    ${user.lastName ? user.lastName : '...'}
                `}
                description={user.email}//Si se requiere ver más detalles agregarlos acá
            />
        </List.Item>
    );
}