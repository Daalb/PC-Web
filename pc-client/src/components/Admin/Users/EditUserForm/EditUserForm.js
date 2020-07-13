//Librerias
import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Avatar, Form, Input, Select, Button, Row, Col, notification } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, FileOutlined, LockOutlined  } from '@ant-design/icons';

//Imagenes
import NoAvatar from '../../../../assets/img/png/no-avatar.png';

//Componentes y Funciones
import { getAvatarApi, uploadAvatarApi, updateUserApi } from '../../../../api/user';
import { getAccessTokenApi } from '../../../../api/auth';
import { minLengthValidation } from '../../../../utils/formValidation';

import './EditUserForm.scss';

export default function EditUserForm(props){

    const { user, setIsVisibleModal, setReloadUsers } = props;
    const [avatar,setAvatar] = useState(null);
    const [userData, setUserData] = useState({});

    useEffect(()=>{
        setUserData({
            nombre: user.nombre,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            carrera: user.carrera,
            role: user.role,
            avatar: user.avatar,
            password: "",
            repeatPassword: ""
         });
    },[user]);
   

    useEffect(()=>{
        if (user.avatar) {
            getAvatarApi(user.avatar).then((response)=> {
                setAvatar(response);
            })
        } else {
            setAvatar(null);
        }
    },[user]);

    useEffect(()=> {
        if(avatar) {
            setUserData({...userData,avatar:avatar.file })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[avatar]);

    const updateUser = e => {
        const token = getAccessTokenApi();
        let userUpdate = userData;
        
        if (userUpdate.password || userUpdate.repeatPassword) {
            if(userUpdate.password !== userUpdate.repeatPassword) {
                notification["error"]({
                    message: "Las contraseñas tienen que ser iguales"
                });
                return;
            } else {
                delete userUpdate.repeatPassword;
            };
        };

        if (!userUpdate.nombre || !userUpdate.lastName || !userUpdate.email) {
            notification["error"]({
                message: "El nombre, apellido y email son obligatorios"
            })
            return;
        };

        if (typeof(userUpdate.avatar) === "object") {
            uploadAvatarApi(token, userUpdate.avatar, user._id).then(response =>{
                userUpdate.avatar = response.avatarName;
                updateUserApi(token,userUpdate,user._id).then(result => {
                    notification["success"]({
                        message: result.message
                    });
                    setIsVisibleModal(false);
                    setReloadUsers(true); 
                });
            });
        } else {
            updateUserApi(token,userUpdate,user._id).then(result => {
                notification["success"]({
                    message: result.message
                });
                setIsVisibleModal(false);
                setReloadUsers(true); 
            });
        };

    };
    
    return(
        <div className="edit-user-form">
            <UploadAvatar avatar={avatar} setAvatar={setAvatar}></UploadAvatar>
            <EditForm userData={userData} setUserData={setUserData} updateUser={updateUser} /> 
        </div>
    );
}

function UploadAvatar(props){
    const { avatar, setAvatar } = props;
    const[avatarUrl, setAvatarUrl] = useState(null);

    useEffect(()=> {
        if (avatar) {
            if (avatar. preview) {
                setAvatarUrl(avatar.preview);
            } else {
                setAvatarUrl(avatar);
            }
        } else {
            setAvatarUrl(null);
        }
    },[avatar])


    const onDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0];
            setAvatar({file,preview: URL.createObjectURL(file)})
        },[setAvatar]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    });

    return(
        <div className="upload-avatar" {...getRootProps()}>
            <input {...getInputProps()}/>
            {isDragActive ? (
                <Avatar size={150} src={NoAvatar}/>
            ): (
                <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
            )}
        </div>
    );
}

function EditForm(props){
    const { userData, setUserData, updateUser} = props;
    const { Option } = Select;



   /* const changeForm = e =>{

        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
             
    };*/


    /*const inputValidation = e => {
        const { name } = e.target;
        console.log(e.target);
            setUserData({
               ...userData,
               [name]: minLengthValidation(e.target,6) 
            });
        
    }*/



    return(
        <Form className="form-edit" onFinish={updateUser}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item> 
                        <Input
                            prefix= {<UserOutlined />}
                            placeholder="Nombre"
                            value={userData.nombre}
                            onChange={e => setUserData({...userData, nombre: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix= {<UserOutlined />}
                            placeholder="Apellidos"
                            value={userData.lastName}
                            onChange={e => setUserData({...userData, lastName: e.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix= {<MailOutlined />}
                            placeholder="Corre electronico"
                            value={userData.email}
                            onChange={e => setUserData({...userData, email: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix= {<PhoneOutlined />}
                            placeholder="Teléfono"
                            value={userData.phone}
                            onChange={e => setUserData({...userData, phone: e.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix= {<FileOutlined />}
                            placeholder="Carrera"
                            value={userData.carrera}
                            onChange={e => setUserData({...userData, carrera: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Select
                            placeholder="Selecciona un rol"
                            onChange={ e => setUserData({...userData, role: e}) }
                            value={userData.role}
                        >
                            <Option value="admin"> Administrador </Option>
                            <Option value="volunteer"> Voluntario </Option>
                        </Select>
                    </Form.Item>      
                </Col>
            </Row>

            <Row gutter={24} >
                <Col span={12}>
                    <Form.Item > 
                        <Input 
                            prefix= {<LockOutlined />}
                            type="password"
                            placeholder="Contraseña"
                            //value={userData.password}
                            //onChange={inputValidation}
                            onChange={e => setUserData({...userData, password: e.target.value})}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix= {<LockOutlined />}
                            type="password"
                            placeholder="Repetir contraseña"
                            onChange={e => setUserData({...userData, repeatPassword: e.target.value})}
                        />
                    </Form.Item>
                </Col>
               
            </Row>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Actualizar Usuario
                </Button>
            </Form.Item>

        </Form>
    );
};