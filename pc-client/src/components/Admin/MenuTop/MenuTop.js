import React from 'react';
import { Button } from 'antd';
import { MenuUnfoldOutlined,PoweroffOutlined } from '@ant-design/icons';
import './MenuTop.scss';
import PCLogo from '../../../assets/img/png/logo-pcuninorte.png'


export default function MenuTop(){
    return (
        <div className="menu-top">
            <div className="menu-top__left">
                <img 
                    className="menu-top__left-logo"
                     src={PCLogo}
                     alt="Logo Partners Campus Uninorte"
                />
                <Button type="link" onClick={()=>console.log('Click hecho')}>
                    <MenuUnfoldOutlined />
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