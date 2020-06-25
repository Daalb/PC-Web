import React from 'react';
import { Form, Input, Button , Checkbox, notification , DatePicker} from 'antd';
import { UserOutlined, LockOutlined, NumberOutlined, MailOutlined, PhoneOutlined, FileOutlined  }  from '@ant-design/icons';


import './RegisterForm.scss';

export default function RegisterForm(){
    
    return(
        <Form className="register-form">

            <Form.Item>
                <Input 
                    prefix={<UserOutlined style={{color:"rgba(0,0,0,0.25)"}} />}
                    type="name" 
                    name="name" 
                    placeholder="Nombres" 
                    className="register-form__input"
                />
            </Form.Item>

            <Form.Item>
                <Input 
                    prefix={<UserOutlined style={{color:"rgba(0,0,0,0.25)"}} />}
                    type="lastname" 
                    name="lastname" 
                    placeholder="Apellidos" 
                    className="register-form__input"
                />
            </Form.Item>

            <Form.Item>
                <Input 
                    prefix={<MailOutlined style={{color:"rgba(0,0,0,0.25)"}} />}
                    type="email" 
                    name="email" 
                    placeholder="Correo electronico" 
                    className="register-form__input"
                />
            </Form.Item>

            <Form.Item>
                <Input 
                    prefix={<LockOutlined style={{color:"rgba(0,0,0,0.25)"}} />}
                    type="password" 
                    name="password" 
                    placeholder="Contraseña" 
                    className="register-form__input"
                />
            </Form.Item>

            <Form.Item>
                <Input 
                    prefix={<LockOutlined style={{color:"rgba(0,0,0,0.25)"}} />}
                    type="lock" 
                    name="repeatPassword" 
                    placeholder="Repetir contraseña" 
                    className="register-form__input"
                />
            </Form.Item>

            <Form.Item>
                <Input 
                    prefix={<PhoneOutlined  style={{color:"rgba(0,0,0,0.25)"}} />}
                    type="phone" 
                    name="phone" 
                    placeholder="Telefono" 
                    className="register-form__input"
                />
            </Form.Item>

            <Form.Item>
                <Input 
                    prefix={<FileOutlined  style={{color:"rgba(0,0,0,0.25)"}} />}
                    type="text" 
                    name="carrera" 
                    placeholder="Programa Académico" 
                    className="register-form__input"
                />
            </Form.Item>

            <Form.Item>
                <Checkbox
                    name="privacyPolicy"
                >
                    He leído y acepto la política de privacidad.
                </Checkbox>

            </Form.Item>

            <Form.Item>
                <Button htmlType="submit" className="register-form__button">
                    Crear cuenta
                </Button>
            </Form.Item>

        </Form>

    );
    
}