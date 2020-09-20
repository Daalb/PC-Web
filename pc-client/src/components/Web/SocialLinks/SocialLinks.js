//Librerias
import React from "react";


//Estilos
import {ReactComponent as FacebookIcon} from "../../../assets/img/svg/facebook.svg";
import "./SocialLinks.scss"

export default function SocialLinks(){
    return(
        <div className="social-links">
            <a 
                href="https://www.facebook.com/PCUninorte"
                className="facebook"
                target="_blank"
            >
                <FacebookIcon/>
            </a>
        </div>
    )
}

