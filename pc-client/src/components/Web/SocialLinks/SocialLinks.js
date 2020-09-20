//Librerias
import React from "react";


//Estilos
import {ReactComponent as FacebookIcon} from "../../../assets/img/svg/facebook.svg";
import {ReactComponent as InstagramIcon} from "../../../assets/img/svg/instagram.svg";

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

            <a 
                href="https://www.instagram.com/pcuninorte/?hl=es-la"
                className="instagram"
                target="_blank"
            >
                <InstagramIcon/>
            </a>
        </div>
    )
}

