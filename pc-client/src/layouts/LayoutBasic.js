import React from 'react';
import {Layout} from 'antd';
import {Route} from 'react-router-dom';
import "./LayoutBasic.scss";


export default function LayoutBasic({routes}){
    const { Content,Footer } = Layout; 

    return(
        <Layout>
            <h2>Menu...</h2>
            <Layout>
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