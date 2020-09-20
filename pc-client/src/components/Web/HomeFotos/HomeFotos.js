//Liberías
import React from 'react';
import {Row, Col, Card, Button} from 'antd';
import {Link} from 'react-router-dom';

//Imagenes
import foto01 from "../../../assets/img/jpg/foto01.jpg";
import foto02 from "../../../assets/img/jpg/foto02.jpg"
import foto03 from "../../../assets/img/jpg/foto03.jpg"
import foto04 from "../../../assets/img/jpg/foto04.jpg"

//Estilos
import "./HomeFotos.scss";

export default function HomeFotos() {
    return (
      <Row className="home-fotos">
          <Col lg={24} className="home-fotos__title">
              <h2>Echa un vistazo a algunas de nuestras actividades</h2>
          </Col>
          
          <Col lg={4}/>
          <Col lg={16}>
            <Row className="row-fotos">
                <Col md={6}>Foto...</Col>
                <Col md={6}>Foto...</Col>
                <Col md={6}>Foto...</Col>
                <Col md={6}>Foto...</Col>
            </Row>
          </Col>
          <Col lg={4}/>




      </Row>
    )
}
