//Librerías
import React, {useState, useEffect} from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

//Funciones
import {getMenuApi} from "../../../api/menu"

//Estilos
import "./MenuTop.scss";
import Logo from "../../../assets/img/png/logo-pcuninorte.png"

export default function MenuTop(){
    
    const [menuData, setMenuData] = useState([]);


    useEffect(()=>{
        getMenuApi().then(response => {
            const arrayMenu = [];
            response.menu.forEach(item => {
                item.active && arrayMenu.push(item);
            })
            setMenuData(arrayMenu);
        });
    },[]);

    return(
        <Menu className="menu-top-web" mode="horizontal">
            <Menu.Item className="menu-top-web__logo">
              <Link to={"/"}> 
                <img src={Logo} alt="Logo PC Uninorte" />
              </Link>
            </Menu.Item>

            {menuData.map(item => {
                const external = item.url.indexOf("http") > -1 ? true : false;
                
                //Para renderizar rutas externas
                if(external) {
                    return(
                        <Menu.Item key={item._id} className="menu-top-web__item"> 
                            <a href={item.url} target="_blank">
                                {item.title}
                            </a>
                        </Menu.Item>
                    );
                }

                //Para renderizar rutas internas 
                return(
                    <Menu.Item key={item._id} className="menu-top-web__item">
                        <Link to={item.url}>{item.title}</Link>       
                    </Menu.Item>
                );
            })}
            
            <div>
                Social Media...
            </div>
        </Menu>

    )
}