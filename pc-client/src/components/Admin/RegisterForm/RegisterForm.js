import React ,{ useState } from 'react';
import { Form, Input, Button , Checkbox, notification , DatePicker} from 'antd';
import { UserOutlined, LockOutlined, NumberOutlined, MailOutlined, PhoneOutlined, FileOutlined  }  from '@ant-design/icons';


import './RegisterForm.scss';

import { emailValidation, minLengthValidation } from '../../../utils/formValidation';
import { signUpApi } from '../../../api/user';

export default function RegisterForm(){

    const [inputs, setInputs] = useState({
        email:"",
        password:"",
        repeatPassword:"",
        privacyPolicy:false
    });

    const [formValid, setFormValid] = useState({
        email: false,
        password: false,
        repeatPassword: false,
        privacyPolicy: false
    });
    
    //e es "event"
    const changeForm = e =>{
        if (e.target.name === "privacyPolicy"){
            setInputs({
                ...inputs,
                [e.target.name]: e.target.checked
            }); 
        } else {
            setInputs({
                ...inputs,
                [e.target.name]: e.target.value
            });
        }
    };

    const inputValidation = e => {
        const { type, name } = e.target;
        if (type === 'email') {
            setFormValid({
                ...formValid,
                [name]:emailValidation(e.target)
            });
        }

        if (type === 'password'){
            setFormValid({
               ...formValid,
               [name]: minLengthValidation(e.target,6) 
            });
        }

        if (type === 'checkbox'){
           setFormValid({
            ...formValid,
            [name]: e.target.checked
           });
        }
    }

    const register = e => {
        const { email, password, repeatPassword, privacyPolicy } = formValid;
        const passwordVal = inputs.password;
        const repeatPasswordVal = inputs.repeatPassword;

        if (!inputs.name || !passwordVal || !repeatPasswordVal || !inputs.privacyPolicy) {
            notification['error']({
                message: "Todos los campos son obligatorios"
            });
        } else {
            if (passwordVal !== repeatPasswordVal) {
                notification['error']({
                    message: "Las contraseñas tienen que ser iguales"
                });
            } else {
               const result = signUpApi(inputs);
            }
        }
    };


    return(
        <Form className="register-form" onFinish={register} onChange={changeForm}>

            <Form.Item>
                <Input 
                    prefix={<UserOutlined style={{color:"rgba(0,0,0,0.25)"}} />}
                    type="text" 
                    name="name" 
                    placeholder="Nombres" 
                    className="register-form__input"
                    onChange={inputValidation}
                    value={inputs.name}
                />
            </Form.Item>

            <Form.Item>
                <Input 
                    prefix={<UserOutlined style={{color:"rgba(0,0,0,0.25)"}} />}
                    type="text" 
                    name="lastname" 
                    placeholder="Apellidos" 
                    className="register-form__input"
                    onChange={inputValidation}
                    value={inputs.lastname}
                />
            </Form.Item>

            <Form.Item>
                <Input 
                    prefix={<MailOutlined style={{color:"rgba(0,0,0,0.25)"}} />}
                    type="email" 
                    name="email" 
                    placeholder="Correo electronico" 
                    className="register-form__input"
                    onChange={inputValidation}
                    value={inputs.email}
                />
            </Form.Item>

            <Form.Item>
                <Input 
                    prefix={<LockOutlined style={{color:"rgba(0,0,0,0.25)"}} />}
                    type="password" 
                    name="password" 
                    placeholder="Contraseña" 
                    className="register-form__input"
                    onChange={inputValidation}
                    value={inputs.password}
                />
            </Form.Item>

            <Form.Item>
                <Input 
                    prefix={<LockOutlined style={{color:"rgba(0,0,0,0.25)"}} />}
                    type="password" 
                    name="repeatPassword" 
                    placeholder="Repetir contraseña" 
                    className="register-form__input"
                    onChange={inputValidation}
                    value={inputs.repeatPassword}
                />
            </Form.Item>

            <Form.Item>
                <Input 
                    prefix={<PhoneOutlined  style={{color:"rgba(0,0,0,0.25)"}} />}
                    type="phone" 
                    name="phone" 
                    placeholder="Telefono" 
                    className="register-form__input"
                    onChange={inputValidation}
                    value={inputs.phone}
                />
            </Form.Item>

            <Form.Item>
                <Input 
                    prefix={<FileOutlined  style={{color:"rgba(0,0,0,0.25)"}} />}
                    type="text" 
                    name="carrera" 
                    placeholder="Programa Académico" 
                    className="register-form__input"
                    onChange={inputValidation}
                    value={inputs.carrera}
                />
            </Form.Item>

            <Form.Item>
                <Checkbox
                    name="privacyPolicy"
                    onChange={inputValidation}
                    checked={inputs.privacyPolicy}
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