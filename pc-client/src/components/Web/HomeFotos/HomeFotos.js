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
                <Col md={6}>
                    <CardFoto 
                        image={foto01}
                        title="Titulo 1"
                        subtitle="Subtitulo1"
                    />
                </Col>

                <Col md={6}>
                    <CardFoto 
                        image={foto02}
                        title="Titulo 2"
                        subtitle="Subtitulo 2"
                    />
                </Col>

                <Col md={6}>
                    <CardFoto 
                        image={foto03}
                        title="Titulo 3"
                        subtitle="Subtitulo3"
                    />
                </Col>

                <Col md={6}>
                    <CardFoto 
                        image={foto04}
                        title="Titulo 4"
                        subtitle="Subtitulo4"
                    />
                </Col>
                
            </Row>
          </Col>
          <Col lg={4}/>
      </Row>
    )
}

function CardFoto(props){
    const {image, title, subtitle, link} = props;
    const{ Meta } = Card;

    return(
        <a href={link} target="_blank" >
            <Card
                className="home-fotos__card"
                cover={<img src={image} alt={title} />}
                actions={[<Button>Ingresar</Button>]}
            >
                <Meta title={title} description={subtitle}/>
            </Card>

        </a>
    )
}