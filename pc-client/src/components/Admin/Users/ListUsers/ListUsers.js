//Liberias
import React,{ useState, useEffect } from 'react';
import { Switch, List, Avatar, Button, notification, Modal as ModalAntd } from 'antd';
import { EditOutlined, StopOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';

//Componentes y Funciones
import NoAvatar from '../../../../assets/img/png/no-avatar.png';
import Modal from '../../../Modal';
import EditUserForm from '../EditUserForm/EditUserForm';
import { getAvatarApi, activateUserApi, deleteUserApi } from '../../../../api/user';
import { getAccessTokenApi } from '../../../../api/auth';

//Estilos
import './ListUsers.scss';

const { confirm } = ModalAntd;

export default function ListUsers(props){
    const { usersActive, usersInactive, setReloadUsers } = props;
    const [viewUsersActive,setViewUsersActive] = useState(true); 
    const [isVisibleModal,setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");
    console.log(props);
     
    const showDeleteConfirm = (nombre,apellido,id) => {
        const accessToken = getAccessTokenApi();

        confirm({
            title: "Eliminado usuario",
            content: `¿Estás seguro que quieres elimar a ${nombre} ${apellido}?`,
            okText: "Eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk() {
                deleteUserApi(accessToken, id)
                .then(response => {
                    notification["success"]({
                        message: response
                    });
                    setReloadUsers(true);
                })
                .catch(err => {
                    notification["error"]({
                        message: err
                    });
                });
            }
        })
    };
    
   
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
            setReloadUsers={setReloadUsers}
            
            /> : <UsersInactive usersInactive={usersInactive} 
                setReloadUsers={setReloadUsers} 
                showDeleteConfirm={showDeleteConfirm}/> }

            <Modal
                title= {modalTitle} 
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            > {modalContent} </Modal>
        </div>
    );
}

function UsersActive(props){//Renderiza varios usuarios
    const { usersActive, setIsVisibleModal, setModalTitle, setModalContent, setReloadUsers } = props;

    const editUser = (user) =>{
        setIsVisibleModal(true);
        setModalTitle(`Editar ${user.nombre ? user.nombre : "..."} ${user.lastName ? user.lastName : "..."}`);
        setModalContent(<EditUserForm user={user} setIsVisibleModal={setIsVisibleModal} 
            setReloadUsers={setReloadUsers}/>);
    }

    return( 
       <List
            className='users-active'
            itemLayout='horizontal'
            dataSource={usersActive}
            renderItem={user => <UserActive user={user} editUser={editUser} setReloadUsers={setReloadUsers}/>}
        />
    );
}

function UserActive(props){//Renderiza un UNICO usuario
    const {user, editUser, setReloadUsers} = props;
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

    const desactivateUser = () => {
        const accessToken = getAccessTokenApi();
        activateUserApi(accessToken, user._id, false)
        .then(response => {
            notification["success"]({
                message: response
            });
            setReloadUsers(true);
        })
        .catch(err => {
            notification["error"]({
                message: err
            });
        })
    };

    const showDeleteConfirm = () => {
        const accessToken = getAccessTokenApi();

        confirm({
            title: "Eliminado usuario",
            content: `¿Estás seguro que quieres elimar a ${user.nombre} ${user.lastName}?`,
            okText: "Eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk() {
                deleteUserApi(accessToken, user._id)
                .then(response => {
                    notification["success"]({
                        message: response
                    });
                    setReloadUsers(true);
                })
                .catch(err => {
                    notification["error"]({
                        message: err
                    });
                });
            }
        })
    };


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
                        onClick={desactivateUser}
                    >  
                        <StopOutlined />
                    </Button>,

                     <Button
                        type='danger'
                        onClick={showDeleteConfirm}
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
    const { usersInactive, setReloadUsers, showDeleteConfirm } = props;
    return(
        <List
         className='users-active'
         itemLayout='horizontal'
         dataSource={usersInactive}
         renderItem={user => <UserInactive user={user} 
                             setReloadUsers={setReloadUsers}
                             showDeleteConfirm={showDeleteConfirm}/>}
        />
     );
}

function UserInactive(props){
    const { user,setReloadUsers, showDeleteConfirm } = props;
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



    const activateUser = () => {
        const accessToken = getAccessTokenApi();
        
        activateUserApi(accessToken, user._id, true)
        .then(response => {
            notification["success"]({
                message: response
            });
            setReloadUsers(true);
        })
        .catch(err => {
            notification["error"]({
                message: err
            });
        })
    };
    
   


    return(
        <List.Item
            actions={[
                <Button
                    type='primary'
                    onClick={activateUser}
                >  
                    <CheckOutlined />
                </Button>,

                <Button
                    type='danger'
                    onClick={showDeleteConfirm(user.nombre,user.lastName,user._id)}
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