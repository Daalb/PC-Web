//Librerias
import React, {useState} from 'react';
import { Form, Input, Select, Button, Row, Col, notification} from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, FileOutlined, LockOutlined  } from '@ant-design/icons';

//Componentes y Funciones
import { signUpAdminApi } from '../../../../api/user';
import { getAccessTokenApi } from '../../../../api/auth';

//Estilos
import "./AddUserForm.scss";


export default function AddUserForm(props) {
    const { setIsVisibleModal, setReloadUsers } = props;
    const [userData, setUserData] = useState({});

    const addUser = event => {
        if ( !userData.role || !userData.nombre || !userData.password || !userData.repeatPassword  || !userData.carrera  || !userData.lastName ) {
            notification["error"]({message:"Todos los campos son obligadorios"});
        } else if (userData.password !== userData.repeatPassword) {
            notification["error"]({message:"Las contraseñas tienen que ser iguales"})
        } else {
            const accessToken = getAccessTokenApi();
            signUpAdminApi(accessToken, userData)
            .then(response => {
                notification["success"]({message: response})
                setIsVisibleModal(false);
                setReloadUsers(true);
                setUserData({});//Resetear el formulario
            })
            .catch(err => {
                notification["error"]({message: err})
            });
        }
    }

    return(
        <div className="add-user-form">
            <AddForm
                userData={userData}
                setUserData={setUserData}
                addUser={addUser}
            />
        </div>
    );
}

function AddForm(props){
    const { userData, setUserData, addUser } = props;
    const { Option } = Select;  

    return(
        <Form className="form-add" onFinish={addUser}> 

            <Row gutter={24}>  
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<UserOutlined/>}
                            placeholder="Nombre"
                            value={userData.nombre}
                            onChange={e => setUserData({...userData, nombre: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<UserOutlined/>}
                            placeholder="Apellido"
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
                            prefix={<MailOutlined/>}
                            placeholder="Correo Electronico"
                            value={userData.email}
                            onChange={e => setUserData({...userData, email: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<PhoneOutlined/>}
                            placeholder="Telefono"
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
                            prefix={<FileOutlined/>}
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

            <Row gutter={24}>  
                <Col span={12}>
                    <Form.Item>
                        <Input
                            type="password"
                            prefix={<LockOutlined />}
                            placeholder="Contraseña"
                            value={userData.password}
                            onChange={e => setUserData({...userData, password: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            type="password"
                            prefix={<LockOutlined />}
                            placeholder="Repetir contraseña"
                            value={userData.repeatPassword}
                            onChange={e => setUserData({...userData, repeatPassword: e.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Crear Usuario
                </Button>
            </Form.Item>
        </Form>
    );
}