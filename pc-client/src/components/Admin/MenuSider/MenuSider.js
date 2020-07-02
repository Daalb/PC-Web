import React from 'react';
import { Link } from 'react-router-dom';
import {Layout, Menu} from 'antd';
import {HomeOutlined, SolutionOutlined ,TeamOutlined}  from '@ant-design/icons';

import './MenuSider.scss';

export default function MenuSider(props){
    const {menuCollapsed} = props;
    const {Sider} = Layout; // Sacamos Sider de Layout
    return (
       <Sider className = "admin-sider" collapsed={menuCollapsed}>
           <Menu  mode="inline" defaultSelectedKeys={["1"]}>
               <Menu.Item key="1">
                   <Link to={"/admin"}>
                        <HomeOutlined />
                        <span className="nav-text">Home</span>
                   </Link>
               </Menu.Item>
                {/*menu-web será Planear reunión*/}
               <Menu.Item key="2">
                   <Link to="/admin/users">
                        <SolutionOutlined />
                        <span className="nav-text">Gestión de Usuarios</span>
                   </Link>
               </Menu.Item>
           </Menu>
       </Sider>

    );


}