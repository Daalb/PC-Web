import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Avatar, Form, Input, Select, Button, Row, Col } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, FileOutlined } from '@ant-design/icons';

import NoAvatar from '../../../../assets/img/png/no-avatar.png';


import './EditUserForm.scss';

export default function EditUserForm(props){

    const { user } = props;
    const [avatar,setAvatar] = useState(null);
    const [userData, setUserData] = useState({
        nombre: user.nombre,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        carrera: user.carrera,
        role: user.role,
        avatar: user.avatar


    });

    useEffect(()=> {
        if(avatar) {
            setUserData({...userData,avatar })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[avatar]);

    const updateUser = e => {
        console.log(userData);
    }
    

    return(
        <div className="edit-user-form">
            <UploadAvatar avatar={avatar} setAvatar={setAvatar}></UploadAvatar>
            <EditForm userData={userData} setUserData={setUserData} updateUser={updateUser} /> 
        </div>
    );
}

function UploadAvatar(props){
    const { avatar, setAvatar } = props;
    
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
                <Avatar size={150} src={avatar ? avatar.preview : NoAvatar} />
            )}
        </div>
    );
}

function EditForm(props){
    const { userData, setUserData, updateUser} = props;
    const { Option } = Select;

    return(
        <Form className="form-edit" onFinish={updateUser}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item> 
                        <Input
                            prefix= {<UserOutlined />}
                            placeholder="Nombre"
                            defaultValue={userData.nombre}
                            onChange={e => setUserData({...userData, nombre: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix= {<UserOutlined />}
                            placeholder="Apellidos"
                            defaultValue={userData.lastName}
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
                            defaultValue={userData.email}
                            onChange={e => setUserData({...userData, email: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix= {<PhoneOutlined />}
                            placeholder="Teléfono"
                            defaultValue={userData.phone}
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
                            defaultValue={userData.carrera}
                            onChange={e => setUserData({...userData, carrera: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Select
                            placeholder="Selecciona un rol"
                            onChange={ e => setUserData({...userData, role: e}) }
                            defaultValue={userData.role}
                        >
                            <Option value="admin"> Administrador </Option>
                            <Option value="volunteer"> Voluntario </Option>
                        </Select>
                    </Form.Item>      
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix= {<FileOutlined />}
                            type="password"
                            placeholder="Contraseña"
                            onChange={e => setUserData({...userData, password: e.target.value})}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix= {<FileOutlined />}
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
}