//Liberias
import React from "react";
import {Row, Col} from "antd";

//Estilos
import "./MainBanner.scss";


export default function MainBanner(){
    
    return(
       <div className="main-banner">
           <div className="main-banner__dark"/>
           <Row>
               <Col lg={4}/>
               <Col lg={16}>
                    <h2>Texto1 <br/> Texto2 </h2>
                    <h3>
                        Texto3 <br/>
                        Texto4
                    </h3>
               </Col>
               <Col lg={4} />
           </Row>
       </div>
    )
}