import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { MenuUnfoldOutlined,PoweroffOutlined,MenuFoldOutlined } from '@ant-design/icons';
import './MenuTop.scss';
import PCLogo from '../../../assets/img/png/logo-pcuninorte.png'


export default function MenuTop(props){
    console.log(props); 
    const {menuCollapsed, setMenuCollapsed} = props;
    return (
        <div className="menu-top">
            <div className="menu-top__left">
                <Link to = "/admin">
                    <img 
                        className="menu-top__left-logo"
                        src={PCLogo}
                        alt="Logo Partners Campus Uninorte"
                        
                    />
                </Link>
                <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
                    {menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
            </div>
            <div className="menu-top__right">
                <Button type="link" onClick={()=>console.log('Desconexion')}>
                    <PoweroffOutlined />
                </Button>
            </div>
        </div>
    )
}