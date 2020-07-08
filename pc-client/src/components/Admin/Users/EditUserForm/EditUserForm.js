import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Avatar, Form, Input, Select, Button, Row, Col } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';

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
                <Input
                    prefix= {<UserOutlined />}
                    placeholder="Apellidos"
                    defaultValue={userData.lastName}
                    onChange={e => setUserData({...userData, lastName: e.target.value})}
                />
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Input
                        prefix= {<MailOutlined />}
                        placeholder="Corre electronico"
                        defaultValue={userData.email}
                        onChange={e => setUserData({...userData, email: e.target.value})}
                    />
                </Col>
                <Col span={12}></Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}></Col>
                <Col span={12}></Col>
            </Row>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Actualizar Usuario
                </Button>
            </Form.Item>

        </Form>
    );
}