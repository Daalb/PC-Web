import React from 'react';
import { Layout, Tabs} from 'antd';
import { Redirect } from 'react-router-dom';
import RegisterForm from '../../../components/Admin/RegisterForm';
import Logo from '../../../assets/img/png/logo-pcuninorte.png';
import LoginForm from '../../../components/Admin/LoginForm/LoginForm';
import { getAccessTokenApi } from '../../../api/auth';

import './SignIn.scss';


export default function SignIn(){
    const { Content } = Layout;
    const { TabPane } = Tabs;

    if (getAccessTokenApi()){
        return <Redirect to ="/admin"/>
    }
    return(
        <Layout className ="sign-in">
            <Content className= "sign-in__content">
                <h1 className= "sign-in__content__logo">
                    <img src={Logo} alt="Logo Parterns Campus "/>
                </h1>
                <div className="sign-in__content-tabs">
                    <Tabs type ="card">
                        <TabPane tab={<span>Entrar</span>} key="1">
                            <LoginForm/>
                        </TabPane>
                        
                        <TabPane tab={<span>Nuevo Usuario</span>} key="2">
                            <RegisterForm/>
                        </TabPane>

                    </Tabs>
                </div>
            </Content>
        </Layout>
    );
}