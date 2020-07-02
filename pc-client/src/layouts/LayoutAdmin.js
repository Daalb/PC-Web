import React, { useState } from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import {Layout} from "antd";//Nos traemos un layout de la libreria de css antd
import MenuTop from '../components/Admin/MenuTop';
import MenuSider from '../components/Admin/MenuSider';
import AdminSignIn from '../pages/Admin/SignIn';
import useAuth from '../hooks/useAuth';

import "./LayoutAdmin.scss";


export default function LayoutAdmin(props){
    
    const{ routes } = props;
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const { Header,Content,Footer } = Layout; 
    
    //console.log(useAuth());
   const { user, isLoading } = useAuth();
  //  const user = null;
        
    

    if (!user) {//Mientras la variable sea null(no registrado),redirecciona a login
        return(
            <>
                <Route path ="/admin/login" component = {AdminSignIn}/>
                <Redirect to ="/admin/login"/>
            </>
        )

    }
    
    return(
        <Layout>
            <MenuSider menuCollapsed ={menuCollapsed}/>
            <Layout className="layout-admin" style={{ marginLeft: menuCollapsed ? "80px" : "200px"}}>
                <Header className="layout-admin__header">
                    <MenuTop menuCollapsed ={menuCollapsed} 
                    setMenuCollapsed = {setMenuCollapsed}/>
                </Header>
                <Content className="layout-admin__content">
                    <LoadRoutes routes={routes}/>
                </Content>
                <Footer style={{ textAlign: 'center' }} className="layout-admin__footer">
                    Partners Campus Uninorte
                </Footer>
            </Layout>
        </Layout>
    );
}

function LoadRoutes({routes}){
    return(
        <Switch>
            {routes.map((route,index)=>(
            <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
            />
        ))}
        </Switch>
    );
}