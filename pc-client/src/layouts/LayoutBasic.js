import React from 'react';
import {Layout} from 'antd';
import {Route} from 'react-router-dom';

export default function LayoutBasic({routes}){
    const { Header,Content,Footer } = Layout; 

    return(
        <Layout>
            <h2>Menu Sider Basic User</h2>
            <Layout>
                <Header>Menu Sider Basic User</Header>
                <Content>
                    <LoadRoutes routes={routes}/>
                </Content>
                <Footer>
                    Partners Campus Uninorte
                </Footer>
            </Layout>
        </Layout>
    );
}

function LoadRoutes({routes}){
    return routes.map((route,index)=>(
        <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
        />
    ))
}