import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {Layout, Menu} from 'antd';
import {HomeOutlined, SolutionOutlined ,TeamOutlined, MenuOutlined}  from '@ant-design/icons';

import './MenuSider.scss';

 function MenuSider(props){
    const {menuCollapsed, location } = props;
    const {Sider} = Layout; // Sacamos Sider de Layout
    return (
       <Sider className = "admin-sider" collapsed={menuCollapsed}>
           <Menu  mode="inline" defaultSelectedKeys={[location.pathname]}>
               <Menu.Item key="/admin">
                   <Link to={"/admin"}>
                        <HomeOutlined />
                        <span className="nav-text">Home</span>
                   </Link>
               </Menu.Item>
                {/*menu-web será Planear reunión*/}
               <Menu.Item key="/admin/users">
                   <Link to="/admin/users">
                        <SolutionOutlined />
                        <span className="nav-text">Gestión de Usuarios</span>
                   </Link>
               </Menu.Item>

               <Menu.Item key="/admin/menu">
                   <Link to="/admin/menu">
                        <MenuOutlined />
                        <span className="nav-text">Menú</span>
                   </Link>
               </Menu.Item>

           </Menu>
       </Sider>

    );
}
export default withRouter(MenuSider);